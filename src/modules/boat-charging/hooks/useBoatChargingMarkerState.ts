import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {
  type BoatChargingLocation,
  BoatChargingPointState,
  ChargingPointStatus,
} from '@/modules/boat-charging/types'

export const useBoatChargingMarkerState = (
  chargingPointId: BoatChargingLocation['id'],
) => {
  const {data, isLoading, isError} = useBoatChargingLocationDetailsQuery(
    chargingPointId || skipToken,
  )

  return useMemo(() => {
    if (isLoading) {
      return BoatChargingPointState.occupied
    }

    const isMalfunction =
      !data ||
      isError ||
      data.charging_stations.every(cs =>
        [
          ChargingPointStatus.OFFLINE,
          ChargingPointStatus.INOPERATIVE,
          ChargingPointStatus.UNKNOWN,
        ].includes(cs.status),
      )

    const isFree = data?.charging_stations.some(
      cs => cs.status === ChargingPointStatus.OPERATIVE,
    )

    const occupiedState = isMalfunction
      ? BoatChargingPointState.malfunction
      : BoatChargingPointState.occupied

    return isFree ? BoatChargingPointState.free : occupiedState
  }, [data, isLoading, isError])
}
