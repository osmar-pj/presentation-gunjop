import { createContext, useContext, useEffect, useCallback, type ReactNode } from 'react'
import { useShared } from './sync'

export type Lang = 'es' | 'en'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void }

const LangContext = createContext<Ctx>({
  lang: 'es',
  setLang: () => {},
  toggle: () => {},
})

const KEY = 'diplus-lang'

function readInitial(fallback: Lang): Lang {
  if (typeof window === 'undefined') return fallback
  const saved = window.localStorage.getItem(KEY)
  return saved === 'en' || saved === 'es' ? saved : fallback
}

export function LangProvider({
  children,
  initial = 'es',
}: {
  children: ReactNode
  initial?: Lang
}) {
  const [lang, setLangShared] = useShared<Lang>('viewer.lang', readInitial(initial))

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem(KEY, lang)
  }, [lang])

  const setLang = useCallback(
    (l: Lang) => setLangShared(l),
    [setLangShared],
  )

  const toggle = useCallback(() => {
    setLangShared((prev) => (prev === 'es' ? 'en' : 'es'))
  }, [setLangShared])

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

export function pick<T>(lang: Lang, dict: Record<Lang, T>): T {
  return dict[lang]
}
