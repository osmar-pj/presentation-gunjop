import { useLang } from '../../i18n'

const t = {
  es: {
    eyebrow: '08 · Sensores de nivel · Recarga sin riesgo',
    section: 'Sección III · Operación',
    smallcap: 'Nivel + GPS + ETA al surtidor',
    titleA: 'Cero detenciones',
    titleB: 'por combustible.',
    desc:
      'El sensor de nivel cierra el bucle: DiPlus cruza el nivel de tanque, la ruta y la cola de surtido para predecir la ventana óptima. La recarga deja de ser reactiva — pasa a ser planificada.',
    statCardA: ['Recargas en ventana óptima', '+18%', 'mes a mes'],
    statCardB: ['Detenciones por combustible', '0', 'últimos 90 días'],
    statCardC: ['Ciclos de carga adicionales', '+6', 'por unidad / mes'],
    gaugeLabel: 'Tanque · Camión 12-CAT793F',
    gaugeNow: 'Nivel actual',
    zoneFull:    ['100%', 'Lleno · post-surtido'],
    zoneOps:     [' 45%', 'Operación normal'],
    zoneRefuel:  [' 35%', 'Ventana DiPlus · planificada'],
    zoneReserve: [' 25%', 'Reserva segura'],
    zoneCritical:['  15%', 'Riesgo de detención'],
    zoneEmpty:   ['  0%', 'Vacío'],
    timelineLabel: 'Predicción 24 h · turno A→C',
    timelineLegendA: 'Recarga predicha · DiPlus',
    timelineLegendB: 'Riesgo legacy · sin sensor',
    insight: 'El nivel se vuelve dato en vivo. La logística de recarga se vuelve calendario.',
    foot: '↳ Sigue con el ranking de operadores',
  },
  en: {
    eyebrow: '08 · Level sensors · Risk-free refueling',
    section: 'Section III · Operations',
    smallcap: 'Level + GPS + ETA to pump',
    titleA: 'Zero stoppages',
    titleB: 'caused by fuel.',
    desc:
      'The level sensor closes the loop: DiPlus crosses tank level, route, and pump queue to predict the optimal window. Refueling stops being reactive — it becomes scheduled.',
    statCardA: ['Refuels within optimal window', '+18%', 'month over month'],
    statCardB: ['Fuel-related stoppages', '0', 'last 90 days'],
    statCardC: ['Extra haul cycles unlocked', '+6', 'per unit / month'],
    gaugeLabel: 'Tank · Truck 12-CAT793F',
    gaugeNow: 'Current level',
    zoneFull:    ['100%', 'Full · post-refuel'],
    zoneOps:     [' 45%', 'Normal operation'],
    zoneRefuel:  [' 35%', 'DiPlus window · scheduled'],
    zoneReserve: [' 25%', 'Safe reserve'],
    zoneCritical:['  15%', 'Stoppage risk'],
    zoneEmpty:   ['  0%', 'Empty'],
    timelineLabel: '24-hour forecast · shift A→C',
    timelineLegendA: 'Predicted refuel · DiPlus',
    timelineLegendB: 'Legacy risk · sensorless',
    insight: 'Level becomes live data. Refuel logistics becomes a calendar.',
    foot: '↳ Continues with the operator ranking',
  },
} as const

// Predicted refuel events on a 24h timeline (hours 0..24)
const refuels = [
  { at: 4.2,  type: 'planned' as const },
  { at: 11.5, type: 'planned' as const },
  { at: 18.8, type: 'planned' as const },
]
// Legacy stoppage risks (where it would have run out without sensor)
const legacyRisks = [
  { at: 6.1,  near: 'Rampa O.' },
  { at: 21.3, near: 'Dump A'   },
]

const NOW_LEVEL = 0.42 // 42% — right inside DiPlus refuel window

