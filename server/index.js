const http = require('http')
const { Server } = require('socket.io')

const PORT = Number(process.env.PORT) || 8787
const HOST = process.env.HOST || '0.0.0.0'
const ORIGIN = process.env.CORS_ORIGIN || '*'

// Flat global state: dot-path -> value. Last-write-wins.
const state = new Map()

const httpServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    })
    res.end(
      JSON.stringify({
        ok: true,
        clients: io.engine.clientsCount,
        paths: state.size,
        uptime: process.uptime(),
      }),
    )
    return
  }
  res.writeHead(404, { 'content-type': 'text/plain' })
  res.end('not found')
})

const io = new Server(httpServer, {
  cors: { origin: ORIGIN, methods: ['GET', 'POST'] },
  // Both transports — Socket.IO upgrades to WebSocket if it can,
  // otherwise stays on HTTP long-polling. Survives broken WS upgrades at proxies.
  transports: ['websocket', 'polling'],
  pingInterval: 25000,
  pingTimeout: 20000,
})

io.on('connection', (socket) => {
  // Snapshot the entire shared state to the new client
  const snapshot = {}
  for (const [k, v] of state) snapshot[k] = v
  socket.emit('snapshot', { clientId: socket.id, state: snapshot })

  // Notify existing peers
  socket.broadcast.emit('peer-join', { sender: socket.id })

  socket.on('patch', (msg) => {
    if (!msg || typeof msg.path !== 'string') return
    state.set(msg.path, msg.value)
    socket.broadcast.emit('patch', {
      path: msg.path,
      value: msg.value,
      sender: socket.id,
    })
  })

  socket.on('cursor', (msg) => {
    if (!msg) return
    socket.broadcast.emit('cursor', {
      sender: socket.id,
      x: Number(msg.x) || 0,
      y: Number(msg.y) || 0,
      vw: Number(msg.vw) || 1280,
      vh: Number(msg.vh) || 720,
      color: msg.color,
      name: msg.name,
    })
  })

  socket.on('cursor-leave', () => {
    socket.broadcast.emit('cursor-leave', { sender: socket.id })
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('peer-leave', { sender: socket.id })
  })
})

httpServer.listen(PORT, HOST, () => {
  console.log(`[atelier-sync] http://${HOST}:${PORT}  (Socket.IO)`)
})

process.on('SIGINT', () => {
  io.close()
  httpServer.close(() => process.exit(0))
})
