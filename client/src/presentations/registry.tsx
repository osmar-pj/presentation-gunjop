import type { ReactNode } from 'react'
import { diplusDeck } from './diplus'

export type Slide = {
  id: string
  label: string
  render: () => ReactNode
}

export type Deck = {
  slug: string
  title: string
  subtitle: string
  author: string
  slides: Slide[]
}

export const registry: Record<string, Deck> = {
  diplus: diplusDeck,
}
