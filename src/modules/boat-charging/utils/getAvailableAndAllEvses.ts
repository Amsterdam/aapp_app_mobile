import {useMemo} from 'react'
import {
  type ChargingStation,
  type EVSEWithStation,
  ChargingPointStatus,
} from '@/modules/boat-charging/types'

const compareByName = (a: EVSEWithStation, b: EVSEWithStation) =>
  a.name.localeCompare(b.name)

/**
 * @deprecated Use `useAvailableAndAllEvses` instead. This function is only exported for testing purposes.
 */
export const getAvailableAndAllEvses = (
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

  return {
    evses,
    availableEvses,
  }
}

export const useAvailableAndAllEvses = (chargingStations: ChargingStation[]) =>
  useMemo(() => getAvailableAndAllEvses(chargingStations), [chargingStations])
