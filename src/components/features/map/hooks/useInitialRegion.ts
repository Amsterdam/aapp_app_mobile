import type {FeatureCollection} from 'geojson'
import {useMemo} from 'react'
import {convertGeometryToPoint} from '@/components/features/map/utils/convertGeometryToPoint'
import {getRegionFromCoords} from '@/components/features/map/utils/getRegionFromCoords'
import type {EmptyObject} from '@/types/utils'

export const useInitialRegion = <
  T extends FeatureCollection | EmptyObject = EmptyObject,
>(
  data?: T,
  skip?: boolean,
) =>
  useMemo(() => {
    if (skip || !data || !('features' in data)) {
      return
    }

    const allCoords = convertGeometryToPoint(data.features).map(point => ({
      longitude: point.geometry.coordinates[0],
      latitude: point.geometry.coordinates[1],
    }))

    return getRegionFromCoords(allCoords)
  }, [data, skip])
