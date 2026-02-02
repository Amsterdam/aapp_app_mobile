import {useContext} from 'react'
import {MapContext} from '@/components/features/map/MapContext'

export const useMap = () => {
  const mapContext = useContext(MapContext)

  if (!mapContext) {
    throw new Error('useMap must be used within a MapProvider')
  }

  return {
    map: mapContext.map?.current,
    getCurrentRegion: mapContext.getCurrentRegion,
  }
}
