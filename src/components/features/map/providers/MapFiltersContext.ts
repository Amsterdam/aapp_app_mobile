import {createContext} from 'react'
import type {
  ServiceMapResponse,
  ServiceMapResponseFilter,
  ServiceMapResponseIcon,
} from '@/modules/service/types'

export const MapFiltersContext = createContext<{
  activeFilters: ServiceMapResponseFilter[]
  filters: ServiceMapResponse['filters'] | undefined
  layers:
    | (ServiceMapResponse['layers'][number] & {icon?: ServiceMapResponseIcon})[]
    | undefined
  onPressFilter: (filter: ServiceMapResponseFilter) => void
} | null>(null)
