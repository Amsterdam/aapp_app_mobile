import {createContext} from 'react'
import type {MapLegendItem} from '@/components/features/map/MapLegend'
import type {MarkerProperties} from '@/components/features/map/types'
import type {Service} from '@/modules/service/types'
import type {Supercluster} from 'react-native-clusterer'

export const PrideEventContext = createContext<{
  extraLegendItems: MapLegendItem[]
  extraPoints: Supercluster.PointFeature<MarkerProperties>[]
  onExtraPointPress: (id: Service['id']) => void
} | null>(null)
