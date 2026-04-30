export type PresentationStatus = 'draft' | 'in-review' | 'ready' | 'archived'

export type CoverVariant =
  | 'serif'
  | 'helios'
  | 'roman'
  | 'letters'
  | 'numeral'
  | 'grid'
  | 'kanji'
  | 'arrow'
  | 'diplus'

export type Presentation = {
  id: string
  slug: string
  index: number
  title: string
  subtitle: string
  author: string
  category: string
  slides: number
  duration: string
  lastEdited: string
  status: PresentationStatus
  collaborators: number
  views: number
  cover: CoverVariant
  accent: 'ink' | 'vermilion' | 'sage' | 'ochre'
  span: 'hero' | 'wide' | 'tall' | 'medium' | 'small'
}
