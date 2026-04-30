// DiPlus GPS heat map — MapLibre GL + Carto Positron.
// • Mostly green (efficient operation).
// • One small zone pulses green → yellow → red with an alert effect.
// • Trucks render as the yellow dump-truck SVG, rotate to heading, carry a tag (T-XXXX).
// • Movement is realistic-slow (≈ 90 s per road traversal), bouncing at endpoints.

import { useEffect, useRef } from 'react'
import maplibregl, { Marker, type GeoJSONSource } from 'maplibre-gl'
import { TRUCK_SVG } from './TruckSvg'
import { useSync } from '../../sync'

type MapView = {
  lng: number
  lat: number
  zoom: number
  bearing: number
  pitch: number
}

const MAP_PATH = 'map.diplus.view'

const CENTER: [number, number] = [-70.030, -15.785]

type Behavior = 'green' | 'warn' | 'alert'

type Road = {
  name: string
  pts: [number, number][]
  alertSegments?: number[]
  warnSegments?: number[]
}

type Segment = {
  id: string
  pts: [number, number][]
  behavior: Behavior
  phase: number
  road: number
  segIdx: number
}

type GpsPoint = { lng: number; lat: number; intensity: number }

type Truck = {
  road: number
  progress: number
  speed: number  // delta progress per second
  tag: string
  marker?: Marker
  rotEl?: HTMLElement
}

// Quadratic Bezier sampler
function curve(
  start: [number, number],
  end: [number, number],
  ctrl: [number, number],
  steps = 24,
): [number, number][] {
  const pts: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * ctrl[0] + t ** 2 * end[0]
    const y = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * ctrl[1] + t ** 2 * end[1]
    pts.push([x, y])
  }
  return pts
}

function buildRoads(): Road[] {
  const c = CENTER
  return [
    {
      // West ramp — has the alert (middle segments)
      name: 'rampa-oeste',
      pts: curve(
        [c[0] - 0.014, c[1] + 0.004],
        [c[0] + 0.001, c[1] - 0.002],
        [c[0] - 0.006, c[1] + 0.001],
        24,
      ),
      alertSegments: [2, 3],
    },
    {
      name: 'haul-norte',
      pts: curve(
        [c[0] - 0.001, c[1] + 0.002],
        [c[0] - 0.014, c[1] + 0.020],
        [c[0] - 0.008, c[1] + 0.012],
        22,
      ),
    },
    {
      // East haul — single segment runs warm
      name: 'haul-este',
      pts: curve(
        [c[0] + 0.001, c[1] - 0.001],
        [c[0] + 0.022, c[1] + 0.006],
        [c[0] + 0.013, c[1] - 0.004],
        22,
      ),
      warnSegments: [3],
    },
    {
      name: 'haul-sur',
      pts: curve(
        [c[0] - 0.002, c[1] - 0.002],
        [c[0] - 0.005, c[1] - 0.016],
        [c[0] - 0.004, c[1] - 0.009],
        20,
      ),
    },
    {
      // Pit ring (closed-ish loop)
      name: 'pit-ring',
      pts: (() => {
        const pts: [number, number][] = []
        for (let i = 0; i <= 36; i++) {
          const a = (i / 36) * Math.PI * 2
          const r = 0.0033
          pts.push([c[0] + Math.cos(a) * r * 1.4, c[1] + Math.sin(a) * r])
        }
        return pts
      })(),
    },
  ]
}

function buildSegments(roads: Road[]): Segment[] {
  const segs: Segment[] = []
  let id = 0
  roads.forEach((r, ri) => {
    const SEG = 5
    let segIdx = 0
    for (let i = 0; i < r.pts.length - 1; i += SEG - 1) {
      const slice = r.pts.slice(i, Math.min(i + SEG, r.pts.length))
      if (slice.length < 2) continue
      let behavior: Behavior = 'green'
      if (r.alertSegments?.includes(segIdx)) behavior = 'alert'
      else if (r.warnSegments?.includes(segIdx)) behavior = 'warn'
      segs.push({
        id: `s${id++}`,
        pts: slice,
        behavior,
        phase: Math.random() * Math.PI * 2,
        road: ri,
        segIdx,
      })
      segIdx++
    }
  })
  return segs
}

