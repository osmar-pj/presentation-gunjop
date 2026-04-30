import type { Deck } from '../registry'
import { Slide00Undis } from './Slide00Undis'
import { Slide00aDashboard } from './Slide00aDashboard'
import { Slide00bWapsi } from './Slide00bWapsi'
import { Slide01Cover } from './Slide01Cover'
import { Slide02Problem } from './Slide02Problem'
import { Slide03HeatMap } from './Slide03HeatMap'
import { Slide04Trucks } from './Slide04Trucks'
import { Slide05Refueling } from './Slide05Refueling'
import { Slide05Ranking } from './Slide05Ranking'

export const diplusDeck: Deck = {
  slug: 'diplus',
  title: 'DiPlus',
  subtitle: 'Telemetría diferencial de combustible',
  author: 'O. Palomino',
  slides: [
    { id: 's00',  label: 'Undis · Plataforma',      render: () => <Slide00Undis /> },
    { id: 's00a', label: 'Dashboard · Live',        render: () => <Slide00aDashboard /> },
    { id: 's00b', label: 'Wapsi · Ventilación',     render: () => <Slide00bWapsi /> },
    { id: 's01',  label: 'Cover',                   render: () => <Slide01Cover /> },
    { id: 's02',  label: 'Problem & Solution',      render: () => <Slide02Problem /> },
    { id: 's03',  label: 'Heat Map · GPS',          render: () => <Slide03HeatMap /> },
    { id: 's04',  label: 'Consumo · modelo',        render: () => <Slide04Trucks /> },
    { id: 's05',  label: 'Sensor · recarga segura', render: () => <Slide05Refueling /> },
    { id: 's06',  label: 'Operator Ranking',        render: () => <Slide05Ranking /> },
  ],
}
