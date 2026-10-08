import {
  AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'

export const alerts = {
  loginSuccess: {
    variant: AlertVariant.positive,
    text: 'U ontvangt nu meldingen van Mijn Amsterdam.',
    title: 'Inloggen gelukt',
    hasIcon: true,
    testID: 'MijnAmsterdamLoginSuccessAlert',
  },
  loginFailed: {
    variant: AlertVariant.negative,
    text: 'Inloggen is mislukt. Controleer uw gegevens en probeer het opnieuw.',
    title: 'Inloggen mislukt',
    hasIcon: true,
    testID: 'MijnAmsterdamLoginFailedAlert',
  },
  logoutFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het opnieuw.',
    title: 'Uitloggen mislukt',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'MijnAmsterdamLogoutFailedAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
