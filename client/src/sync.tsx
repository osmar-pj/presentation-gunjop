// Realtime sync — Socket.IO transport.
//
// Public API (unchanged from the WebSocket implementation):
//   • <SyncProvider>  — wraps the app, manages the connection
//   • useShared(path) — useState-shaped hook backed by the shared store
//   • useSync()       — low-level access (cursors, presence, raw set/get)
//   • <RemoteCursors> — overlay rendering pointers of other connected users
//   • <SyncStatus>    — small connection badge
//   • useWindowScrollSync() — sync window scroll across clients
//
// Why Socket.IO (vs raw WebSocket):
//   • Auto-falls-back to HTTP long-polling if WS upgrade fails (e.g., proxy
//     mishandles `Connection: Upgrade`). Communication keeps working.
//   • Built-in reconnection with backoff.
//   • The URL is just `https://your-server` — no need to think about wss vs ws.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { io, type Socket } from 'socket.io-client'

const SYNC_URL: string =
  (import.meta.env?.VITE_SYNC_URL as string | undefined) ??
  (typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:8787`
    : 'http://localhost:8787')

const PALETTE = [
  '#c1432a', '#8e6f2c', '#3a5a72', '#5b6e4f',
  '#7d4577', '#a08338', '#2f6e60', '#9c4a3a',
]

function colorFor(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return PALETTE[Math.abs(h) % PALETTE.length]
}

export type RemoteCursor = {
  id: string
  x: number       // viewport X
  y: number       // viewport Y
  vw: number      // sender viewport width  (for scaling)
  vh: number      // sender viewport height
  color: string
  name?: string
  updatedAt: number
}

type SyncCtx = {
  clientId: string | null
  connected: boolean
  myColor: string
  get: <T = unknown>(path: string) => T | undefined
  set: (path: string, value: unknown) => void
  subscribe: (path: string, listener: () => void) => () => void
  sendCursor: (x: number, y: number) => void
  sendCursorLeave: () => void
  subscribeCursors: (listener: () => void) => () => void
  getCursors: () => RemoteCursor[]
}

const SyncContext = createContext<SyncCtx | null>(null)

type PatchMsg = { path: string; value: unknown; sender?: string }
type CursorMsg = { sender: string; x: number; y: number; vw: number; vh: number; color?: string; name?: string }
type PeerMsg = { sender: string }
type SnapshotMsg = { clientId: string; state: Record<string, unknown> }

export function SyncProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef<Map<string, unknown>>(new Map())
  const listenersRef = useRef<Map<string, Set<() => void>>>(new Map())
  const cursorsRef = useRef<Map<string, RemoteCursor>>(new Map())
  const cursorSnapshotRef = useRef<RemoteCursor[]>([])
  const cursorListenersRef = useRef<Set<() => void>>(new Set())
  const socketRef = useRef<Socket | null>(null)

  const [clientId, setClientId] = useState<string | null>(null)
  const [connected, setConnected] = useState(false)

  const notifyPath = useCallback((path: string) => {
    const ls = listenersRef.current.get(path)
    if (ls) ls.forEach((l) => l())
  }, [])

  // Rebuild cached snapshot so getCursors() returns a stable reference
  // until something actually changes (required by useSyncExternalStore).
  const notifyCursors = useCallback(() => {
    cursorSnapshotRef.current = Array.from(cursorsRef.current.values())
    cursorListenersRef.current.forEach((l) => l())
  }, [])

  // Socket lifecycle
  useEffect(() => {
    const socket = io(SYNC_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 400,
      reconnectionDelayMax: 20000,
      withCredentials: false,
    })
    socketRef.current = socket

    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    // Don't blow up the page on transient errors; Socket.IO will retry.
    socket.on('connect_error', () => {})

    socket.on('snapshot', (msg: SnapshotMsg) => {
      setClientId(msg.clientId ?? null)
      const remote = msg.state ?? {}
      for (const k of Object.keys(remote)) {
        stateRef.current.set(k, remote[k])
        notifyPath(k)
      }
    })

    socket.on('patch', (msg: PatchMsg) => {
      if (!msg || typeof msg.path !== 'string') return
      stateRef.current.set(msg.path, msg.value)
      notifyPath(msg.path)
    })

    socket.on('cursor', (msg: CursorMsg) => {
      if (!msg || typeof msg.sender !== 'string') return
      cursorsRef.current.set(msg.sender, {
        id: msg.sender,
        x: Number(msg.x) || 0,
        y: Number(msg.y) || 0,
        vw: Number(msg.vw) || 1280,
        vh: Number(msg.vh) || 720,
        color: msg.color || colorFor(msg.sender),
        name: msg.name,
        updatedAt: Date.now(),
      })
      notifyCursors()
    })

    const removePeer = (msg: PeerMsg) => {
      if (!msg?.sender) return
      if (cursorsRef.current.delete(msg.sender)) notifyCursors()
    }
    socket.on('cursor-leave', removePeer)
    socket.on('peer-leave', removePeer)

    // Sweep stale cursors (defensive — server should fire peer-leave on disconnect)
    const sweep = window.setInterval(() => {
      const now = Date.now()
      let changed = false
      for (const [k, c] of cursorsRef.current) {
        if (now - c.updatedAt > 6000) {
          cursorsRef.current.delete(k)
          changed = true
        }
      }
      if (changed) notifyCursors()
    }, 1500)

    return () => {
      window.clearInterval(sweep)
      socket.removeAllListeners()
      socket.disconnect()
      socketRef.current = null
    }
  }, [notifyPath, notifyCursors])

  const ctx = useMemo<SyncCtx>(() => ({
    clientId,
    connected,
    myColor: clientId ? colorFor(clientId) : PALETTE[0],
    get: <T,>(path: string) => stateRef.current.get(path) as T | undefined,
    set: (path, value) => {
      // Optimistic local update
      stateRef.current.set(path, value)
      notifyPath(path)
      // Emit (Socket.IO buffers messages while disconnected by default)
      socketRef.current?.emit('patch', { path, value })
    },
    subscribe: (path, listener) => {
      let s = listenersRef.current.get(path)
      if (!s) { s = new Set(); listenersRef.current.set(path, s) }
      s.add(listener)
      return () => { s!.delete(listener) }
    },
    sendCursor: (x, y) => {
      const sock = socketRef.current
      if (!sock || !sock.connected) return
      sock.emit('cursor', {
        x, y,
        vw: window.innerWidth,
        vh: window.innerHeight,
        color: clientId ? colorFor(clientId) : PALETTE[0],
      })
    },
    sendCursorLeave: () => {
      const sock = socketRef.current
      if (!sock || !sock.connected) return
      sock.emit('cursor-leave')
    },
    subscribeCursors: (listener) => {
      cursorListenersRef.current.add(listener)
      return () => { cursorListenersRef.current.delete(listener) }
    },
    getCursors: () => cursorSnapshotRef.current,
  }), [clientId, connected, notifyPath])

  return <SyncContext.Provider value={ctx}>{children}</SyncContext.Provider>
}

export function useSync(): SyncCtx {
  const ctx = useContext(SyncContext)
  if (!ctx) throw new Error('useSync must be used within <SyncProvider>')
  return ctx
}

// useState-shaped hook backed by a shared path
export function useShared<T>(
  path: string,
  defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const sync = useSync()
  const subscribe = useCallback(
    (cb: () => void) => sync.subscribe(path, cb),
    [sync, path],
  )
  const getSnapshot = useCallback(() => {
    const v = sync.get<T>(path)
    return v === undefined ? defaultValue : v
  }, [sync, path, defaultValue])

  const value = useSyncExternalStore(subscribe, getSnapshot, () => defaultValue)

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prevStored = sync.get<T>(path)
      const prev = prevStored === undefined ? defaultValue : prevStored
      const final =
        typeof next === 'function'
          ? (next as (p: T) => T)(prev as T)
          : next
      sync.set(path, final)
    },
    [sync, path, defaultValue],
  )

  return [value as T, setValue]
}

// Sync window scroll position across all connected clients.
// Applies remote scroll updates without re-broadcasting (suppression window).
export function useWindowScrollSync(path = 'grid.scrollY') {
  const sync = useSync()
  useEffect(() => {
    let scheduled = false
    let pending = 0
    let lastSent = 0
    let suppressUntil = 0
    const TT = 80

    const flush = () => {
      scheduled = false
      lastSent = performance.now()
      if (Date.now() < suppressUntil) return
      sync.set(path, pending)
    }
    const onScroll = () => {
      pending = window.scrollY
      const now = performance.now()
      const since = now - lastSent
      if (since >= TT) flush()
      else if (!scheduled) {
        scheduled = true
        window.setTimeout(flush, TT - since)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const unsub = sync.subscribe(path, () => {
      const v = sync.get<number>(path)
      if (typeof v !== 'number') return
      if (Math.abs(window.scrollY - v) < 3) return
      suppressUntil = Date.now() + 250
      window.scrollTo({ top: v, behavior: 'auto' })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      unsub()
    }
  }, [sync, path])
}

// Subscribe to a path without local-storage style fallback (returns undefined if unset)
export function useSharedRaw<T>(path: string): T | undefined {
  const sync = useSync()
  const subscribe = useCallback(
    (cb: () => void) => sync.subscribe(path, cb),
    [sync, path],
  )
  const getSnapshot = useCallback(() => sync.get<T>(path), [sync, path])
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined)
}

// ---------------- Remote cursors overlay ----------------

const CURSOR_THROTTLE_MS = 50

export function RemoteCursors() {
  const sync = useSync()

  // Send our pointer
  useEffect(() => {
    let lastSent = 0
    let pendingX = 0
    let pendingY = 0
    let scheduled = false

    const flush = () => {
      scheduled = false
      lastSent = performance.now()
      sync.sendCursor(pendingX, pendingY)
    }
    const onMove = (e: PointerEvent) => {
      pendingX = e.clientX
      pendingY = e.clientY
      const now = performance.now()
      const since = now - lastSent
      if (since >= CURSOR_THROTTLE_MS) {
        flush()
      } else if (!scheduled) {
        scheduled = true
        window.setTimeout(flush, CURSOR_THROTTLE_MS - since)
      }
    }
    const onLeave = () => sync.sendCursorLeave()

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      sync.sendCursorLeave()
    }
  }, [sync])

  // Subscribe to remote cursor changes
  const cursors = useSyncExternalStore(
    useCallback((cb: () => void) => sync.subscribeCursors(cb), [sync]),
    useCallback(() => sync.getCursors(), [sync]),
    () => [] as RemoteCursor[],
  )

  if (cursors.length === 0) return null

  // Scale incoming coords to local viewport (sender viewport may differ)
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280
  const vh = typeof window !== 'undefined' ? window.innerHeight : 720

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {cursors.map((c) => {
        const x = c.vw > 0 ? (c.x / c.vw) * vw : c.x
        const y = c.vh > 0 ? (c.y / c.vh) * vh : c.y
        const short = c.id.slice(0, 4)
        return (
          <div
            key={c.id}
            style={{
              position: 'absolute',
              transform: `translate3d(${x}px, ${y}px, 0)`,
              transition: 'transform 80ms linear',
              willChange: 'transform',
            }}
          >
            <svg width="18" height="22" viewBox="0 0 18 22" style={{ display: 'block', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.35))' }}>
              <path
                d="M2 2 L2 17 L6 13 L9 20 L11.5 19 L8.5 12 L14 12 Z"
                fill={c.color}
                stroke="#0e0c08"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                position: 'absolute',
                left: 16,
                top: 14,
                background: c.color,
                color: '#f7f1e3',
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '2px 6px',
                whiteSpace: 'nowrap',
              }}
            >
              {c.name ?? short}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// Small badge users can drop in their UI to show connection state
export function SyncStatus() {
  const { connected, clientId } = useSync()
  const dotColor = connected ? '#5b6e4f' : '#c1432a'
  return (
    <span
      title={clientId ? `id: ${clientId}` : 'connecting…'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 10,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'var(--color-ink-soft)',
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 99,
          background: dotColor,
          boxShadow: `0 0 0 2px ${dotColor}33`,
        }}
      />
      {connected ? 'live' : 'offline'}
    </span>
  )
}
