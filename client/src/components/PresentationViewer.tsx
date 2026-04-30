import { useEffect, useCallback } from 'react'
import { registry } from '../presentations/registry'
import { LangProvider, useLang, type Lang } from '../i18n'
import { ThemeToggle } from '../theme'
import { useShared } from '../sync'

type Props = {
  slug: string
  onClose: () => void
}

const padIndex = (n: number) => String(n).padStart(2, '0')

export function PresentationViewer({ slug, onClose }: Props) {
  return (
    <LangProvider>
      <ViewerInner slug={slug} onClose={onClose} />
    </LangProvider>
  )
}

function LangToggle() {
  const { lang, setLang } = useLang()
  const opts: Lang[] = ['es', 'en']
  return (
    <div className="flex items-center border border-[var(--color-ink)]/40">
      {opts.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-2 font-mono text-[10px] tracking-[0.28em] uppercase transition-colors ${
            lang === l
              ? 'bg-[var(--color-ink)] text-[var(--color-paper)]'
              : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

function ViewerInner({ slug, onClose }: Props) {
  const { lang } = useLang()
  const deck = registry[slug]
  const [i, setI] = useShared<number>(`viewer.slideIndex.${slug}`, 0)
  void lang // re-render slide on lang change

  const slides = deck?.slides ?? []
  const total = slides.length

  const next = useCallback(
    () => setI((v) => Math.min(v + 1, total - 1)),
    [setI, total],
  )
  const prev = useCallback(
    () => setI((v) => Math.max(v - 1, 0)),
    [setI],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault()
        next()
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose])

  if (!deck) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--color-paper)] flex items-center justify-center p-10">
        <div className="text-center">
          <div className="display-italic text-3xl mb-3">Deck not found</div>
          <button onClick={onClose} className="font-mono text-xs underline">
            Back to library
          </button>
        </div>
      </div>
    )
  }

  const slide = slides[i]
  const progress = ((i + 1) / total) * 100

  return (
    <div className="fixed inset-0 z-50 bg-[var(--color-paper)] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[var(--color-ink)]/15">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] tracking-[0.32em] text-[var(--color-mute)]">
            {lang === 'es' ? 'PRESENTACIÓN' : 'DECK'}
          </span>
          <span className="display-italic text-[22px] leading-none">{deck.title}</span>
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-ink-soft)] hidden md:inline">
            · {slide.label}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LangToggle />

          <span className="font-mono text-[11px] tracking-[0.32em]">
            <span className="text-[var(--color-vermilion)]">{padIndex(i + 1)}</span>
            <span className="text-[var(--color-mute)]"> / {padIndex(total)}</span>
          </span>

          <div className="hidden sm:flex items-center gap-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(() => idx)}
                className="h-1 transition-all"
                style={{
                  width: idx === i ? 24 : 12,
                  background:
                    idx === i ? 'var(--color-ink)' :
                    idx < i ? 'var(--color-mute)' : 'var(--color-mute-soft)',
                }}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="font-mono text-[10px] tracking-[0.28em] uppercase border border-[var(--color-ink)] px-3 py-2 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
          >
            {lang === 'es' ? 'Cerrar · Esc' : 'Close · Esc'}
          </button>
        </div>
      </div>

      {/* Slide canvas */}
      <div className="flex-1 min-h-0 relative overflow-hidden">
        <div key={i} className="rise w-full h-full">
          {slide.render()}
        </div>

        {/* Side nav */}
        <button
          onClick={prev}
          disabled={i === 0}
          aria-label="Previous"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[var(--color-ink)]/30 bg-[var(--color-paper)] disabled:opacity-30 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3 L4 8 L10 13" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <button
          onClick={next}
          disabled={i === total - 1}
          aria-label="Next"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[var(--color-ink)]/30 bg-[var(--color-paper)] disabled:opacity-30 hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 3 L12 8 L6 13" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-[var(--color-mute-soft)]/40">
        <div
          className="h-full bg-[var(--color-vermilion)] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
