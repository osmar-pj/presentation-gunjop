import { createContext, useContext, useEffect, useCallback, type ReactNode } from 'react'
import { useShared } from './sync'

export type Theme = 'light' | 'dark'

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void }

const ThemeContext = createContext<Ctx>({
  theme: 'dark',
  setTheme: () => {},
  toggle: () => {},
})

const KEY = 'atelier-theme'

function readInitial(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem(KEY)
  return saved === 'light' ? 'light' : 'dark'
}

const INITIAL: Theme = readInitial()

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeShared] = useShared<Theme>('theme', INITIAL)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    if (typeof window !== 'undefined') window.localStorage.setItem(KEY, theme)
  }, [theme])

  const setTheme = useCallback(
    (t: Theme) => setThemeShared(t),
    [setThemeShared],
  )

  const toggle = useCallback(() => {
    setThemeShared((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [setThemeShared])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex items-center gap-2 border border-[var(--color-ink)]/40 hover:border-[var(--color-ink)] transition-colors ${
        compact ? 'px-2 py-1.5' : 'px-2.5 py-2'
      }`}
    >
      {isDark ? (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M13 9.5A5 5 0 1 1 6.5 3 4 4 0 0 0 13 9.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
          <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
            <line x1="8" y1="1.5" x2="8" y2="3" />
            <line x1="8" y1="13" x2="8" y2="14.5" />
            <line x1="1.5" y1="8" x2="3" y2="8" />
            <line x1="13" y1="8" x2="14.5" y2="8" />
            <line x1="3.4" y1="3.4" x2="4.5" y2="4.5" />
            <line x1="11.5" y1="11.5" x2="12.6" y2="12.6" />
            <line x1="3.4" y1="12.6" x2="4.5" y2="11.5" />
            <line x1="11.5" y1="4.5" x2="12.6" y2="3.4" />
          </g>
        </svg>
      )}
      <span className="font-mono text-[10px] tracking-[0.28em] uppercase">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}
