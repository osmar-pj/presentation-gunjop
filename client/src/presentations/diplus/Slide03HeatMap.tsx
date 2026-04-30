import { useLang } from '../../i18n'
import { HeatMap } from './HeatMap'

const t = {
  es: {
    live: 'En vivo · Mina Apurímac · 09:02',
    legend: 'Δ vs línea base',
    eyebrow: '06 · Mapa de calor',
    titleA: 'Anomalías de consumo,',
    titleB: 'geo-localizadas.',
    desc:
      'Cada lectura GPS se compara con la línea base de la zona. Lo que vibra en rojo es lo que se sale del patrón.',
    activeLabel: 'Flota activa',
    activeSub: 'de 22 unidades',
    anomLabel: 'Anomalías',
    anomSub: 'últimas 4 h',
    hotspots: 'Hotspots ahora',
    hotspotsLive: 'en vivo',
    items: [
      { name: 'Rampa Oeste · Tramo 3', delta: '+18%', level: 'critical', gph: '64.2 gal/h' },
      { name: 'Cola de carga · Pit',    delta: '+12%', level: 'critical', gph: '21.4 gal/h' },
      { name: 'Curva Dump A',           delta:  '+6%', level: 'warning',  gph: '38.7 gal/h' },
      { name: 'Bajada Este',            delta:  '−4%', level: 'good',     gph: '17.3 gal/h' },
    ],
    actionLabel: 'Acción sugerida',
    action:
      'Inspeccionar superficie de Rampa Oeste tramo 3; reasignar carga al operador con curva más eficiente.',
  },
  en: {
    live: 'Live · Apurímac Mine · 09:02',
    legend: 'Δ vs baseline',
    eyebrow: '06 · Heat map',
    titleA: 'Consumption anomalies,',
    titleB: 'geo-located.',
    desc:
      "Each GPS reading is compared to the zone's baseline. Whatever pulses red is what breaks the pattern.",
    activeLabel: 'Active fleet',
    activeSub: 'of 22 units',
    anomLabel: 'Anomalies',
    anomSub: 'last 4 h',
    hotspots: 'Hotspots now',
    hotspotsLive: 'live',
    items: [
      { name: 'West Ramp · Segment 3', delta: '+18%', level: 'critical', gph: '64.2 gal/h' },
      { name: 'Load queue · Pit',       delta: '+12%', level: 'critical', gph: '21.4 gal/h' },
      { name: 'Dump A curve',           delta:  '+6%', level: 'warning',  gph: '38.7 gal/h' },
      { name: 'East descent',           delta:  '−4%', level: 'good',     gph: '17.3 gal/h' },
    ],
    actionLabel: 'Suggested action',
    action:
      'Inspect West Ramp segment 3 surface; reassign load to the operator with the more efficient curve.',
  },
} as const

const levelColor: Record<'critical' | 'warning' | 'good', string> = {
  critical: 'var(--color-vermilion)',
  warning:  'var(--color-ochre)',
  good:     'var(--color-sage)',
}

export function Slide03HeatMap() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="absolute inset-0 flex">
      {/* Map area */}
      <div className="flex-1 relative bg-[#e7dfd0]">
        <HeatMap />

        {/* Floating header chip */}
        <div className="absolute top-5 left-5 bg-[var(--color-paper)] border border-[var(--color-ink)]/40 px-3 py-2 flex items-center gap-3">
          <span className="dot animate-pulse" style={{ background: 'var(--color-vermilion)' }} />
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase">
            {c.live}
          </span>
        </div>

        {/* Legend (bottom-right) */}
        <div className="absolute bottom-6 right-6 bg-[var(--color-paper)] border border-[var(--color-ink)]/30 p-3 w-[260px]">
          <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-[var(--color-mute)] mb-2">
            {c.legend}
          </div>
          <div
            className="h-2 w-full"
            style={{
              background:
                'linear-gradient(to right, var(--color-sage), #d6c8a3, var(--color-ochre), var(--color-vermilion))',
            }}
          />
          <div className="flex justify-between font-mono text-[9px] tracking-[0.2em] mt-1.5 text-[var(--color-ink-soft)]">
            <span>−5%</span>
            <span>0%</span>
            <span>+10%</span>
            <span>+20%</span>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <aside className="w-[340px] shrink-0 border-l border-[var(--color-ink)]/15 px-7 py-8 flex flex-col bg-[var(--color-paper)]">
        <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-[var(--color-mute)]">
          {c.eyebrow}
        </div>
        <h2
          className="display mt-2"
          style={{ fontSize: 34, lineHeight: 1.05, letterSpacing: '-0.014em' }}
        >
          {c.titleA}
          <br />
          <span className="display-italic" style={{ color: 'var(--color-vermilion)' }}>
            {c.titleB}
          </span>
        </h2>

        <p className="text-[13.5px] mt-3 text-[var(--color-ink-soft)] leading-[1.55]">
          {c.desc}
        </p>

        {/* KPI cards */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="border border-[var(--color-ink)]/20 p-3">
            <div className="font-mono text-[9px] tracking-[0.24em] uppercase text-[var(--color-mute)]">
              {c.activeLabel}
            </div>
            <div className="display-italic text-2xl mt-1 leading-none">18</div>
            <div className="font-mono text-[9px] tracking-[0.18em] mt-1 text-[var(--color-ink-soft)]">
              {c.activeSub}
            </div>
          </div>
          <div className="border border-[var(--color-ink)]/20 p-3">
            <div className="font-mono text-[9px] tracking-[0.24em] uppercase text-[var(--color-mute)]">
              {c.anomLabel}
            </div>
            <div
              className="display-italic text-2xl mt-1 leading-none"
              style={{ color: 'var(--color-vermilion)' }}
            >
              06
            </div>
            <div className="font-mono text-[9px] tracking-[0.18em] mt-1 text-[var(--color-ink-soft)]">
              {c.anomSub}
            </div>
          </div>
        </div>

        {/* Hotspots */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between">
            <div className="smallcaps text-[11px] text-[var(--color-mute)]">
              {c.hotspots}
            </div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-mute)]">
              {c.hotspotsLive}
            </div>
          </div>
          <div className="rule mt-2" />
          <ul className="divide-y divide-[var(--color-ink)]/10">
            {c.items.map((h, i) => (
              <li key={i} className="py-3 flex items-start gap-3">
                <span
                  className="dot mt-1.5 shrink-0"
                  style={{ background: levelColor[h.level] }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] leading-snug">{h.name}</div>
                  <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--color-ink-soft)] mt-0.5">
                    {h.gph}
                  </div>
                </div>
                <div
                  className="font-mono text-[12px] tabular-nums"
                  style={{ color: levelColor[h.level] }}
                >
                  {h.delta}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-[var(--color-ink)]/15">
          <div className="font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
            {c.actionLabel}
          </div>
          <p className="text-[13px] mt-1.5 italic text-[var(--color-ink-soft)]">
            {c.action}
          </p>
        </div>
      </aside>
    </section>
  )
}
