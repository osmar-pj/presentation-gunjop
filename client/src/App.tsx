import { presentations, stats } from './data'
import { PresentationCard } from './components/PresentationCard'
import { PresentationViewer } from './components/PresentationViewer'
import { registry } from './presentations/registry'
import { ThemeToggle } from './theme'
import { useShared, useWindowScrollSync, SyncStatus } from './sync'

const FILTERS = ['All', 'In review', 'Drafts', 'Archive'] as const
type Filter = (typeof FILTERS)[number]

function Header() {
  const [search, setSearch] = useShared<string>('grid.search', '')
  const [filter, setFilter] = useShared<Filter>('grid.filter', 'All')

  return (
    <header className="px-10 pt-8 pb-6">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div className="flex items-baseline gap-5">
          <h1 className="display-italic text-[44px] leading-none">Atelier</h1>
          <span className="font-mono text-[11px] tracking-[0.32em] text-[var(--color-ink-soft)]">
            A LIBRARY OF PRESENTATIONS
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.32em] text-[var(--color-ink-soft)]">
          <SyncStatus />
          <span className="text-[var(--color-mute-soft)]">·</span>
          <span>WED · 29 APR 2026</span>
          <span className="text-[var(--color-mute-soft)]">·</span>
          <span>ISSUE №14</span>
          <span className="text-[var(--color-mute-soft)]">·</span>
          <span>OSMAR P.</span>
          <ThemeToggle compact />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[280px] max-w-[640px] flex items-center border border-[var(--color-ink)]/70 bg-transparent">
          <span className="px-3 text-[var(--color-ink-soft)]" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M11 11 L14 14" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the library — by title, author, year…"
            className="bg-transparent outline-none flex-1 py-2.5 pr-3 text-sm font-[var(--font-body)] placeholder:text-[var(--color-mute)] placeholder:italic"
          />
          <span className="px-3 font-mono text-[10px] tracking-[0.24em] text-[var(--color-mute)]">
            ⌘K
          </span>
        </div>

        <nav className="flex items-center gap-1 font-mono text-[10px] tracking-[0.28em] uppercase">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-3 py-2 border ${
                f === filter
                  ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                  : 'border-[var(--color-ink)]/30 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] text-[var(--color-ink-soft)]'
              }`}
            >
              {f}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="ml-auto group flex items-center gap-2 px-4 py-2.5 bg-[var(--color-vermilion)] text-[var(--color-paper)] font-mono text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--color-vermilion-deep)] transition-colors"
        >
          <span className="display-italic text-base leading-none">＋</span>
          New presentation
        </button>
      </div>
    </header>
  )
}

function MarqueeBar() {
  const items = [
    `${stats.inProduction} in production`,
    `${stats.archived} archived`,
    `${stats.contributors} contributors`,
    `${stats.totalSlides} slides this month`,
    'Q1 Review · in review',
    'Helios Launch · drafting',
    'Five-Year Vision · 12h ago',
    'Tokyo Field Notes · 540 views',
    'Edition Two · ready',
  ]
  const repeated = [...items, ...items]
  return (
    <div className="border-y border-[var(--color-ink)]/40 mx-10 overflow-hidden bg-[var(--color-paper-deep)]/50">
      <div className="ticker-track flex whitespace-nowrap font-mono text-[11px] tracking-[0.28em] uppercase text-[var(--color-ink-soft)] py-2.5">
        {repeated.map((t, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="mx-6 inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-vermilion)]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

function SideRail() {
  return (
    <aside className="hidden lg:flex flex-col items-center justify-between border-r border-[var(--color-ink)]/15 py-8 w-[64px] shrink-0">
      <div className="flex flex-col items-center gap-3">
        <span
          className="display-italic"
          style={{ fontSize: 22, color: 'var(--color-vermilion)' }}
        >
          A
        </span>
        <div className="w-px h-10 bg-[var(--color-ink)]/30" />
      </div>

      <div className="vertical font-mono text-[10px] text-[var(--color-ink-soft)]">
        Presentations · Atelier · MMXXVI
      </div>

      <div className="flex flex-col items-center gap-2 font-mono text-[10px] text-[var(--color-mute)]">
        <span>EN</span>
        <span className="rotate-90 inline-block">·</span>
        <span>ES</span>
      </div>
    </aside>
  )
}

function IndexBar() {
  return (
    <div className="px-10 mt-6 mb-3 flex items-baseline justify-between">
      <div className="flex items-baseline gap-3">
        <span className="display-italic text-[28px] leading-none">Index</span>
        <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-[var(--color-mute)]">
          Eight pieces · sorted by recency
        </span>
      </div>
      <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-ink-soft)]">
        <button className="hover:text-[var(--color-vermilion)]">Grid</button>
        <span className="text-[var(--color-mute-soft)]">/</span>
        <button className="hover:text-[var(--color-vermilion)]">List</button>
        <span className="text-[var(--color-mute-soft)]">/</span>
        <button className="hover:text-[var(--color-vermilion)]">Spread</button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="px-10 pt-12 pb-8">
      <div className="rule mb-4" />
      <div className="flex items-center justify-between flex-wrap gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-ink-soft)]">
        <span>© Atelier · MMXXVI</span>
        <span>Set in Fraunces, Newsreader & JetBrains Mono</span>
        <span className="flex items-center gap-2">
          Pressed on a Tuesday
          <span className="dot" style={{ background: 'var(--color-vermilion)' }} />
        </span>
      </div>
    </footer>
  )
}

function App() {
  const [hero, ...rest] = presentations
  const [openSlug, setOpenSlug] = useShared<string | null>('viewer.openSlug', null)
  useWindowScrollSync()

  const openIfAvailable = (slug: string) => {
    if (registry[slug]) setOpenSlug(slug)
  }

  return (
    <div className="editorial min-h-screen flex">
      <SideRail />

      <div className="flex-1 min-w-0">
        <Header />
        <MarqueeBar />
        <IndexBar />

        {/* Bento grid */}
        <main className="px-10 pb-6">
          {/* Hero */}
          <div className="mb-5">
            <PresentationCard p={hero} delay={60} size="hero" onOpen={openIfAvailable} />
          </div>

          {/* Row 2: 8 + 4 */}
          <div className="grid grid-cols-12 gap-5 mb-5">
            <div className="col-span-12 md:col-span-8">
              <PresentationCard p={rest[0]} delay={140} onOpen={openIfAvailable} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <PresentationCard p={rest[1]} delay={200} onOpen={openIfAvailable} />
            </div>
          </div>

          {/* Row 3: 4 + 4 + 4 */}
          <div className="grid grid-cols-12 gap-5 mb-5">
            <div className="col-span-12 md:col-span-4">
              <PresentationCard p={rest[2]} delay={260} onOpen={openIfAvailable} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <PresentationCard p={rest[3]} delay={320} onOpen={openIfAvailable} />
            </div>
            <div className="col-span-12 md:col-span-4">
              <PresentationCard p={rest[4]} delay={380} onOpen={openIfAvailable} />
            </div>
          </div>

          {/* Row 4: 5 + 7 */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-5">
              <PresentationCard p={rest[5]} delay={440} onOpen={openIfAvailable} />
            </div>
            <div className="col-span-12 md:col-span-7">
              <PresentationCard p={rest[6]} delay={500} onOpen={openIfAvailable} />
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {openSlug && (
        <PresentationViewer slug={openSlug} onClose={() => setOpenSlug(null)} />
      )}
    </div>
  )
}

export default App
