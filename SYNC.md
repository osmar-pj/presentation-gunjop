# Atelier — Realtime sync

Co-edición libre y global: cualquier acción en un navegador se ve en todos los demás conectados. Transporte: **Socket.IO** (WebSocket cuando puede, fallback automático a HTTP long-polling cuando no).

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

Dos terminales en paralelo.

### Terminal 1 — sync server

```bash
cd server
npm start
```

Salida esperada: `[atelier-sync] http://0.0.0.0:8787  (Socket.IO)`

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
| `PORT` | `8787` | Puerto HTTP del server |
| `HOST` | `0.0.0.0` | Interfaz en la que escucha |
| `CORS_ORIGIN` | `*` | Orígenes permitidos. En producción restríngelo a tu dominio del cliente, ej. `https://atelier.tudominio.com` |

Ejemplo: `PORT=9000 CORS_ORIGIN=https://atelier.tudominio.com npm start`

### Cliente (`client/`)

| Var | Default | Descripción |
|---|---|---|
| `VITE_SYNC_URL` | `<protocolo>//<hostname>:8787` | URL del server (HTTP o HTTPS). Socket.IO se encarga del upgrade a WebSocket internamente |

Ejemplos:

```bash
# Desarrollo local
VITE_SYNC_URL=http://localhost:8787

# Producción (server detrás de Nginx/Proxy con TLS)
VITE_SYNC_URL=https://presentation.paranoid.lat
```

> **Importante:** las variables de Vite se inyectan en build-time. Si cambias `.env` debes correr `npm run build` de nuevo.

Pon producción en `client/.env.production`:
```
VITE_SYNC_URL=https://presentation.paranoid.lat
```

## Despliegue en producción

### Cliente en cPanel

```bash
cd client
# .env.production debe tener VITE_SYNC_URL=https://tu-dominio
npm run build
# Sube client/dist/* a public_html en cPanel
```

### Server en VPS detrás de Nginx Proxy Manager

1. Levantar el Node con pm2 o systemd para que sobreviva reinicios:
   ```bash
   cd server && npm install
   pm2 start index.js --name atelier-sync
   pm2 save
   pm2 startup
   ```

2. Configurar Proxy Host en NPM:
   - **Domain Names:** `presentation.tu-dominio`
   - **Scheme:** `http` (Nginx termina TLS, hacia atrás va plano)
   - **Forward Hostname/IP:** depende de cómo corra NPM:
     - Si NPM en Docker y Node en el host → `host.docker.internal` o IP del bridge (`172.17.0.1`)
     - Si NPM en Docker y Node en otro contenedor en la misma red → nombre del contenedor
     - Si NPM nativo en el host → `127.0.0.1`
   - **Forward Port:** `8787`
   - **Block Common Exploits:** OFF
   - **Websockets Support:** ON ✅
   - **SSL → Force SSL:** ON
   - **SSL → HTTP/2 Support:** preferiblemente OFF (algunos setups WS+H2 dan problemas; con polling fallback igual funciona)
   - **Advanced (opcional):** para WS largos:
     ```nginx
     proxy_read_timeout 3600s;
     proxy_send_timeout 3600s;
     ```

3. Verifica de extremo a extremo:
   ```bash
   curl -i https://presentation.tu-dominio/health
   ```
   Debe responder `200` con JSON.

4. Si Socket.IO no logra el upgrade a WebSocket, **automáticamente** usa long-polling sobre HTTPS — la app sigue funcionando igual, solo un poco menos eficiente. En devtools del browser verás peticiones a `/socket.io/?transport=polling`.

### Diagnóstico rápido

| Síntoma | Causa probable |
|---|---|
| `curl https://.../health` cuelga | NPM no llega al Node. Forward Hostname/IP mal puesto |
| `curl` da `502 Bad Gateway` | NPM ahí pero Node caído o forward port incorrecto |
| `curl` da JSON pero badge `OFFLINE` en el browser | Origin de CORS bloqueado — define `CORS_ORIGIN` con tu dominio |
| Funciona pero solo polling | WebSocket upgrade no pasa el proxy. Activa "Websockets Support" en NPM |
| `EADDRINUSE :8787` | Otro proceso ocupando el puerto. `lsof -iTCP:8787 -sTCP:LISTEN` y matarlo |

## Arquitectura (resumen)

```
client (React)                            server (Node)
─────────────────                         ──────────────────
SyncProvider ──── Socket.IO ─────────►    socket.io.Server
useShared(path)    (WS o polling)         (broadcast a peers)
RemoteCursors                             Map<path, value>
useWindowScrollSync                       /health
```

- **Eventos**: `patch` para estado, `cursor`/`cursor-leave` para cursores, `snapshot` al conectar, `peer-leave` al desconectar.
- **Anti-eco**: el server reenvía a todos *excepto al emisor*. En MapLibre y scroll usamos una ventana de supresión (~250–350ms) para que aplicar un cambio remoto no dispare un broadcast propio.
- **Reconexión**: la maneja Socket.IO automáticamente con backoff exponencial.
- **Persistencia**: ninguna — es estado vivo. Reiniciar el server resetea todo.

## Archivos clave

- `server/index.js` — server Socket.IO
- `client/src/sync.tsx` — provider, hook `useShared`, cursores, scroll sync, badge
- Wiring: `App.tsx`, `theme.tsx`, `i18n.tsx`, `components/PresentationViewer.tsx`, `presentations/diplus/HeatMap.tsx`
