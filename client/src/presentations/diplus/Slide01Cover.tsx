import { useLang } from '../../i18n'

const t = {
  es: {
    eyebrow: 'Δ Telemetría · Vol. I',
    crumb: 'Portada · 04 de 09',
    pretitle: 'Memo de producto · MMXXVI',
    subtitle:
      'Telemetría diferencial de combustible. Mapas de calor por zona, gal/h por modelo, y la brecha entre operadores.',
    author: 'Autor',
    audience: 'Audiencia',
    audienceVal: 'Operaciones · Minería',
    read: 'Lectura',
    readVal: '≈ 7 minutos',
    status: 'Estado',
    statusVal: 'En revisión',
  },
  en: {
    eyebrow: 'Δ Telemetry · Vol. I',
    crumb: 'Cover · 04 of 09',
    pretitle: 'A product memo · MMXXVI',
    subtitle:
      'Differential fuel telemetry. Heat maps by zone, gal/h by model, and the gap between operators.',
    author: 'Author',
    audience: 'Audience',
    audienceVal: 'Operations · Mining',
    read: 'Read time',
    readVal: '≈ 7 minutes',
    status: 'Status',
    statusVal: 'In review',
  },
}

export function Slide01Cover() {
  const { lang } = useLang()
  const c = t[lang]

  return (
    <section className="absolute inset-0 px-12 lg:px-24 py-12 flex flex-col">
      {/* Top index strip */}
      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--color-ink-soft)]">
        <span>{c.eyebrow}</span>
        <span>{c.crumb}</span>
      </div>

      <div className="rule mt-3" />

      {/* Wordmark */}
      <div className="flex-1 flex flex-col justify-center relative">
        <svg
          viewBox="0 0 600 360"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] max-w-[820px] opacity-25"
          aria-hidden
        >
          <g fill="none" stroke="var(--color-ink)" strokeWidth="0.6">
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse key={i} cx="380" cy="180" rx={40 + i * 22} ry={20 + i * 14} />
            ))}
          </g>
          <circle cx="430" cy="150" r="42" fill="var(--color-vermilion)" opacity="0.18" />
          <circle cx="430" cy="150" r="22" fill="var(--color-vermilion)" opacity="0.4" />
          <circle cx="430" cy="150" r="6" fill="var(--color-vermilion)" />
        </svg>

        <div className="relative z-10 max-w-[820px]">
          <div className="smallcaps text-[12px] text-[var(--color-vermilion)] mb-4">
            {c.pretitle}
          </div>
          <h1
            className="display"
            style={{ fontSize: 'clamp(80px, 14vw, 220px)', lineHeight: 0.92, letterSpacing: '-0.018em' }}
          >
            Di<span className="display-italic" style={{ color: 'var(--color-vermilion)' }}>Plus</span>
          </h1>
          <p
            className="display-italic mt-6 max-w-[640px] text-[var(--color-ink-soft)]"
            style={{ fontSize: 'clamp(20px, 2vw, 30px)', lineHeight: 1.35 }}
          >
            {c.subtitle}
          </p>
        </div>
      </div>

      {/* Footer metadata */}
      <div className="rule mb-3" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)]">
        <div>
          <div className="text-[var(--color-mute)] mb-1">{c.author}</div>
          <div>O. Palomino</div>
        </div>
        <div>
          <div className="text-[var(--color-mute)] mb-1">{c.audience}</div>
          <div>{c.audienceVal}</div>
        </div>
        <div>
          <div className="text-[var(--color-mute)] mb-1">{c.read}</div>
          <div>{c.readVal}</div>
        </div>
        <div>
          <div className="text-[var(--color-mute)] mb-1">{c.status}</div>
          <div className="flex items-center gap-2">
            <span className="dot" style={{ background: 'var(--color-vermilion)' }} />
            {c.statusVal}
          </div>
        </div>
      </div>
    </section>
  )
}
