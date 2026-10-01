import {use} from 'react'
import {MapFiltersContext} from '@/components/features/map/providers/MapFilters.context'

export const useMapFilters = () => {
  const context = use(MapFiltersContext)

  if (!context) {
    throw new Error('useMapFilters must be used within a MapFiltersProvider')
  }

  return context
}
