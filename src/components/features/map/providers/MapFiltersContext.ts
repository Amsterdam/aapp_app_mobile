import {createContext} from 'react'
import type {ServiceMapResponseFilter} from '@/modules/service/types'

export const MapFiltersContext = createContext<{
  activeFilters: ServiceMapResponseFilter[]
  filters: ServiceMapResponseFilter[] | undefined
  //TODO: change layers type once color data is returned from backend inside layers data
  layers: (ServiceMapResponseFilter & {color: string})[] | undefined
  onPressFilter: (filter: ServiceMapResponseFilter) => void
} | null>(null)