// ~1500 GPS samples — most green, denser red around alert zone.
function buildGps(roads: Road[], segments: Segment[]): GpsPoint[] {
  const points: GpsPoint[] = []

  // Base layer: low-intensity points scattered along every road
  roads.forEach((r) => {
    r.pts.forEach((p) => {
      for (let k = 0; k < 18; k++) {
        points.push({
          lng: p[0] + (Math.random() - 0.5) * 0.0009,
          lat: p[1] + (Math.random() - 0.5) * 0.0009,
          intensity: 0.16 + Math.random() * 0.10,
        })
      }
    })
  })

  // Hotspot layer: extra points around alert/warn segments only
  segments.forEach((s) => {
    if (s.behavior === 'alert') {
      s.pts.forEach((p) => {
        for (let k = 0; k < 36; k++) {
          points.push({
            lng: p[0] + (Math.random() - 0.5) * 0.0006,
            lat: p[1] + (Math.random() - 0.5) * 0.0006,
            intensity: 0.85 + Math.random() * 0.15,
          })
        }
      })
    } else if (s.behavior === 'warn') {
      s.pts.forEach((p) => {
        for (let k = 0; k < 14; k++) {
          points.push({
            lng: p[0] + (Math.random() - 0.5) * 0.0006,
            lat: p[1] + (Math.random() - 0.5) * 0.0006,
            intensity: 0.42 + Math.random() * 0.14,
          })
        }
      })
    }
  })

  return points
}

function buildTrucks(roads: Road[]): Truck[] {
  const trucks: Truck[] = []
  const distribution = [3, 2, 2, 1, 0]
  roads.forEach((_, i) => {
    for (let k = 0; k < distribution[i]; k++) {
      const sign = Math.random() > 0.5 ? 1 : -1
      // ~ 0.012 / sec → 1/0.012 ≈ 83 s per road
      const speed = (0.010 + Math.random() * 0.006) * sign
      trucks.push({
        road: i,
        progress: Math.random(),
        speed,
        tag: `T-${Math.floor(2000 + Math.random() * 8000)}`,
      })
    }
  })
  return trucks
}

// Heat function — mostly green, alert zones pulse on a long cycle.
function heatAt(behavior: Behavior, phase: number, t: number): number {
  switch (behavior) {
    case 'green':
      return 0.08 + 0.04 * (Math.sin(t * 0.45 + phase) * 0.5 + 0.5)
    case 'warn': {
      // gentle yellow oscillation
      const v = 0.30 + 0.18 * (Math.sin(t * 0.55 + phase) * 0.5 + 0.5)
      return Math.min(0.55, Math.max(0.18, v))
    }
    case 'alert': {
      // 14s cycle: 0–20% ramp green→red, 20–48% sustain hot, 48–78% decay, 78–100% rest green
      const cycle = ((t + phase * 3.5) % 14) / 14
      if (cycle < 0.20) return 0.10 + (cycle / 0.20) * 0.90
      if (cycle < 0.48) return 1.0
      if (cycle < 0.78) return 0.10 + (1 - (cycle - 0.48) / 0.30) * 0.90
      return 0.10
    }
  }
}

// 0 = north, clockwise (matches CSS rotate degrees & MapLibre bearing)
function bearing(from: [number, number], to: [number, number]): number {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  return (Math.atan2(dx, dy) * 180) / Math.PI
}

function pointAt(
  road: Road,
  progress: number,
): { lng: number; lat: number; heading: number } {
  const p = Math.min(1, Math.max(0, progress))
  const last = road.pts.length - 1
  const idx = Math.min(last - 1, Math.max(0, Math.floor(p * last)))
  const f = p * last - idx
  const a = road.pts[idx]
  const b = road.pts[idx + 1]
  const lng = a[0] + (b[0] - a[0]) * f
  const lat = a[1] + (b[1] - a[1]) * f
  const heading = bearing(a, b)
  return { lng, lat, heading }
}

