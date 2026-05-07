import {createContext} from 'react'
import type {Filter} from '@/components/features/map/providers/MapFiltersProvider'
import type {ServiceMapResponseIcon} from '@/modules/service/types'

export const MapFiltersContext = createContext<{
  activeFilters: Filter[]
  filters?: Filter[]
  layers?: (Filter & {
    icon: ServiceMapResponseIcon | undefined
    icon_label: string
  })[]
  onPressFilter: (filter: Filter) => void
} | null>(null)
