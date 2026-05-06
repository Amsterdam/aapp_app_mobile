import {useMemo, useState} from 'react'
import type {BoatChargingLocation} from '@/modules/boat-charging/types'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {useSetMapSelection} from '@/components/features/map/MapSelectionContext'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useSelectedBoatChargingPointId} from '@/modules/boat-charging/slice'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  chargingPoints?: BoatChargingLocation[]
  isError: boolean
  isLoading: boolean
  onChargingPointPress: (id: string) => void
}

export const BoatChargingMap = ({
  isError,
  isLoading,
  chargingPoints = [],
  onChargingPointPress,
}: Props) => {
  const selectedBoatChargingPointId = useSelectedBoatChargingPointId()
  const [region, setRegion] = useState<Region | undefined>()

  useSetMapSelection(selectedBoatChargingPointId)

  const filteredChargingPoints = useMemo(
    () =>
      chargingPoints.map(({address: {coordinates}, id, ...props}) => ({
        type: 'Feature' as const,
        properties: {
          ...props,
          id: String(id),
          // variant:
          onMarkerPress: () => onChargingPointPress(id),
        },

        geometry: {
          type: 'Point' as const,
          coordinates: [coordinates.lon, coordinates.lat],
        },
      })),

    [chargingPoints, onChargingPointPress],
  )

  if (isLoading) {
    return <PleaseWait testID="BoatChargingMapPleaseWait" />
  }

  if (isError) {
    return <SomethingWentWrong testID="BoatChargingMapSomethingWentWrong" />
  }

  return (
    <MapBase
      controls={[ControlVariant.location, ControlVariant.legend]}
      moduleSlug={ModuleSlug['boat-charging']}
      onRegionChangeComplete={setRegion}>
      <Clusterer
        data={filteredChargingPoints}
        region={region}
      />
    </MapBase>
  )
}
