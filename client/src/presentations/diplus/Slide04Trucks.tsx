import { useLang } from '../../i18n'

type Row = {
  model: string
  capacity: string
  units: number
  avg: number
  min: number
  max: number
  trend: 'up' | 'down' | 'flat'
  flag?: 'best' | 'worst'
}

const rows: Row[] = [
  { model: 'CAT 793F',     capacity: '240 t', units: 6, avg: 78.4, min: 71.2, max: 92.6, trend: 'up',   flag: 'worst' },
  { model: 'Komatsu 930E', capacity: '290 t', units: 4, avg: 72.1, min: 67.0, max: 81.4, trend: 'up'   },
  { model: 'CAT 785D',     capacity: '150 t', units: 5, avg: 54.8, min: 49.6, max: 62.8, trend: 'flat' },
  { model: 'CAT 777G',     capacity: '100 t', units: 4, avg: 41.3, min: 36.8, max: 49.5, trend: 'down' },
  { model: 'Komatsu HD785',capacity:  '90 t', units: 3, avg: 39.2, min: 35.0, max: 44.6, trend: 'flat' },
  { model: 'Volvo A60H',   capacity:  '60 t', units: 2, avg: 26.4, min: 23.8, max: 30.1, trend: 'down', flag: 'best'  },
]

const t = {
  es: {
    eyebrow: '07 · Consumo por modelo',
    section: 'Sección II · Flota',
    smallcap: 'Gal / hora · ventana 30 días',
    titleA: 'Cada modelo',
    titleB: 'tiene su firma.',
    desc:
      'DiPlus separa el consumo por familia de camión. La barra muestra el promedio, el bigote el rango operacional. Los outliers — donde la firma se rompe — son la primera bandera de mantenimiento o conducción.',
    avgLabel: 'Promedio flota',
    avgSub: 'ponderado · 24 unidades',
    colModel: 'Modelo · capacidad',
    colAvg: 'avg gal/h',
    units: 'unidades',
    legendAvg: 'avg',
    legendRange: 'rango min–max',
    legendFleet: 'avg flota',
    outlierLabel: 'Outlier · CAT 793F',
    outlierStat: '+14% sobre flota',
    outlierDesc:
      'Dos unidades elevan el promedio del modelo. Posible: turbo, neumáticos de baja presión, o ruta Rampa Oeste sobreasignada.',
    bestLabel: 'Best in class · Volvo A60H',
    bestStat: '−9% bajo promedio',
    bestDesc:
      'Articulado, asignado a tramos cortos. Sirve como referencia para nuevas compras en flotas de capacidad media.',
    insightLabel: 'Insight',
    insight:
      'La flota gasta como un solo número. DiPlus la separa en seis curvas — cada una con su propia historia.',
  },
  en: {
    eyebrow: '07 · Consumption by model',
    section: 'Section II · Fleet',
    smallcap: 'Gal / hour · 30-day window',
    titleA: 'Every model',
    titleB: 'has its signature.',
    desc:
      'DiPlus separates consumption by truck family. The bar is the average, the whisker is the operational range. Outliers — where the signature breaks — are the first flag for maintenance or driving.',
    avgLabel: 'Fleet average',
    avgSub: 'weighted · 24 units',
    colModel: 'Model · capacity',
    colAvg: 'avg gal/h',
    units: 'units',
    legendAvg: 'avg',
    legendRange: 'min–max range',
    legendFleet: 'fleet avg',
    outlierLabel: 'Outlier · CAT 793F',
    outlierStat: '+14% over fleet',
    outlierDesc:
      "Two units lift the model's average. Possible: turbo, low tire pressure, or oversubscribed West Ramp route.",
    bestLabel: 'Best in class · Volvo A60H',
    bestStat: '−9% below average',
    bestDesc:
      'Articulated, assigned to short hauls. Useful as a reference for new purchases in mid-capacity fleets.',
    insightLabel: 'Insight',
    insight:
      'The fleet spends as a single number. DiPlus splits it into six curves — each with its own story.',
  },
}

const MAX_GPH = 100

const trendArrow = (tr: Row['trend']) =>
  tr === 'up' ? '↑' : tr === 'down' ? '↓' : '→'

const trendColor = (tr: Row['trend']) =>
  tr === 'up' ? 'var(--color-vermilion)' :
  tr === 'down' ? 'var(--color-sage)' :
  'var(--color-mute)'

