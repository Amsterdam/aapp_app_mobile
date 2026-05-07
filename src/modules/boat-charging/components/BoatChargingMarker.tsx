import {pascalCase} from 'pascal-case'
import {useMemo} from 'react'
import {CustomMarker} from '@/components/features/map/marker/CustomMarker'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {
  BoatChargingPointState,
  ChargingPointStatus,
} from '@/modules/boat-charging/types'

export const BoatChargingMarker = ({status}: {status: ChargingPointStatus}) => {
  const state = useMemo(() => {
    const isFree = status === ChargingPointStatus.OPERATIVE

    const isMalfunction = [
      ChargingPointStatus.OFFLINE,
      ChargingPointStatus.INOPERATIVE,
      ChargingPointStatus.UNKNOWN,
    ].includes(status)

    const occupiedState = isMalfunction
      ? BoatChargingPointState.malfunction
      : BoatChargingPointState.occupied

    return isFree ? BoatChargingPointState.free : occupiedState
  }, [status])

  return (
    <CustomMarker
      icon={boatChargingPointStateMap[state].icon}
      testID={`BoatCharging${pascalCase(state)}Marker`}
    />
  )
}
