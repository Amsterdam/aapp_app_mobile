import {
  AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  paymentFailed: {
    title: 'Betaling mislukt',
    variant: AlertVariant.negative,
    text: 'De betaling is niet gelukt. Probeer het opnieuw.',
    testID: 'BoatChargingPaymentFailedAlert',
  },
  initializeFailed: {
    title: 'Betaling kon niet worden gestart',
    variant: AlertVariant.negative,
    text: 'Probeer het opnieuw.',
    testID: 'BoatChargingInitializeFailedAlert',
  },
  chargingStoppedSuccess: {
    title: 'Het laden is gestopt.',
    variant: AlertVariant.positive,
    testID: 'BoatChargingChargingStoppedSuccessAlert',
  },
  chargingStoppedUnpluggedWarning: {
    title: 'Het laden is gestopt.',
    variant: AlertVariant.warning,
    text: 'Stekker zit niet meer in het stopcontact.',
    testID: 'BoatChargingChargingStoppedUnpluggedWarningAlert',
  },
  chargingStoppedOutOfBalanceWarning: {
    title: 'Saldo te laag',
    variant: AlertVariant.warning,
    text: 'Er is te weinig saldo om verder te laden.',
    testID: 'BoatChargingChargingStoppedOutOfBalanceWarningAlert',
  },
  chargingStoppedSomethingWentWrongWarning: {
    title: 'Het laden is gestopt.',
    variant: AlertVariant.warning,
    text: 'Er ging iets mis tijdens het laden.',
    testID: 'BoatChargingChargingStoppedSomethingWentWrongWarningAlert',
  },
  loginFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het opnieuw.',
    title: 'Inloggen is mislukt',
    testID: 'BoatChargingLoginFailedAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
