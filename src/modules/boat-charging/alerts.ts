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
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
