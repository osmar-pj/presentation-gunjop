import { useLang } from '../../i18n'

type Op = {
  name: string
  shift: 'A' | 'B' | 'C'
  hours: number
  delta: number // % vs baseline; negative = better
}

const ops: Op[] = [
  { name: 'R. Quispe',         shift: 'A', hours: 412, delta: -2.4 },
  { name: 'M. Mamani',         shift: 'B', hours: 398, delta: -1.8 },
  { name: 'J. Huamán',         shift: 'A', hours: 405, delta: -1.2 },
  { name: 'F. Condori',        shift: 'C', hours: 380, delta: -0.4 },
  { name: 'A. Ticona',         shift: 'A', hours: 422, delta: -0.1 },
  { name: 'C. Apaza',          shift: 'B', hours: 391, delta:  0.6 },
  { name: 'D. Cáceres',        shift: 'C', hours: 376, delta:  0.9 },
  { name: 'L. Choquehuanca',   shift: 'B', hours: 410, delta:  1.5 },
  { name: 'R. Quintana',       shift: 'A', hours: 388, delta:  2.2 },
  { name: 'P. Huanca',         shift: 'C', hours: 402, delta:  2.7 },
]

const t = {
  es: {
    eyebrow: '09 · Ranking de operadores',
    section: 'Sección IV · Personas',
    smallcap: 'Δ vs línea base · ventana 30 días',
    titleA: 'La brecha está,',
    titleB: 'ahora se mide.',
    gapLabel: 'Brecha top-3 ↔ bottom-3',
    gapSub: 'dentro del rango esperado · 2 — 4%',
    colRank: 'Rank',
    colOp: 'Operador',
    colShift: 'Turno',
    colHours: 'Horas',
    colDelta: 'Δ vs base · −5%   0   +5%',
    colDeltaShort: 'Delta',
    legendTop: 'top 3 · referencia',
    legendBottom: 'bottom 3 · coaching',
    legendBase: 'baseline 0%',
    oppLabel: 'Oportunidad',
    oppTitleA: 'Cerrar la brecha al',
    oppTitleB: 'top quartile',
    rowGap: 'Brecha hoy',
    rowFuel: 'Combustible / año',
    rowGal: 'Galones evitables',
    rowSavings: 'Ahorro estimado',
    planLabel: 'Plan',
    plan: [
      'Coaching 1:1 al bottom-3, basado en la curva de Quispe.',
      'Re-asignar Rampa Oeste al top quartile durante 30 días.',
      'Re-medir y publicar nueva línea base.',
    ],
    end: 'Fin · gracias',
  },
  en: {
    eyebrow: '09 · Operator ranking',
    section: 'Section IV · People',
    smallcap: 'Δ vs baseline · 30-day window',
    titleA: 'The gap is there —',
    titleB: "now it's measured.",
    gapLabel: 'Gap top-3 ↔ bottom-3',
    gapSub: 'within expected range · 2 — 4%',
    colRank: 'Rank',
    colOp: 'Operator',
    colShift: 'Shift',
    colHours: 'Hours',
    colDelta: 'Δ vs base · −5%   0   +5%',
    colDeltaShort: 'Delta',
    legendTop: 'top 3 · reference',
    legendBottom: 'bottom 3 · coaching',
    legendBase: 'baseline 0%',
    oppLabel: 'Opportunity',
    oppTitleA: 'Close the gap to',
    oppTitleB: 'top quartile',
    rowGap: 'Gap today',
    rowFuel: 'Fuel / year',
    rowGal: 'Avoidable gallons',
    rowSavings: 'Estimated savings',
    planLabel: 'Plan',
    plan: [
      "1:1 coaching for the bottom-3, based on Quispe's curve.",
      'Reassign West Ramp to the top quartile for 30 days.',
      'Re-measure and publish a new baseline.',
    ],
    end: 'End · thank you',
  },
}

const top3 = ops.slice(0, 3).reduce((s, o) => s + o.delta, 0) / 3
const bot3 = ops.slice(-3).reduce((s, o) => s + o.delta, 0) / 3
const gap = bot3 - top3

const fmt = (n: number) => (n > 0 ? '+' : '') + n.toFixed(1) + '%'

const colorFor = (d: number) =>
  d <= -1.0 ? 'var(--color-sage)' :
  d <=  0.5 ? 'var(--color-ink-soft)' :
              'var(--color-vermilion)'

