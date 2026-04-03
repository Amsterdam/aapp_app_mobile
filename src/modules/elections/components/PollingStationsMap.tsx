import {useState} from 'react'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import {ControlVariant} from '@/components/features/map/types'
import {getMarkerVariant} from '@/components/features/map/utils/getMarkerVariant'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {useSelectedPollingStationId} from '@/modules/elections/slice'
import {ElectionsState, PollingStation} from '@/modules/elections/types'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  isError: boolean
  isLoading: boolean
  onPress: (id: PollingStation['id']) => void
  pollingStations?: PollingStation[]
}

const ElectionsMarkerVariantMap: Record<ElectionsState, MapMarkerVariant> = {
  [ElectionsState.calm]: MapMarkerVariant.electionsCrowdCalmPin,
  [ElectionsState.medium]: MapMarkerVariant.electionsCrowdMediumPin,
  [ElectionsState.busy]: MapMarkerVariant.electionsCrowdBusyPin,
  [ElectionsState.unknown]: MapMarkerVariant.electionsCrowdUnknownPin,
}

export const PollingStationsMap = ({
  isLoading,
  isError,
  onPress,
  pollingStations,
}: Props) => {
  const selectedPollingStationId = useSelectedPollingStationId()
  const markerVariant = getMarkerVariant(selectedPollingStationId)
  const [region, setRegion] = useState<Region | undefined>()

  if (isLoading) {
    return <PleaseWait testID="PollingStationsMapPleaseWait" />
  }

  if (!pollingStations?.length || isError) {
    return <SomethingWentWrong testID="PollingStationsMapSomethingWentWrong" />
  }

  return (
    <MapBase
      controls={[ControlVariant.legend, ControlVariant.location]}
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
