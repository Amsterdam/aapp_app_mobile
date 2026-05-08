import {pascalCase} from 'pascal-case'
import {CustomMarker} from '@/components/features/map/marker/CustomMarker'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {mapStatusToState} from '@/modules/boat-charging/constants/mapStatusToState'
import {ChargingPointStatus} from '@/modules/boat-charging/types'

export const BoatChargingMarker = ({status}: {status: ChargingPointStatus}) => {
  const state = mapStatusToState[status]

  return (
    <CustomMarker
      icon={boatChargingPointStateMap[state].icon}
      testID={`BoatCharging${pascalCase(state)}Marker`}
    />
  )
}
