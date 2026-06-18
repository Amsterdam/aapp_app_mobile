export enum BoatChargingRouteName {
  boatCharging = 'BoatCharging',
  boatChargingDetails = 'BoatChargingDetails',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.boatCharging]: undefined
  [BoatChargingRouteName.boatChargingDetails]: undefined
}
