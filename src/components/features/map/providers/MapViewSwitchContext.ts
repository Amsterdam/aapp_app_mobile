import {createContext} from 'react'

export enum MapViewVariant {
  list = 'list',
  map = 'map',
  search = 'search',
}
export const MapViewSwitchContext = createContext<{
  toggleViewType: () => void
  variant: Exclude<MapViewVariant, MapViewVariant.map>
  viewType: MapViewVariant
} | null>(null)
