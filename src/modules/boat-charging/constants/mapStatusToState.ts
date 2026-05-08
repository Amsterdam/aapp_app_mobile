import {
  ChargingPointStatus,
  BoatChargingPointState,
} from '@/modules/boat-charging/types'

export const mapStatusToState: Record<
  ChargingPointStatus,
  BoatChargingPointState
> = {
  [ChargingPointStatus.INOPERATIVE]: BoatChargingPointState.malfunction,
  [ChargingPointStatus.UNKNOWN]: BoatChargingPointState.malfunction,
  [ChargingPointStatus.OFFLINE]: BoatChargingPointState.malfunction,
  [ChargingPointStatus.OCCUPIED]: BoatChargingPointState.occupied,
  [ChargingPointStatus.OPERATIVE]: BoatChargingPointState.free,
}
