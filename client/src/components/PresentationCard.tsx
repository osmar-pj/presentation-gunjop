import type { Presentation } from '../types'
import { Cover } from './Covers'

const accentMap: Record<Presentation['accent'], string> = {
  ink: 'var(--color-ink)',
  vermilion: 'var(--color-vermilion)',
  sage: 'var(--color-sage)',
  ochre: 'var(--color-ochre)',
}

const statusLabel: Record<Presentation['status'], string> = {
  draft: 'In draft',
  'in-review': 'In review',
  ready: 'Ready',
  archived: 'Archived',
}

const statusColor: Record<Presentation['status'], string> = {
  draft: 'var(--color-mute)',
  'in-review': 'var(--color-vermilion)',
  ready: 'var(--color-sage)',
  archived: 'var(--color-mute-soft)',
}

const padIndex = (n: number) => String(n).padStart(2, '0')

type Props = {
  p: Presentation
  delay?: number
  size?: 'hero' | 'standard'
  onOpen?: (slug: string) => void
}

export function PresentationCard({ p, delay = 0, size = 'standard', onOpen }: Props) {
  const accent = accentMap[p.accent]
  const isHero = size === 'hero'

  return (
    <article
      onClick={() => onOpen?.(p.slug)}
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onKeyDown={(e) => {
        if (onOpen && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onOpen(p.slug)
        }
      }}
      className="card rise group relative bg-[var(--color-paper)] flex flex-col"
      style={{
        animationDelay: `${delay}ms`,
        borderRadius: 0,
      }}
    >
      {/* Top spine: index, status */}
      <header className="flex items-start justify-between px-5 pt-5">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[11px] tracking-[0.28em] text-[var(--color-mute)]">
            №
          </span>
          <span
            className="display-italic text-[var(--color-ink)]"
            style={{ fontSize: isHero ? 28 : 22, lineHeight: 1 }}
          >
            {padIndex(p.index)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="dot"
            style={{ background: statusColor[p.status] }}
            aria-hidden
          />
          <span className="smallcaps text-[10px] text-[var(--color-ink-soft)]">
            {statusLabel[p.status]}
          </span>
        </div>
      </header>

      {/* Cover canvas */}
      <div
        className={`cover-frame mx-5 mt-4 ${isHero ? 'aspect-[16/7]' : 'aspect-[16/10]'} relative`}
      >
        <Cover variant={p.cover} index={p.index} accent={accent} />

        {/* Slide stack — bottom-right */}
        <div className="slide-stack pointer-events-none absolute bottom-3 right-3 w-20 h-12">
          <div
            className="s1 absolute bottom-0 right-0 w-14 h-9 border bg-[var(--color-paper)]"
            style={{ borderColor: 'rgba(20,17,13,0.25)' }}
          />
          <div
            className="s2 absolute bottom-1 right-1 w-14 h-9 border bg-[var(--color-paper)]"
            style={{ borderColor: 'rgba(20,17,13,0.35)' }}
          />
          <div
            className="s3 absolute bottom-2 right-2 w-14 h-9 border bg-[var(--color-paper)] flex items-center justify-center"
            style={{ borderColor: 'rgba(20,17,13,0.65)' }}
          >
            <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--color-ink)]">
              {p.slides}
            </span>
          </div>
        </div>
      </div>

      {/* Title block */}
      <div className="px-5 pt-5 pb-2 flex-1 flex flex-col">
        <div className="smallcaps text-[10px] text-[var(--color-mute)] mb-2">
          {p.category} · {p.author}
        </div>
        <h3
          className="display"
          style={{
            fontSize: isHero ? 'clamp(38px, 5.4vw, 64px)' : 'clamp(20px, 1.8vw, 28px)',
            lineHeight: 1.05,
            letterSpacing: '-0.014em',
          }}
        >
          {p.title}
        </h3>
        <p
          className={`mt-2 text-[var(--color-ink-soft)] ${isHero ? 'max-w-[58ch]' : ''}`}
          style={{
            fontSize: isHero ? 17 : 14,
            lineHeight: 1.5,
            fontStyle: 'italic',
            fontWeight: 300,
          }}
        >
          {p.subtitle}
        </p>
      </div>

      {/* Footer metadata */}
      <footer className="px-5 pb-5 pt-4 mt-auto">
        <div className="rule mb-3" />
        <div className="flex items-center justify-between gap-3">
          <dl className="grid grid-cols-3 gap-x-5 gap-y-0 font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-ink-soft)]">
            <div>
              <dt className="text-[var(--color-mute)]">Slides</dt>
              <dd>{String(p.slides).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-mute)]">Run</dt>
              <dd>{p.duration}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-mute)]">Edited</dt>
              <dd className="truncate">{p.lastEdited}</dd>
            </div>
          </dl>
          <button
            type="button"
            aria-label={`Open ${p.title}`}
            className="card-arrow shrink-0 w-9 h-9 border border-[var(--color-ink)] flex items-center justify-center hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden>
              <path d="M3 13 L13 3 M6 3 H13 V10" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      </footer>
    </article>
  )
}