export function Slide04Trucks() {
  const { lang } = useLang()
  const c = t[lang]

  const fleetAvg =
    rows.reduce((s, r) => s + r.avg * r.units, 0) /
    rows.reduce((s, r) => s + r.units, 0)

  return (
    <section className="absolute inset-0 px-12 lg:px-16 py-10 flex flex-col">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--color-ink-soft)]">
        <span>{c.eyebrow}</span>
        <span>{c.section}</span>
      </div>
      <div className="rule mt-3" />

      {/* Title row */}
      <div className="grid grid-cols-12 gap-8 mt-6">
        <div className="col-span-12 md:col-span-7">
          <div className="smallcaps text-[12px] text-[var(--color-mute)] mb-2">
            {c.smallcap}
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(36px, 4.4vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.014em' }}
          >
            {c.titleA}
            <br />
            <span className="display-italic" style={{ color: 'var(--color-vermilion)' }}>
              {c.titleB}
            </span>
          </h2>
          <p className="text-[15px] text-[var(--color-ink-soft)] mt-3 max-w-[52ch] leading-[1.55]">
            {c.desc}
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 flex items-end justify-end">
          <div className="text-right">
            <div className="smallcaps text-[10px] text-[var(--color-mute)] mb-1">{c.avgLabel}</div>
            <div
              className="display-italic leading-none"
              style={{ fontSize: 'clamp(72px, 9vw, 130px)', letterSpacing: '-0.02em' }}
            >
              {fleetAvg.toFixed(1)}
              <span className="font-mono text-base align-top ml-2 text-[var(--color-mute)]">gal/h</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase mt-2 text-[var(--color-ink-soft)]">
              {c.avgSub}
            </div>
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="mt-7 grid grid-cols-12 gap-8 flex-1 min-h-0">
        <div className="col-span-12 md:col-span-8 flex flex-col">
          {/* axis */}
          <div className="grid grid-cols-[260px_1fr_64px] items-center gap-4 font-mono text-[9px] tracking-[0.24em] uppercase text-[var(--color-mute)] pb-2 border-b border-[var(--color-ink)]/15">
            <span>{c.colModel}</span>
            <div className="relative h-3">
              {[0, 25, 50, 75, 100].map((v) => (
                <div
                  key={v}
                  className="absolute top-0 bottom-0 flex flex-col items-center"
                  style={{ left: `${v}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-px h-1.5 bg-[var(--color-ink)]/40" />
                  <span className="mt-0.5">{v}</span>
                </div>
              ))}
            </div>
            <span className="text-right">{c.colAvg}</span>
          </div>

          <div className="flex-1 flex flex-col justify-around">
            {rows.map((r, i) => {
              const isOutlier = r.flag !== undefined
              const barColor =
                r.flag === 'worst' ? 'var(--color-vermilion)' :
                r.flag === 'best'  ? 'var(--color-sage)' :
                                      'var(--color-ink)'

              const left = (r.min / MAX_GPH) * 100
              const right = (r.max / MAX_GPH) * 100
              const avgPct = (r.avg / MAX_GPH) * 100
              const fleetPct = (fleetAvg / MAX_GPH) * 100

              return (
                <div
                  key={r.model}
                  className="grid grid-cols-[260px_1fr_64px] items-center gap-4 py-3 group"
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-mute)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div className="display text-[18px] leading-tight truncate">{r.model}</div>
                      <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--color-ink-soft)]">
                        {r.capacity} · {r.units} {c.units}
                      </div>
                    </div>
                  </div>

                  <div className="relative h-7">
                    <div className="absolute inset-y-0 left-0 right-0 bg-[var(--color-paper-deep)]" />
                    <div
                      className="absolute top-0 bottom-0 w-px bg-[var(--color-ink)]/30"
                      style={{ left: `${fleetPct}%` }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-px"
                      style={{
                        left: `${left}%`,
                        width: `${right - left}%`,
                        background: 'var(--color-ink)',
                        opacity: 0.4,
                      }}
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 h-2.5 w-px bg-[var(--color-ink)]/60" style={{ left: `${left}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 h-2.5 w-px bg-[var(--color-ink)]/60" style={{ left: `${right}%` }} />
                    <div
                      className="absolute top-1.5 bottom-1.5 transition-all"
                      style={{
                        left: 0,
                        width: `${avgPct}%`,
                        background: barColor,
                        opacity: isOutlier ? 0.95 : 0.85,
                      }}
                    />
                    <div
                      className="absolute -top-1 w-2 h-2 rotate-45"
                      style={{ left: `calc(${avgPct}% - 4px)`, background: barColor }}
                    />
                  </div>

                  <div className="text-right">
                    <div
                      className="font-mono text-[14px] tabular-nums"
                      style={{ color: r.flag === 'worst' ? 'var(--color-vermilion)' : 'var(--color-ink)' }}
                    >
                      {r.avg.toFixed(1)}
                    </div>
                    <div className="font-mono text-[10px]" style={{ color: trendColor(r.trend) }}>
                      {trendArrow(r.trend)} {r.trend === 'flat' ? '0.0' : '1.4'}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="border-t border-[var(--color-ink)]/15 pt-2 flex items-center gap-5 font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[var(--color-ink)] inline-block" /> {c.legendAvg}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-px bg-[var(--color-ink)]/60 inline-block" /> {c.legendRange}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-px h-3 bg-[var(--color-ink)]/40 inline-block" /> {c.legendFleet}
            </span>
          </div>
        </div>

        <aside className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="border border-[var(--color-vermilion)]/40 p-4">
            <div className="flex items-center gap-2">
              <span className="dot" style={{ background: 'var(--color-vermilion)' }} />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--color-vermilion)' }}>
                {c.outlierLabel}
              </span>
            </div>
            <div className="display-italic mt-2" style={{ fontSize: 26, lineHeight: 1.1, color: 'var(--color-vermilion)' }}>
              {c.outlierStat}
            </div>
            <p className="text-[13px] mt-2 text-[var(--color-ink-soft)] leading-snug">
              {c.outlierDesc}
            </p>
          </div>

          <div className="border border-[var(--color-sage)]/40 p-4">
            <div className="flex items-center gap-2">
              <span className="dot" style={{ background: 'var(--color-sage)' }} />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: 'var(--color-sage)' }}>
                {c.bestLabel}
              </span>
            </div>
            <div className="display-italic mt-2" style={{ fontSize: 26, lineHeight: 1.1, color: 'var(--color-sage)' }}>
              {c.bestStat}
            </div>
            <p className="text-[13px] mt-2 text-[var(--color-ink-soft)] leading-snug">
              {c.bestDesc}
            </p>
          </div>

          <div className="border-t border-[var(--color-ink)]/15 pt-3 mt-auto">
            <div className="font-mono text-[9px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
              {c.insightLabel}
            </div>
            <p className="display-italic text-[18px] leading-snug mt-1">
              {c.insight}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
