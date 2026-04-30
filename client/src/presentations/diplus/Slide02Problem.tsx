import { useLang } from '../../i18n'

const t = {
  es: {
    eyebrow: '05 · Problema y solución',
    section: 'Sección I',
    problemLabel: 'i. El problema',
    headLine1: 'El combustible se va,',
    headLine2: 'y nadie sabe a dónde.',
    bullets: [
      'Promedios mensuales esconden zonas de alto consumo y eventos críticos.',
      'El gal/h por modelo se mezcla en un solo número de flota.',
      'La brecha entre operadores nunca se cuantifica — ni se entrena.',
    ],
    statLabel: 'Brecha detectable',
    statSub: 'entre operadores',
    statMoney: 'USD 240k / año',
    statMoneySub: 'por mina mediana',
    solutionLabel: 'ii. La solución',
    solutionTitle: 'DiPlus mide lo diferencial.',
    solutionDesc:
      'Sensor diferencial + GPS de alta frecuencia. Cada galón se asocia a una coordenada, un operador, un modelo, una hora. Tres lecturas inmediatas:',
    items: [
      ['Mapa de calor', 'Zonas que queman más combustible que su línea base.'],
      ['Gal/h por modelo', 'Curvas de consumo por tipo de camión, en vivo.'],
      ['Ranking de operadores', 'Brecha cuantificada y planes de coaching.'],
    ] as const,
    foot: 'DiPlus · Telemetría diferencial',
    footRight: '↳ Continúa con el mapa de calor',
  },
  en: {
    eyebrow: '05 · Problem & Solution',
    section: 'Section I',
    problemLabel: 'i. The problem',
    headLine1: 'Fuel is leaving,',
    headLine2: "and no one knows where.",
    bullets: [
      'Monthly averages hide high-consumption zones and critical events.',
      'Gal/h per model is averaged into a single fleet number.',
      'The gap between operators is never quantified — nor trained.',
    ],
    statLabel: 'Detectable gap',
    statSub: 'between operators',
    statMoney: 'USD 240k / year',
    statMoneySub: 'per mid-size mine',
    solutionLabel: 'ii. The solution',
    solutionTitle: 'DiPlus measures the differential.',
    solutionDesc:
      'Differential sensor + high-frequency GPS. Every gallon ties to a coordinate, an operator, a model, an hour. Three immediate readings:',
    items: [
      ['Heat map', 'Zones burning more fuel than their baseline.'],
      ['Gal/h by model', 'Consumption curves per truck type, live.'],
      ['Operator ranking', 'Quantified gap and coaching plans.'],
    ] as const,
    foot: 'DiPlus · Differential telemetry',
    footRight: '↳ Continues with the heat map',
  },
}

export function Slide02Problem() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="absolute inset-0 px-12 lg:px-20 py-10 flex flex-col">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--color-ink-soft)]">
        <span>{c.eyebrow}</span>
        <span>{c.section}</span>
      </div>
      <div className="rule mt-3" />

      <div className="grid grid-cols-12 gap-8 mt-8 flex-1 min-h-0">
        {/* LEFT — Problem */}
        <div className="col-span-12 md:col-span-5 flex flex-col">
          <div className="smallcaps text-[12px] text-[var(--color-mute)] mb-3">
            {c.problemLabel}
          </div>
          <h2
            className="display"
            style={{ fontSize: 'clamp(34px, 4.2vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.014em' }}
          >
            {c.headLine1}
            <br />
            <span className="display-italic" style={{ color: 'var(--color-vermilion)' }}>
              {c.headLine2}
            </span>
          </h2>

          <ul className="mt-7 space-y-4 text-[17px] leading-[1.55] text-[var(--color-ink-soft)] max-w-[44ch]">
            {c.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-[10px] tracking-[0.24em] text-[var(--color-vermilion)] mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER — Hero stat */}
        <div className="col-span-12 md:col-span-3 flex items-center justify-center border-x border-[var(--color-ink)]/15 px-2">
          <div className="text-center">
            <div className="smallcaps text-[10px] text-[var(--color-mute)] mb-2">
              {c.statLabel}
            </div>
            <div
              className="display-italic leading-none"
              style={{
                fontSize: 'clamp(110px, 13vw, 200px)',
                color: 'var(--color-vermilion)',
                letterSpacing: '-0.02em',
              }}
            >
              2–4<span style={{ fontSize: '0.5em', verticalAlign: 'top' }}>%</span>
            </div>
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-ink-soft)] mt-3">
              {c.statSub}
            </div>
            <div className="rule my-4 max-w-[70%] mx-auto" />
            <div className="font-mono text-[11px] tracking-[0.18em] text-[var(--color-ink)]">
              ≈ <strong>{c.statMoney}</strong> {c.statMoneySub}
            </div>
          </div>
        </div>

        {/* RIGHT — Solution */}
        <div className="col-span-12 md:col-span-4 flex flex-col">
          <div className="smallcaps text-[12px] text-[var(--color-sage)] mb-3">
            {c.solutionLabel}
          </div>
          <h3
            className="display-italic"
            style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', lineHeight: 1.15 }}
          >
            {c.solutionTitle}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.6] text-[var(--color-ink-soft)]">
            {c.solutionDesc}
          </p>

          <ol className="mt-5 space-y-3">
            {c.items.map(([title, desc], i) => (
              <li
                key={i}
                className="flex gap-4 items-start border-t border-[var(--color-ink)]/15 pt-3"
              >
                <span
                  className="font-mono text-[11px] tracking-[0.24em] mt-1"
                  style={{ color: 'var(--color-sage)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="display text-[18px] leading-tight">{title}</div>
                  <div className="text-[13px] text-[var(--color-ink-soft)] mt-0.5">{desc}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="rule mt-6" />
      <div className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-mute)]">
        <span>{c.foot}</span>
        <span>{c.footRight}</span>
      </div>
    </section>
  )
}
