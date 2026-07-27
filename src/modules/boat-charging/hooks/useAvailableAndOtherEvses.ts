import {useMemo} from 'react'
import {
  type ChargingStation,
  type EVSEWithStation,
  ChargingPointStatus,
} from '@/modules/boat-charging/types'

const compareByName = (a: EVSEWithStation, b: EVSEWithStation) =>
  a.name.localeCompare(b.name)

export const getAvailableAndOtherEvses = (
  chargingStations: ChargingStation[] = [],
) => {
  const evses =
    chargingStations
      ?.flatMap(
        station =>
          station.evses?.map(evse => ({
            ...evse,
            station,
            name: `${station.id}-${evse.evse_id}`,
          })) ?? [],
      )
      .sort(compareByName) ?? []
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
