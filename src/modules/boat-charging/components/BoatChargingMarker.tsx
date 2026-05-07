import {pascalCase} from 'pascal-case'
import {CustomMarker} from '@/components/features/map/marker/CustomMarker'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {useBoatChargingMarkerState} from '@/modules/boat-charging/hooks/useBoatChargingMarkerState'
import {type BoatChargingLocation} from '@/modules/boat-charging/types'

export const BoatChargingMarker = ({
  chargingPointId,
}: {
  chargingPointId: BoatChargingLocation['id']
}) => {
  const state = useBoatChargingMarkerState(chargingPointId)

  return (
    <CustomMarker
      icon={boatChargingPointStateMap[state].icon}
      testID={`BoatCharging${pascalCase(state)}Marker`}
    />
  )
}
