# Atelier — Realtime sync

Co-edición libre y global: cualquier acción en un navegador se ve en todos los demás conectados.

## Qué se sincroniza

| Estado | Path en el store | Disparado por |
|---|---|---|
| Presentación abierta en el visor | `viewer.openSlug` | Click en tarjeta del grid / cerrar visor |
| Slide actual (por deck) | `viewer.slideIndex.<slug>` | Flechas, espacio, Page Up/Down, click en barra de progreso |
| Idioma del visor | `viewer.lang` | Toggle ES/EN |
| Tema claro/oscuro | `theme` | Toggle del header |
| Texto del buscador | `grid.search` | Input del header |
| Filtro activo | `grid.filter` | Botones All / In review / Drafts / Archive |
| Scroll de la página | `grid.scrollY` | Scroll del documento |
| Cámara del mapa DiPlus | `map.diplus.view` | Pan, zoom, rotación, pitch |
| Cursores de los demás | (efímero, no persistente) | Movimiento del puntero |

Todo se persiste en memoria del server hasta que reinicies el proceso. Los cursores son efímeros.

## Pre-requisitos

- Node.js 18+ (probado con 24.x)
- npm

## Instalación (una sola vez)

```bash
cd server && npm install
cd ../client && npm install
```

## Levantar los servicios

Necesitas **dos terminales** corriendo en paralelo.

### Terminal 1 — sync server

```bash
cd server
npm start
```

Salida esperada: `[atelier-sync] ws://0.0.0.0:8787`

Health check: `curl http://localhost:8787/health` →
`{"ok":true,"clients":N,"paths":M,"uptime":...}`

### Terminal 2 — cliente Vite

```bash
cd client
npm run dev
```

Vite imprime la URL local (típicamente `http://localhost:5173`).

## Probar

1. Abre la URL de Vite en **dos pestañas/navegadores distintos**.
2. En el header verás un badge `● LIVE` (verde) cuando la conexión esté activa. Si dice `OFFLINE` (rojo), revisa que el server esté arriba.
3. Acciones para verificar sync:
   - Click en una tarjeta del grid → la otra ventana abre el visor
   - Flechas / espacio / clicks en la barra de progreso → navegación de slides
   - `Esc` o botón Cerrar → cierra el visor en ambas
   - Toggle de tema o idioma → se replica
   - Tipea en la búsqueda o cambia el filtro → se replica
   - Scroll en el grid → la otra ventana acompaña
   - Abre la presentación **DiPlus** y pan/zoom/rota el mapa → la otra ventana sigue la cámara
   - Mueve el ratón → verás un puntero de color con tu ID corto en la otra ventana

## Variables de entorno

### Server (`server/`)

| Var | Default | Descripción |
|---|---|---|
| `PORT` | `8787` | Puerto WebSocket + HTTP |
| `HOST` | `0.0.0.0` | Interfaz en la que escucha |

Ejemplo: `PORT=9000 npm start`

### Cliente (`client/`)

| Var | Default | Descripción |
|---|---|---|
| `VITE_SYNC_URL` | `ws://<hostname>:8787` | URL del WebSocket. Útil para producción o si cambias el puerto |

Ejemplo (en `client/.env.local`):
```
VITE_SYNC_URL=ws://localhost:9000
```

## Troubleshooting

### `EADDRINUSE: address already in use 0.0.0.0:8787`
Ya hay un proceso usando el puerto. Identifícalo y mátalo, o cambia el puerto con `PORT=...`.

```bash
lsof -iTCP:8787 -sTCP:LISTEN
kill <PID>
```

### El badge dice `OFFLINE` aunque el server esté arriba
- Confirma que `curl http://localhost:8787/health` responde.
- Si abres el cliente desde otro host (no `localhost`), define `VITE_SYNC_URL` apuntando al server alcanzable desde ese host.
- Mira la consola del navegador: errores de conexión se imprimen ahí.

### Las ventanas se desincronizan después de un rato
El cliente reconecta automáticamente con backoff (400ms → 5s). Si el server se reinicia, **el estado en memoria se pierde** — la primera ventana que toque algo después fija el estado nuevo y las demás convergen.

### Quiero resetear el estado compartido
Reinicia el sync server. El store es solo en memoria.

## Arquitectura (resumen)

```
client (React)                          server (Node)
─────────────────                       ──────────────
SyncProvider ──── WebSocket ─────►  ws.WebSocketServer
useShared(path)                          (broadcast a peers)
RemoteCursors                            Map<path, value>
useWindowScrollSync                      /health
```

- **Mensajes**: `{type:'patch', path, value}` para estado, `{type:'cursor', x, y, vw, vh, color}` para cursores, `{type:'snapshot'}` al conectar.
- **Anti-eco**: el server reenvía a todos *excepto al emisor*. En MapLibre y scroll usamos una ventana de supresión (~250–350ms) para que aplicar un cambio remoto no dispare un broadcast propio.
- **Reconexión**: backoff exponencial en cliente; heartbeat (`ping`/`pong` cada 30s) en server para descartar sockets muertos.
- **Persistencia**: ninguna — es estado vivo. Reiniciar el server resetea todo.

## Archivos clave

- `server/index.js` — server WebSocket
- `client/src/sync.tsx` — provider, hook `useShared`, cursores, scroll sync
- Wiring: `App.tsx`, `theme.tsx`, `i18n.tsx`, `components/PresentationViewer.tsx`, `presentations/diplus/HeatMap.tsx`
