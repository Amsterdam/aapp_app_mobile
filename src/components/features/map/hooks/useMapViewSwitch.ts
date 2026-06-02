import {use} from 'react'
import {MapViewSwitchContext} from '@/components/features/map/providers/MapViewSwitchContext'

export const useMapViewSwitch = () => {
  const context = use(MapViewSwitchContext)

  if (!context) {
    throw new Error(
      'useMapViewSwitch should be used inside MapViewSwitchProvider.',
    )
  }

  return context
}
