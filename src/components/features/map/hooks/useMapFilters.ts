import {useContext} from 'react'
import {MapFiltersContext} from '@/components/features/map/providers/MapFiltersContext'

export const useMapFilters = () => {
  const context = useContext(MapFiltersContext)

  if (!context) {
    throw new Error('useMapFilters must be used within a MapFiltersProvider')
  }

  return context
}
