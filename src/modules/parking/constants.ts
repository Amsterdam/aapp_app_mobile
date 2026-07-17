export enum ParkingSessionBottomSheetVariant {
  amount = 'amount',
  endTime = 'endTime',
  licensePlate = 'licensePlate',
  startTime = 'startTime',
}

export const tagTypes = [
  'ParkingLicensePlates',
  'ParkingSessions',
  'ParkingTransactions',
  'ParkingAccount',
  'ParkingPermits',
] as const
