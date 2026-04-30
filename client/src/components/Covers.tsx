import type { CoverVariant } from '../types'

type Props = { variant: CoverVariant; index: number; accent: string }

const SerifCover = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="text-center leading-none">
      <div
        className="display-italic"
        style={{ fontSize: 'clamp(120px, 18vw, 220px)', color: accent }}
      >
        Q1
      </div>
      <div className="font-mono text-[10px] tracking-[0.4em] mt-2 text-[var(--color-ink-soft)]">
        MMXXVI · WINTER
      </div>
    </div>
  </div>
)

const HeliosCover = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <svg viewBox="0 0 200 200" className="w-[58%] h-[58%]" aria-hidden>
      <g stroke={accent} strokeWidth="1.4" fill="none">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 24
          const x1 = 100 + Math.cos(a) * 56
          const y1 = 100 + Math.sin(a) * 56
          const x2 = 100 + Math.cos(a) * 92
          const y2 = 100 + Math.sin(a) * 92
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        })}
        <circle cx="100" cy="100" r="44" />
        <circle cx="100" cy="100" r="22" />
      </g>
      <circle cx="100" cy="100" r="6" fill={accent} />
    </svg>
    <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.32em] text-[var(--color-ink-soft)]">
      HELIOS · 02
    </div>
  </div>
)

const RomanCover = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <div className="smallcaps text-[11px] text-[var(--color-mute)]">edition</div>
    <div className="display" style={{ fontSize: 'clamp(110px, 16vw, 180px)', lineHeight: 0.9 }}>
      II
    </div>
    <div className="display-italic text-xl text-[var(--color-ink-soft)] mt-1">two</div>
  </div>
)

const LettersCover = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0 flex items-center justify-center p-8">
    <svg viewBox="0 0 200 130" className="w-full h-auto" aria-hidden>
      <rect x="6" y="6" width="188" height="118" fill="none" stroke={accent} strokeWidth="1.2" />
      <path d="M6 6 L100 78 L194 6" fill="none" stroke={accent} strokeWidth="1.2" />
      <path d="M6 124 L78 70 M194 124 L122 70" fill="none" stroke={accent} strokeWidth="1.2" />
    </svg>
    <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.32em]" style={{ color: accent }}>
      Re:
    </div>
    <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.32em] text-[var(--color-ink-soft)]">
      DISPATCH №04
    </div>
  </div>
)

const NumeralCover = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex items-baseline gap-1 leading-none">
      <span className="display-italic" style={{ fontSize: 'clamp(120px, 20vw, 240px)', color: accent }}>5</span>
      <span className="display" style={{ fontSize: 'clamp(60px, 10vw, 110px)' }}>/</span>
      <span className="display" style={{ fontSize: 'clamp(48px, 7vw, 80px)' }}>yr</span>
    </div>
    <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.32em] text-[var(--color-ink-soft)]">
      VISION · DRAFT
    </div>
  </div>
)

const GridCover = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: 35 }).map((_, i) => {
        const filled = [4, 11, 12, 13, 18, 22, 23, 28].includes(i)
        return (
          <div
            key={i}
            className="w-2.5 h-2.5"
            style={{
              background: filled ? 'var(--color-ink)' : 'transparent',
              border: filled ? 'none' : '1px solid rgba(20,17,13,0.35)',
              borderRadius: '9999px',
            }}
          />
        )
      })}
    </div>
    <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.32em] text-[var(--color-ink-soft)]">
      RITUALS · 28 PAGES
    </div>
  </div>
)

const KanjiCover = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <div
      className="display"
      style={{ fontSize: 'clamp(80px, 12vw, 130px)', lineHeight: 1, color: 'var(--color-ink)' }}
    >
      東京
    </div>
    <div className="mt-3 flex items-center gap-3">
      <div className="h-px w-10" style={{ background: accent }} />
      <span className="font-mono text-[11px] tracking-[0.42em]" style={{ color: accent }}>
        TŌKYŌ
      </span>
      <div className="h-px w-10" style={{ background: accent }} />
    </div>
    <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.32em] text-[var(--color-ink-soft)]">
      FIELD NOTES №07
    </div>
  </div>
)

const DiPlusCover = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    {/* Topographic contour rings — hint at heat map */}
    <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.18">
        <ellipse cx="160" cy="100" rx="140" ry="78" />
        <ellipse cx="160" cy="100" rx="112" ry="60" />
        <ellipse cx="160" cy="100" rx="84" ry="44" />
        <ellipse cx="160" cy="100" rx="56" ry="28" />
      </g>
      {/* Hub mark */}
      <circle cx="200" cy="86" r="22" fill={accent} opacity="0.16" />
      <circle cx="200" cy="86" r="12" fill={accent} opacity="0.32" />
      <circle cx="200" cy="86" r="3" fill={accent} />
    </svg>

    {/* Wordmark + tagline */}
    <div className="relative z-10 flex flex-col items-center text-center px-6">
      <span
        className="display"
        style={{
          fontSize: 'clamp(64px, 11.5vw, 140px)',
          color: 'var(--color-ink)',
          letterSpacing: '-0.02em',
          lineHeight: 0.9,
        }}
      >
        Gun<span className="display-italic" style={{ color: accent }}>jop</span>
      </span>
      <span
        className="font-mono mt-3 text-[var(--color-ink-soft)]"
        style={{
          fontSize: 'clamp(8.5px, 0.85vw, 11.5px)',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
        }}
      >
        Sistemas agénticos · integración digital
      </span>
    </div>

    <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.32em] text-[var(--color-ink-soft)]">
      Δ AGENTIC · SYSTEMS
    </div>
    <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.32em]" style={{ color: accent }}>
      ● LIVE
    </div>
  </div>
)

const ArrowCover = ({ accent }: { accent: string }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <svg viewBox="0 0 240 120" className="w-[78%]" aria-hidden>
      <g stroke={accent} strokeWidth="1.5" fill="none">
        <circle cx="20" cy="60" r="6" />
        <path d="M30 60 Q 70 20, 110 60 T 200 60" />
        <circle cx="80" cy="40" r="3" fill={accent} />
        <circle cx="140" cy="80" r="3" fill={accent} />
        <path d="M200 60 L220 60 M214 54 L220 60 L214 66" />
      </g>
    </svg>
    <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.32em] text-[var(--color-ink-soft)]">
      WEEK 01 → 04
    </div>
  </div>
)

export function Cover({ variant, accent }: Props) {
  switch (variant) {
    case 'serif':   return <SerifCover accent={accent} />
    case 'helios':  return <HeliosCover accent={accent} />
    case 'roman':   return <RomanCover />
    case 'letters': return <LettersCover accent={accent} />
    case 'numeral': return <NumeralCover accent={accent} />
    case 'grid':    return <GridCover />
    case 'kanji':   return <KanjiCover accent={accent} />
    case 'arrow':   return <ArrowCover accent={accent} />
    case 'diplus':  return <DiPlusCover accent={accent} />
  }
}
