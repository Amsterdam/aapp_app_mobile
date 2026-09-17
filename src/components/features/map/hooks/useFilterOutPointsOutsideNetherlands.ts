import {useMemo} from 'react'
import type {MarkerProperties} from '@/components/features/map/types'
import type {Supercluster} from 'react-native-clusterer'
import {NETHERLANDS_OUTER_BOX} from '@/components/features/map/constants'

export const useFilterOutPointsOutsideNetherlands = (
  points: Supercluster.PointFeature<MarkerProperties>[],
) =>
  useMemo(
    () =>
      points.filter(point => {
        const [longitude, latitude] = point.geometry.coordinates

        return (
          longitude >= NETHERLANDS_OUTER_BOX.minimum_longitude &&
          longitude <= NETHERLANDS_OUTER_BOX.maximum_longitude &&
          latitude >= NETHERLANDS_OUTER_BOX.minimum_latitude &&
          latitude <= NETHERLANDS_OUTER_BOX.maximum_latitude
        )
      }),
    [points],
  )
