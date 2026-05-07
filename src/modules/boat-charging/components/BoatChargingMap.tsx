import {useMemo, useState} from 'react'
import type {BoatChargingGeoJSON} from '@/modules/boat-charging/types'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {useSetMapSelection} from '@/components/features/map/MapSelectionContext'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/components/features/map/hooks/useGetFilteredFeatures'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {BoatChargingMarker} from '@/modules/boat-charging/components/BoatChargingMarker'
import {useSelectedBoatChargingPointId} from '@/modules/boat-charging/slice'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  geojson?: BoatChargingGeoJSON
  isError: boolean
  isLoading: boolean
  onChargingPointPress: (id: string) => void
}

export const BoatChargingMap = ({
  isError,
  isLoading,
  geojson,
  onChargingPointPress,
}: Props) => {
  const selectedBoatChargingPointId = useSelectedBoatChargingPointId()
  const [region, setRegion] = useState<Region | undefined>()

  useSetMapSelection(selectedBoatChargingPointId)

  const chargingPointFeatures = useMemo(
    () =>
      geojson?.features.map(({properties, ...rest}) => ({
        properties: {
          ...properties,
          Icon: <BoatChargingMarker status={properties.status} />,
          onMarkerPress: () => onChargingPointPress(properties.id),
        },
        ...rest,
      })) || [],

    [geojson, onChargingPointPress],
  )

  const filteredFeatures = useGetFilteredFeatures({
    features: chargingPointFeatures,
    conditionType: ConditionType.and,
  })

  if (isLoading) {
    return <PleaseWait testID="BoatChargingMapPleaseWait" />
  }

  if (isError) {
    return <SomethingWentWrong testID="BoatChargingMapSomethingWentWrong" />
  }

  return (
    <MapBase
      controls={[ControlVariant.location, ControlVariant.legend]}
      FilterComponent={<MapFilters testID="BoatChargingMapFilters" />}
      moduleSlug={ModuleSlug['boat-charging']}
      onRegionChangeComplete={setRegion}>
      <Clusterer
        data={filteredFeatures}
        region={region}
      />
    </MapBase>
  )
}
