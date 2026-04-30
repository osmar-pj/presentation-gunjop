const http = require('http')
const crypto = require('crypto')
const { WebSocketServer } = require('ws')

const PORT = Number(process.env.PORT) || 8787
const HOST = process.env.HOST || '0.0.0.0'

// Flat global state: dot-path -> value. Last-write-wins.
const state = new Map()

const httpServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(
      JSON.stringify({
        ok: true,
        clients: wss.clients.size,
        paths: state.size,
        uptime: process.uptime(),
      }),
    )
    return
  }
  res.writeHead(404, { 'content-type': 'text/plain' })
  res.end('not found')
})

const wss = new WebSocketServer({ server: httpServer })

function broadcast(sender, payload) {
  const msg = JSON.stringify(payload)
  for (const client of wss.clients) {
    if (client !== sender && client.readyState === 1) {
      client.send(msg)
    }
  }
}

wss.on('connection', (ws) => {
  const clientId = crypto.randomUUID()
  ws.clientId = clientId

  // Snapshot current state to the new client
  const snapshot = {}
  for (const [k, v] of state) snapshot[k] = v
  ws.send(
    JSON.stringify({
      type: 'snapshot',
      clientId,
      state: snapshot,
      peers: [...wss.clients]
        .filter((c) => c !== ws && c.clientId)
        .map((c) => c.clientId),
    }),
  )

  // Tell existing peers a new client joined
  broadcast(ws, { type: 'peer-join', sender: clientId })

  ws.on('message', (raw) => {
    let msg
    try {
      msg = JSON.parse(raw.toString())
    } catch {
      return
    }
    if (!msg || typeof msg !== 'object') return

    if (msg.type === 'patch' && typeof msg.path === 'string') {
      state.set(msg.path, msg.value)
      broadcast(ws, {
        type: 'patch',
        path: msg.path,
        value: msg.value,
        sender: clientId,
      })
      return
    }
    if (msg.type === 'cursor') {
      // Ephemeral — never stored
      broadcast(ws, {
        type: 'cursor',
        sender: clientId,
        x: msg.x,
        y: msg.y,
        vw: msg.vw,
        vh: msg.vh,
        name: msg.name,
        color: msg.color,
      })
      return
    }
    if (msg.type === 'cursor-leave') {
      broadcast(ws, { type: 'cursor-leave', sender: clientId })
      return
    }
    if (msg.type === 'identity') {
      ws.name = String(msg.name || '').slice(0, 40)
      return
    }
  })

  ws.on('close', () => {
    broadcast(ws, { type: 'peer-leave', sender: clientId })
  })
})

httpServer.listen(PORT, HOST, () => {
  console.log(`[atelier-sync] ws://${HOST}:${PORT}`)
})

// Heartbeat — drop dead sockets so peer-leave fires
const interval = setInterval(() => {
  for (const ws of wss.clients) {
    if (ws.isAlive === false) {
      try {
        ws.terminate()
      } catch {}
      continue
    }
    ws.isAlive = false
    try {
      ws.ping()
    } catch {}
  }
}, 30000)

wss.on('connection', (ws) => {
  ws.isAlive = true
  ws.on('pong', () => {
    ws.isAlive = true
  })
})

process.on('SIGINT', () => {
  clearInterval(interval)
  httpServer.close(() => process.exit(0))
})
