import {useEffect, useMemo} from 'react'
import type {BoatChargingGeoJSON} from '@/modules/boat-charging/types'
import {AMSTERDAM_REGION} from '@/components/features/map/constants'
import {useMap} from '@/components/features/map/hooks/useMap'
import {useSelectedBoatChargingPointId} from '@/modules/boat-charging/slice'

type Props = {
  geojson?: BoatChargingGeoJSON
}

export const BoatChargingMapSelectionEffect = ({geojson}: Props) => {
  const {map} = useMap()
  const selectedBoatChargingPointId = useSelectedBoatChargingPointId()

  const selectedBoatChargingPointRegion = useMemo(() => {
    if (!selectedBoatChargingPointId) {
      return undefined
    }

    const selectedFeature = geojson?.features.find(
      feature => feature.properties.id === selectedBoatChargingPointId,
    )

    if (!selectedFeature) {
      return undefined
    }

    return {
      latitude: selectedFeature.geometry.coordinates[1],
      longitude: selectedFeature.geometry.coordinates[0],
      latitudeDelta: AMSTERDAM_REGION.latitudeDelta,
      longitudeDelta: AMSTERDAM_REGION.longitudeDelta,
    }
  }, [geojson, selectedBoatChargingPointId])

  useEffect(() => {
    if (!selectedBoatChargingPointRegion) {
      return
    }

    map?.animateToRegion(selectedBoatChargingPointRegion, 500)
  }, [map, selectedBoatChargingPointRegion])

  return null
}
