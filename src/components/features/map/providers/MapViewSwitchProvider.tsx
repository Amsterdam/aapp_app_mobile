import {type PropsWithChildren, useState, useCallback, useMemo} from 'react'
import {
  MapViewSwitchContext,
  MapViewVariant,
} from '@/components/features/map/providers/MapViewSwitchContext'

export const MapViewSwitchProvider = ({
  children,
  variant = MapViewVariant.list,
}: PropsWithChildren<{
  variant?: Exclude<MapViewVariant, MapViewVariant.map>
}>) => {
  const [viewTypeIndex, setViewTypeIndex] = useState(0)

  const toggleViewType = useCallback(() => {
    setViewTypeIndex(prev => (prev === 0 ? 1 : 0))
  }, [])

  const value = useMemo(
    () => ({
      viewType: [MapViewVariant.map, variant][viewTypeIndex],
      toggleViewType,
      variant,
    }),
    [viewTypeIndex, toggleViewType, variant],
  )

  return (
    <MapViewSwitchContext.Provider value={value}>
      {children}
    </MapViewSwitchContext.Provider>
  )
}
