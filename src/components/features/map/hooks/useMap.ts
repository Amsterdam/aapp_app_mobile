import {useContext} from 'react'
import {MapContext} from '@/components/features/map/MapContext'

export const useMap = () => {
  const ctx = useContext(MapContext)

  if (!ctx) {
    throw new Error('useMap must be used within a MapProvider')
  }

  return {map: ctx.map?.current, getCurrentRegion: ctx.getCurrentRegion}
}
