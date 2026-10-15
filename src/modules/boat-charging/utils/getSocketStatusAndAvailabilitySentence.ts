import simplur from 'simplur'
import {mapStatusToLabel} from '@/modules/boat-charging/constants/mapStatusToLabel'
import {
  ChargingPointStatus,
  type BoatChargingLocationDetailsResponse,
} from '@/modules/boat-charging/types'
import {devError} from '@/processes/development'

export const getSocketStatusAndAvailabilitySentence = (
  location:
    | Pick<
        BoatChargingLocationDetailsResponse,
        'available_sockets' | 'total_sockets' | 'status'
      >
    | undefined,
) => {
  if (!location) {
    return ''
  }

  const {status, available_sockets, total_sockets} = location

  if (!Number.isInteger(available_sockets)) {
    devError(
      `available_sockets should be an integer but instead was ${String(available_sockets)}`,
    )

    return mapStatusToLabel[status ?? ChargingPointStatus.UNKNOWN]
  }

  if (!Number.isInteger(total_sockets)) {
    devError(
      `total_sockets should be an integer but instead was ${String(total_sockets)}`,
    )

    return mapStatusToLabel[status ?? ChargingPointStatus.UNKNOWN]
  }

  const pluralizedSockets = simplur`[stopcontact|stopcontacten]${[total_sockets]}`
  const availableSocketsSentence = `${available_sockets ?? 0} van ${total_sockets} ${pluralizedSockets} vrij`
  const socketsSentenceMalfunction = `${mapStatusToLabel[status ?? ChargingPointStatus.UNKNOWN]} - ${total_sockets} ${pluralizedSockets}`

  return [ChargingPointStatus.OPERATIVE, ChargingPointStatus.OCCUPIED].includes(
    status,
  )
    ? availableSocketsSentence
    : socketsSentenceMalfunction
}
