export enum AccessCodeRouteName {
  accessCode = 'AccessCode',
  accessCodeInvalid = 'AccessCodeInvalid',
  biometricsPermission = 'BiometricsPermission',
  confirmAccessCode = 'ConfirmAccessCode',
  setAccessCode = 'SetAccessCode',
  validAccessCode = 'ValidAccessCode',
}

export type AccessCodeStackParams = {
  [AccessCodeRouteName.accessCode]: undefined
  [AccessCodeRouteName.accessCodeInvalid]: undefined
  [AccessCodeRouteName.biometricsPermission]: undefined
  [AccessCodeRouteName.setAccessCode]: undefined
  [AccessCodeRouteName.confirmAccessCode]: {showValidation: boolean} | undefined
  [AccessCodeRouteName.validAccessCode]: undefined
}
