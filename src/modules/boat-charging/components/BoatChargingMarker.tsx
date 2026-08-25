import {pascalCase} from 'pascal-case'
import {CustomMarker} from '@/components/features/map/marker/CustomMarker'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {mapStatusToState} from '@/modules/boat-charging/constants/mapStatusToState'
import {ChargingPointStatus} from '@/modules/boat-charging/types'

type Props = {status: ChargingPointStatus}

export const BoatChargingMarker = ({status}: Props) => {
  const state = mapStatusToState[status]

  return (
    <CustomMarker
      decreaseIconSize={false}
      icon={boatChargingPointStateMap[state].icon}
      testID={`BoatCharging${pascalCase(state)}Marker`}
    />
  )
}
