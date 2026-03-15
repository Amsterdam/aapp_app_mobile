import {type PropsWithChildren, useState, useCallback, useMemo} from 'react'
import {
  MapViewSwitchContext,
  MapViewVariant,
} from '@/components/features/map/MapViewSwitchContext'

export const MapViewSwitchProvider = ({
  children,
  variants = [MapViewVariant.map, MapViewVariant.list],
}: PropsWithChildren<{variants?: [MapViewVariant, MapViewVariant]}>) => {
  const [viewTypeIndex, setViewTypeIndex] = useState(0)

  const toggleViewType = useCallback(() => {
    setViewTypeIndex(prev => (prev === 0 ? 1 : 0))
  }, [])

  const value = useMemo(
    () => ({viewType: variants[viewTypeIndex], toggleViewType, variants}),
    [viewTypeIndex, toggleViewType, variants],
  )

  return (
    <MapViewSwitchContext.Provider value={value}>
      {children}
    </MapViewSwitchContext.Provider>
  )
}
