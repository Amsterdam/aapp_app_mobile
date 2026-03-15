import {createContext} from 'react'

export enum MapViewVariant {
  list = 'list',
  map = 'map',
  search = 'search',
}
export const MapViewSwitchContext = createContext<{
  toggleViewType: () => void
  variant: MapViewVariant
  viewType: MapViewVariant
} | null>(null)