export function Slide05Ranking() {
  const { lang } = useLang()
  const c = t[lang]
  const maxAbs = Math.max(...ops.map((o) => Math.abs(o.delta)))

  return (
    <section className="absolute inset-0 px-12 lg:px-16 py-10 flex flex-col">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--color-ink-soft)]">
        <span>{c.eyebrow}</span>
        <span>{c.section}</span>
      </div>
      <div className="rule mt-3" />

      <div className="grid grid-cols-12 gap-8 mt-6 items-end">
        <div className="col-span-12 md:col-span-7">
          <div className="smallcaps text-[12px] text-[var(--color-mute)] mb-2">
            {c.smallcap}
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(34px, 4.2vw, 58px)', lineHeight: 1.0, letterSpacing: '-0.014em' }}
          >
            {c.titleA}
            <br />
            <span className="display-italic" style={{ color: 'var(--color-vermilion)' }}>
              {c.titleB}
            </span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-5">
          <div className="border-l-2 border-[var(--color-vermilion)] pl-5">
            <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-[var(--color-mute)]">
              {c.gapLabel}
            </div>
            <div
              className="display-italic leading-none mt-1"
              style={{ fontSize: 'clamp(72px, 9vw, 130px)', color: 'var(--color-vermilion)', letterSpacing: '-0.02em' }}
            >
              {gap.toFixed(1)}<span style={{ fontSize: '0.45em', verticalAlign: 'top' }}>%</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[var(--color-ink-soft)] mt-1">
              {c.gapSub}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 mt-7 flex-1 min-h-0">
        <div className="col-span-12 md:col-span-8 flex flex-col">
          <div className="grid grid-cols-[40px_1fr_60px_80px_1fr_70px] items-center gap-3 font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-mute)] pb-2 border-b border-[var(--color-ink)]/30">
            <span>{c.colRank}</span>
            <span>{c.colOp}</span>
            <span>{c.colShift}</span>
            <span>{c.colHours}</span>
            <span className="px-2">{c.colDelta}</span>
            <span className="text-right">{c.colDeltaShort}</span>
          </div>

          <div className="flex-1 flex flex-col">
            {ops.map((o, i) => {
              const rank = i + 1
              const pct = (o.delta / (maxAbs * 1.05)) * 50
              const isTop = i < 3
              const isBottom = i >= ops.length - 3

              return (
                <div
                  key={o.name}
                  className="grid grid-cols-[40px_1fr_60px_80px_1fr_70px] items-center gap-3 py-2.5 border-b border-[var(--color-ink)]/8"
                  style={{
                    background: isTop ? 'rgba(91,110,79,0.05)' :
                                 isBottom ? 'rgba(193,67,42,0.05)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    {isTop && <span className="dot" style={{ background: 'var(--color-sage)' }} />}
                    {isBottom && <span className="dot" style={{ background: 'var(--color-vermilion)' }} />}
                    <span className="display-italic text-[18px] leading-none">{String(rank).padStart(2, '0')}</span>
                  </div>

                  <div>
                    <div className="display text-[16px] leading-tight">{o.name}</div>
                  </div>

                  <div className="font-mono text-[11px] tracking-[0.24em] text-[var(--color-ink-soft)]">
                    {o.shift}
                  </div>

                  <div className="font-mono text-[11px] tabular-nums text-[var(--color-ink-soft)]">
                    {o.hours} h
                  </div>

                  <div className="relative h-4">
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-[var(--color-ink)]/15" />
                    <div className="absolute top-0 bottom-0 w-px bg-[var(--color-ink)]/40" style={{ left: '50%' }} />
                    {[-25, 25].map((g) => (
                      <div
                        key={g}
                        className="absolute top-1 bottom-1 w-px bg-[var(--color-ink)]/10"
                        style={{ left: `${50 + g}%` }}
                      />
                    ))}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-2"
                      style={{
                        left: o.delta < 0 ? `calc(50% + ${pct}%)` : '50%',
                        width: `${Math.abs(pct)}%`,
                        background: colorFor(o.delta),
                        opacity: 0.9,
                      }}
                    />
                  </div>

                  <div
                    className="text-right font-mono text-[13px] tabular-nums"
                    style={{ color: colorFor(o.delta) }}
                  >
                    {fmt(o.delta)}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-2 flex items-center gap-5 font-mono text-[9px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)]">
            <span className="flex items-center gap-1.5">
              <span className="dot" style={{ background: 'var(--color-sage)' }} /> {c.legendTop}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="dot" style={{ background: 'var(--color-vermilion)' }} /> {c.legendBottom}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-px h-2.5 bg-[var(--color-ink)]/40 inline-block" /> {c.legendBase}
            </span>
          </div>
        </div>

        <aside className="col-span-12 md:col-span-4 flex flex-col gap-4">
          <div className="border border-[var(--color-ink)]/30 p-5 bg-[var(--color-paper-deep)]/40">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
              {c.oppLabel}
            </div>
            <div className="display-italic mt-1.5" style={{ fontSize: 28, lineHeight: 1.05 }}>
              {c.oppTitleA}
              <br />
              <span style={{ color: 'var(--color-vermilion)' }}>{c.oppTitleB}</span>
            </div>

            <dl className="mt-4 space-y-3 font-mono text-[11px]">
              <div className="flex justify-between border-b border-[var(--color-ink)]/15 pb-2">
                <dt className="tracking-[0.22em] uppercase text-[var(--color-mute)]">{c.rowGap}</dt>
                <dd className="tabular-nums">{gap.toFixed(1)}%</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--color-ink)]/15 pb-2">
                <dt className="tracking-[0.22em] uppercase text-[var(--color-mute)]">{c.rowFuel}</dt>
                <dd className="tabular-nums">2.8 M gal</dd>
              </div>
              <div className="flex justify-between border-b border-[var(--color-ink)]/15 pb-2">
                <dt className="tracking-[0.22em] uppercase text-[var(--color-mute)]">{c.rowGal}</dt>
                <dd className="tabular-nums" style={{ color: 'var(--color-vermilion)' }}>
                  ≈ 98 k gal
                </dd>
              </div>
              <div className="flex justify-between pt-1">
                <dt className="tracking-[0.22em] uppercase text-[var(--color-ink)]">{c.rowSavings}</dt>
                <dd
                  className="display-italic tabular-nums"
                  style={{ fontSize: 26, color: 'var(--color-vermilion)', lineHeight: 1 }}
                >
                  $240k
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-[var(--color-ink)]/15 p-4">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
              {c.planLabel}
            </div>
            <ol className="mt-2 space-y-2 text-[13px] leading-snug">
              {c.plan.map((p, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-[10px] mt-0.5 text-[var(--color-vermilion)]">
                    {['i.', 'ii.', 'iii.'][i]}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-auto pt-3 border-t border-[var(--color-ink)]/15 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
            {c.end}
          </div>
        </aside>
      </div>
    </section>
  )
}
