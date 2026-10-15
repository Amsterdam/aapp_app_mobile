import {ChargingPointStatus} from '@/modules/boat-charging/types'

export const mapStatusToLabel: Record<ChargingPointStatus, string> = {
  [ChargingPointStatus.OPERATIVE]: 'Vrij',
  [ChargingPointStatus.OCCUPIED]: 'Bezet',
  [ChargingPointStatus.INOPERATIVE]: 'Storing',
  [ChargingPointStatus.OFFLINE]: 'Storing',
  [ChargingPointStatus.UNKNOWN]: 'Storing',
}
