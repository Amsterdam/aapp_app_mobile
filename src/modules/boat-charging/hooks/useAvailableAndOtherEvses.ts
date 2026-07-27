import {useMemo} from 'react'
import {
  type ChargingStation,
  ChargingPointStatus,
} from '@/modules/boat-charging/types'

export const getAvailableAndOtherEvses = (
  chargingStations: ChargingStation[] = [],
) => {
  const evses =
    chargingStations?.flatMap(
      station => station.evses?.map(evse => ({...evse, station})) ?? [],
    ) ?? []
  const availableEvses = evses.filter(
    ({station, status}) =>
      station.status === ChargingPointStatus.OPERATIVE &&
      status === ChargingPointStatus.OPERATIVE,
  )

  const otherEvses = evses.filter(
    ({status, station}) =>
      station.status !== ChargingPointStatus.OPERATIVE ||
      status !== ChargingPointStatus.OPERATIVE,
  )

  return {
    evses,
    availableEvses,
    otherEvses,
  }
}

export const useAvailableAndOtherEvses = (
  chargingStations: ChargingStation[],
) =>
  useMemo(() => getAvailableAndOtherEvses(chargingStations), [chargingStations])
