export enum BoatChargingRouteName {
  boatCharging = 'BoatCharging',
  boatChargingDetails = 'BoatChargingDetails',
  boatChargingHelp = 'BoatChargingHelp',
  boatChargingLogin = 'BoatChargingLogin',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.boatCharging]: undefined
  [BoatChargingRouteName.boatChargingDetails]: undefined
  [BoatChargingRouteName.boatChargingHelp]: undefined
  [BoatChargingRouteName.boatChargingLogin]: undefined
}
