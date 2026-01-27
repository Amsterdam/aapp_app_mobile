import {useState} from 'react'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {MarkerVariant} from '@/components/features/map/marker/markers.generated'
import {ControlVariant} from '@/components/features/map/types'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Address} from '@/modules/address/types'
import {useSelectedPollingStationId} from '@/modules/elections/slice'
import {ElectionsState, PollingStation} from '@/modules/elections/types'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  address?: Address
  isError: boolean
  isLoading: boolean
  onPress: (id: PollingStation['id']) => void
  pollingStations?: PollingStation[]
}

const ElectionsMarkerVariantMap: Record<ElectionsState, MarkerVariant> = {
  [ElectionsState.calm]: MarkerVariant.electionsCrowdCalmPin,
  [ElectionsState.medium]: MarkerVariant.electionsCrowdMediumPin,
  [ElectionsState.busy]: MarkerVariant.electionsCrowdBusyPin,
  [ElectionsState.unknown]: MarkerVariant.electionsCrowdUnknownPin,
}

export const PollingStationsMap = ({
  address,
  isLoading,
  isError,
  onPress,
  pollingStations,
}: Props) => {
  const selectedPollingStationId = useSelectedPollingStationId()
  const markerVariant = getMarkerVariant(selectedPollingStationId)

  const [region, setRegion] = useState(
    address?.coordinates
      ? {
          latitude: address?.coordinates.lat,
          longitude: address?.coordinates.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      : undefined,
  )

  if (isLoading) {
    return <PleaseWait testID="PollingStationsMapPleaseWait" />
  }

  if (!pollingStations?.length || isError) {
    return <SomethingWentWrong testID="PollingStationsMapSomethingWentWrong" />
  }

  return (
    <MapBase
      controls={[ControlVariant.legend, ControlVariant.location]}
      initialRegion={region}
      moduleSlug={ModuleSlug.elections}
      onRegionChangeComplete={setRegion}>
      <Clusterer
        data={pollingStations.map(({position, id, ...props}) => ({
          type: 'Feature',
          properties: {
            ...props,
            id: String(id),
            variant: markerVariant(
              id,
              ElectionsMarkerVariantMap[
                props.lastUpdate.time
                  ? props.lastUpdate.state
                  : ElectionsState.unknown
              ],
            ),
            onMarkerPress: () => onPress(id),
          },

          geometry: {
            type: 'Point',
            coordinates: [position.lng, position.lat],
          },
        }))}
        region={region}
      />
    </MapBase>
  )
}
