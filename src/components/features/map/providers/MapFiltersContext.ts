import {createContext} from 'react'
import type {ServiceMapResponseFilter} from '@/modules/service/types'

export enum MapFilterType {
  filters = 'filters',
  layers = 'layers',
}

export const MapFiltersContext = createContext<{
  activeFilters: ServiceMapResponseFilter[]
  filterType: MapFilterType | undefined
  filters: ServiceMapResponseFilter[] | undefined
  onPressFilter: (filter: ServiceMapResponseFilter) => void
} | null>(null)