export function Slide05Refueling() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="absolute inset-0 px-12 lg:px-16 py-10 flex flex-col">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--color-ink-soft)]">
        <span>{c.eyebrow}</span>
        <span>{c.section}</span>
      </div>
      <div className="rule mt-3" />

      {/* Title + Stats */}
      <div className="grid grid-cols-12 gap-8 mt-6">
        <div className="col-span-12 md:col-span-6">
          <div className="smallcaps text-[12px] text-[var(--color-mute)] mb-2">
            {c.smallcap}
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(34px, 4.2vw, 58px)', lineHeight: 1.0, letterSpacing: '-0.014em' }}
          >
            {c.titleA}
            <br />
            <span className="display-italic" style={{ color: 'var(--color-sage)' }}>
              {c.titleB}
            </span>
          </h2>
          <p className="text-[15px] text-[var(--color-ink-soft)] mt-3 max-w-[54ch] leading-[1.55]">
            {c.desc}
          </p>
        </div>

        <div className="col-span-12 md:col-span-6 grid grid-cols-3 gap-3">
          {[c.statCardA, c.statCardB, c.statCardC].map(([lbl, val, sub], i) => (
            <div
              key={i}
              className="border border-[var(--color-ink)]/15 p-3 flex flex-col"
            >
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-mute)] leading-tight">
                {lbl}
              </div>
              <div
                className="display-italic mt-2 leading-none"
                style={{
                  fontSize: 'clamp(38px, 4.2vw, 64px)',
                  color: i === 1 ? 'var(--color-sage)' : 'var(--color-ink)',
                }}
              >
                {val}
              </div>
              <div className="font-mono text-[9px] tracking-[0.18em] mt-2 text-[var(--color-ink-soft)] uppercase">
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gauge + Timeline */}
      <div className="grid grid-cols-12 gap-8 mt-7 flex-1 min-h-0">
        {/* GAUGE */}
        <div className="col-span-12 md:col-span-5 flex flex-col">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
              {c.gaugeLabel}
            </span>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase">
              {c.gaugeNow} ·{' '}
              <span style={{ color: 'var(--color-sage)' }}>
                {Math.round(NOW_LEVEL * 100)}%
              </span>
            </span>
          </div>

          <div className="rule mt-2" />

          <div className="flex-1 flex gap-5 mt-3 min-h-[280px]">
            {/* Tank SVG */}
            <div className="relative" style={{ width: 100 }}>
              <svg viewBox="0 0 100 320" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
                <defs>
                  <linearGradient id="fuel-fill" x1="0" x2="0" y1="1" y2="0">
                    <stop offset="0%"  stopColor="#5b6e4f" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#7a8d6c" stopOpacity="0.6" />
                  </linearGradient>
                  <pattern id="liquid-grain" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="6" height="6" fill="url(#fuel-fill)" />
                    <path d="M0 6 L6 0" stroke="#3e4d33" strokeWidth="0.3" opacity="0.5" />
                  </pattern>
                </defs>

                {/* Outer tank */}
                <rect x="14" y="6" width="72" height="308" fill="var(--color-paper-deep)" stroke="var(--color-ink)" strokeWidth="1.2" />

                {/* Threshold zones (background tints) */}
                {/* 0-15 critical */}
                <rect x="14" y={6 + 308 * 0.85} width="72" height={308 * 0.15} fill="var(--color-vermilion)" opacity="0.10" />
                {/* 15-25 reserve */}
                <rect x="14" y={6 + 308 * 0.75} width="72" height={308 * 0.10} fill="var(--color-ochre)" opacity="0.10" />
                {/* 25-45 DiPlus refuel window */}
                <rect x="14" y={6 + 308 * 0.55} width="72" height={308 * 0.20} fill="var(--color-sage)" opacity="0.18" />

                {/* Threshold lines */}
                {[
                  { y: 308 * 0.15, color: 'var(--color-ink)',      dash: 'none' },     // 85% (full operation)
                  { y: 308 * 0.55, color: 'var(--color-sage)',     dash: '3 3' },      // 45% (refuel window top)
                  { y: 308 * 0.65, color: 'var(--color-sage)',     dash: '3 3' },      // 35% (mid)
                  { y: 308 * 0.75, color: 'var(--color-ochre)',    dash: '3 3' },      // 25%
                  { y: 308 * 0.85, color: 'var(--color-vermilion)',dash: 'none' },     // 15%
                ].map((l, i) => (
                  <line
                    key={i}
                    x1="14" x2="86"
                    y1={6 + l.y} y2={6 + l.y}
                    stroke={l.color}
                    strokeWidth="0.8"
                    strokeDasharray={l.dash === 'none' ? '' : l.dash}
                  />
                ))}

                {/* Fuel level fill */}
                <rect
                  x="14"
                  y={6 + 308 * (1 - NOW_LEVEL)}
                  width="72"
                  height={308 * NOW_LEVEL}
                  fill="url(#liquid-grain)"
                />
                {/* Surface line w/ animated wave */}
                <line
                  x1="14"
                  x2="86"
                  y1={6 + 308 * (1 - NOW_LEVEL)}
                  y2={6 + 308 * (1 - NOW_LEVEL)}
                  stroke="var(--color-sage)"
                  strokeWidth="1.6"
                />

                {/* Live indicator arrow */}
                <g transform={`translate(96 ${6 + 308 * (1 - NOW_LEVEL)})`}>
                  <polygon points="-4,0 -10,-5 -10,5" fill="var(--color-sage)" />
                </g>

                {/* Tank top cap */}
                <rect x="44" y="0" width="12" height="6" fill="var(--color-ink)" />
              </svg>
            </div>

            {/* Threshold legend */}
            <div className="flex-1 flex flex-col justify-between py-2 font-mono text-[10px] tracking-[0.18em] uppercase">
              {[
                { col: 'var(--color-ink)', t: c.zoneFull, dot: false },
                { col: 'var(--color-ink-soft)', t: c.zoneOps, dot: false },
                { col: 'var(--color-sage)', t: c.zoneRefuel, dot: true },
                { col: 'var(--color-ochre)', t: c.zoneReserve, dot: false },
                { col: 'var(--color-vermilion)', t: c.zoneCritical, dot: false },
                { col: 'var(--color-mute)', t: c.zoneEmpty, dot: false },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-3" style={{ color: row.col }}>
                  <span className="tabular-nums text-[var(--color-ink)] w-12">
                    {row.t[0]}
                  </span>
                  <div className="flex-1 h-px" style={{ background: row.col, opacity: 0.4 }} />
                  <span className="text-right" style={{ minWidth: 160 }}>
                    {row.dot && <span className="dot mr-2" style={{ background: row.col }} />}
                    {row.t[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TIMELINE + insight */}
        <div className="col-span-12 md:col-span-7 flex flex-col">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
              {c.timelineLabel}
            </span>
            <div className="flex items-center gap-5 font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)]">
              <span className="flex items-center gap-1.5">
                <span className="dot" style={{ background: 'var(--color-sage)' }} /> {c.timelineLegendA}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="dot" style={{ background: 'var(--color-vermilion)' }} /> {c.timelineLegendB}
              </span>
            </div>
          </div>

          <div className="rule mt-2" />

          {/* SVG timeline */}
          <div className="mt-4 relative h-[180px]">
            <svg viewBox="0 0 1000 180" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="depletion" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%"   stopColor="#5b6e4f" stopOpacity="0.5" />
                  <stop offset="40%"  stopColor="#b88641" stopOpacity="0.6" />
                  <stop offset="80%"  stopColor="#c1432a" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c1432a" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Grid */}
              {Array.from({ length: 25 }).map((_, h) => (
                <g key={h}>
                  <line
                    x1={(h / 24) * 1000}
                    x2={(h / 24) * 1000}
                    y1="20"
                    y2="140"
                    stroke="var(--color-ink)"
                    strokeWidth="0.3"
                    opacity={h % 6 === 0 ? 0.25 : 0.08}
                  />
                  {h % 3 === 0 && (
                    <text
                      x={(h / 24) * 1000}
                      y="158"
                      className="font-mono"
                      fontSize="9"
                      fill="var(--color-ink-soft)"
                      textAnchor="middle"
                      letterSpacing="1.4"
                    >
                      {String(h).padStart(2, '0')}h
                    </text>
                  )}
                </g>
              ))}

              {/* Tank-level forecast curve (depletes then refuels) */}
              <path
                d="M 0 30
                   L 175 110
                   L 175 30
                   L 480 110
                   L 480 30
                   L 783 110
                   L 783 30
                   L 1000 80"
                stroke="url(#depletion)"
                strokeWidth="2"
                fill="none"
              />

              {/* Refuel window highlights (green bands) */}
              {refuels.map((r, i) => {
                const x = (r.at / 24) * 1000
                return (
                  <g key={i}>
                    <rect
                      x={x - 18}
                      y="20"
                      width="36"
                      height="120"
                      fill="var(--color-sage)"
                      opacity="0.16"
                    />
                    <line x1={x} x2={x} y1="20" y2="140" stroke="var(--color-sage)" strokeWidth="1.2" />
                    <circle cx={x} cy="30" r="4" fill="var(--color-sage)" />
                    <text
                      x={x}
                      y="14"
                      className="font-mono"
                      fontSize="9"
                      fill="var(--color-sage)"
                      textAnchor="middle"
                      letterSpacing="1.4"
                    >
                      ↻ {r.at.toFixed(1)}h
                    </text>
                  </g>
                )
              })}

              {/* Legacy risk markers */}
              {legacyRisks.map((r, i) => {
                const x = (r.at / 24) * 1000
                return (
                  <g key={i}>
                    <line
                      x1={x}
                      x2={x}
                      y1="20"
                      y2="140"
                      stroke="var(--color-vermilion)"
                      strokeWidth="0.8"
                      strokeDasharray="3 3"
                    />
                    <circle cx={x} cy="140" r="3.5" fill="var(--color-vermilion)" />
                    <text
                      x={x}
                      y="172"
                      className="font-mono"
                      fontSize="9"
                      fill="var(--color-vermilion)"
                      textAnchor="middle"
                      letterSpacing="1"
                    >
                      ✕ {r.near}
                    </text>
                  </g>
                )
              })}

              {/* Baseline labels */}
              <line x1="0" x2="1000" y1="140" y2="140" stroke="var(--color-ink)" strokeWidth="0.6" />
              <text x="6" y="32" className="font-mono" fontSize="9" fill="var(--color-ink-soft)" letterSpacing="1.4">
                100%
              </text>
              <text x="6" y="138" className="font-mono" fontSize="9" fill="var(--color-vermilion)" letterSpacing="1.4">
                15%
              </text>
            </svg>
          </div>

          {/* Insight */}
          <div className="mt-auto pt-5 border-t border-[var(--color-ink)]/15">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)] mb-2">
              Insight
            </div>
            <p className="display-italic text-[20px] leading-snug max-w-[60ch]">
              {c.insight}
            </p>
            <div className="mt-3 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
              {c.foot}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