function segmentsGeoJSON(segments: Segment[], t: number) {
  return {
    type: 'FeatureCollection' as const,
    features: segments.map((s) => ({
      type: 'Feature' as const,
      properties: { heat: heatAt(s.behavior, s.phase, t), id: s.id },
      geometry: { type: 'LineString' as const, coordinates: s.pts },
    })),
  }
}

function gpsGeoJSON(points: GpsPoint[]) {
  return {
    type: 'FeatureCollection' as const,
    features: points.map((p, i) => ({
      type: 'Feature' as const,
      properties: { intensity: p.intensity, id: i },
      geometry: { type: 'Point' as const, coordinates: [p.lng, p.lat] },
    })),
  }
}

export function HeatMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const rafRef = useRef<number>(0)
  const sync = useSync()
  // Suppress local broadcasts while we're applying a remote view
  const suppressBroadcastUntilRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    const roads = buildRoads()
    const segments = buildSegments(roads)
    const gps = buildGps(roads, segments)
    const trucks = buildTrucks(roads)

    // Use any pre-existing shared view as the initial camera
    const initial = sync.get<MapView>(MAP_PATH)
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: initial ? [initial.lng, initial.lat] : CENTER,
      zoom: initial?.zoom ?? 14.4,
      bearing: initial?.bearing ?? 0,
      pitch: initial?.pitch ?? 0,
      attributionControl: { compact: true },
    })
    mapRef.current = map

    // ---- Realtime view sync ----
    const broadcastView = () => {
      if (Date.now() < suppressBroadcastUntilRef.current) return
      const c = map.getCenter()
      sync.set(MAP_PATH, {
        lng: c.lng,
        lat: c.lat,
        zoom: map.getZoom(),
        bearing: map.getBearing(),
        pitch: map.getPitch(),
      } satisfies MapView)
    }
    map.on('moveend', broadcastView)
    map.on('zoomend', broadcastView)
    map.on('rotateend', broadcastView)
    map.on('pitchend', broadcastView)

    const applyRemote = () => {
      const v = sync.get<MapView>(MAP_PATH)
      if (!v) return
      const c = map.getCenter()
      // Skip if essentially identical (avoid echo loops + jitter)
      const sameCenter = Math.abs(c.lng - v.lng) < 1e-6 && Math.abs(c.lat - v.lat) < 1e-6
      const sameZoom = Math.abs(map.getZoom() - v.zoom) < 1e-3
      const sameBearing = Math.abs(map.getBearing() - v.bearing) < 1e-3
      const samePitch = Math.abs(map.getPitch() - v.pitch) < 1e-3
      if (sameCenter && sameZoom && sameBearing && samePitch) return
      suppressBroadcastUntilRef.current = Date.now() + 350
      map.easeTo({
        center: [v.lng, v.lat],
        zoom: v.zoom,
        bearing: v.bearing,
        pitch: v.pitch,
        duration: 220,
      })
    }
    const unsubView = sync.subscribe(MAP_PATH, applyRemote)

    map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), 'top-right')
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: 'metric' }), 'bottom-left')

    map.on('error', (e) => {
      // eslint-disable-next-line no-console
      console.warn('[diplus map] error', e?.error ?? e)
    })

    const ro = new ResizeObserver(() => map.resize())
    ro.observe(containerRef.current)
    setTimeout(() => map.resize(), 50)
    setTimeout(() => map.resize(), 250)

    const truckMarkers: Marker[] = []
    const alertMarkers: Marker[] = []

    map.on('load', () => {
      // eslint-disable-next-line no-console
      console.info('[diplus map] loaded', map.getCanvas().width, '×', map.getCanvas().height)

      // Sources
      map.addSource('segments', { type: 'geojson', data: segmentsGeoJSON(segments, 0) })
      map.addSource('gps', { type: 'geojson', data: gpsGeoJSON(gps) })

      // Heatmap layer (ambient density)
      map.addLayer({
        id: 'gps-heat',
        type: 'heatmap',
        source: 'gps',
        paint: {
          'heatmap-weight': ['get', 'intensity'],
          'heatmap-intensity': 1.1,
          'heatmap-radius': 24,
          'heatmap-opacity': 0.55,
          'heatmap-color': [
            'interpolate', ['linear'], ['heatmap-density'],
            0,    'rgba(91,110,79,0)',
            0.12, 'rgba(140,170,110,0.42)',
            0.40, 'rgba(110,150,80,0.65)',
            0.72, 'rgba(70,125,55,0.85)',
            1,    'rgba(40,90,35,0.95)',
          ],
        },
      })

      // Road shadow
      map.addLayer({
        id: 'segments-shadow',
        type: 'line',
        source: 'segments',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#14110d',
          'line-width': 11,
          'line-opacity': 0.18,
          'line-blur': 2,
        },
      })

      // Road segments — colored by heat
      map.addLayer({
        id: 'segments-line',
        type: 'line',
        source: 'segments',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': [
            'interpolate', ['linear'], ['get', 'heat'],
            0,    '#5b6e4f',
            0.40, '#9c9a52',
            0.62, '#b88641',
            0.82, '#c1432a',
            1,    '#8e2c18',
          ],
          'line-width': [
            'interpolate', ['linear'], ['get', 'heat'],
            0,   5,
            0.5, 6.5,
            1,   9,
          ],
          'line-opacity': 0.95,
        },
      })

      // Alert markers — one pulse marker per alert segment
      const alertSegments = segments.filter((s) => s.behavior === 'alert')
      alertSegments.forEach((s, i) => {
        const center = s.pts[Math.floor(s.pts.length / 2)]
        const el = document.createElement('div')
        el.className = 'diplus-alert'
        el.innerHTML = `
          <div class="diplus-alert-pulse"></div>
          <div class="diplus-alert-pulse" style="animation-delay: 1.2s"></div>
          <div class="diplus-alert-dot"></div>
          ${i === 0 ? '<div class="diplus-alert-tag">Alerta · Δ +18%</div>' : ''}
        `
        const m = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat(center)
          .addTo(map)
        alertMarkers.push(m)
      })

      // Truck markers
      trucks.forEach((tr) => {
        const el = document.createElement('div')
        el.className = 'diplus-truck'
        el.innerHTML = `
          <div class="diplus-truck-rot">${TRUCK_SVG}</div>
          <span class="diplus-truck-tag">${tr.tag}</span>
        `
        tr.rotEl = el.querySelector('.diplus-truck-rot') as HTMLElement

        const road = roads[tr.road]
        const init = pointAt(road, tr.progress)
        const m = new maplibregl.Marker({ element: el, anchor: 'center' })
          .setLngLat([init.lng, init.lat])
          .addTo(map)
        tr.marker = m
        truckMarkers.push(m)

        if (tr.rotEl) {
          const rot = tr.speed >= 0 ? init.heading : init.heading + 180
          tr.rotEl.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`
        }
      })

      // Animation loop
      let lastNow = performance.now()
      const start = lastNow

      const tick = (now: number) => {
        const dt = Math.min(0.1, (now - lastNow) / 1000) // clamp to avoid jumps on tab refocus
        lastNow = now
        const t = (now - start) / 1000

        // Update segment heat
        const segSrc = map.getSource('segments') as GeoJSONSource | undefined
        if (segSrc) segSrc.setData(segmentsGeoJSON(segments, t))

        // Update trucks
        trucks.forEach((tr) => {
          tr.progress += tr.speed * dt
          // Bounce at endpoints (haul roads aren't loops)
          if (tr.progress > 1) {
            tr.progress = 1 - (tr.progress - 1)
            tr.speed = -tr.speed
          } else if (tr.progress < 0) {
            tr.progress = -tr.progress
            tr.speed = -tr.speed
          }
          const road = roads[tr.road]
          const pt = pointAt(road, tr.progress)
          tr.marker?.setLngLat([pt.lng, pt.lat])
          if (tr.rotEl) {
            const rot = tr.speed >= 0 ? pt.heading : pt.heading + 180
            tr.rotEl.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`
          }
        })

        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    })

    return () => {
      unsubView()
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      truckMarkers.forEach((m) => m.remove())
      alertMarkers.forEach((m) => m.remove())
      map.remove()
      mapRef.current = null
    }
  }, [sync])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ width: '100%', height: '100%', minHeight: 200 }}
    />
  )
}
