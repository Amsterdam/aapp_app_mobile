export enum ParkingSessionBottomSheetVariant {
  amount = 'amount',
  endTime = 'endTime',
  licensePlate = 'licensePlate',
  startTime = 'startTime',
}

export const tagTypes = [
  'ParkingLicensePlates' as const,
  'ParkingSessions' as const,
  'ParkingTransactions' as const,
  'ParkingAccount' as const,
  'ParkingPermits' as const,
]

export const MAX_LICENSE_PLATES = 10
