import {
  AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'

export const alerts = {
  usernameExistsFailed: {
    variant: AlertVariant.negative,
    text: 'Deze gebruikersnaam bestaat al.',
    title: 'Account aanmaken is mislukt',
    testID: 'BoatChargingUsernameExistsFailedAlert',
    navigateTo: {
      params: [BoatChargingRouteName.login],
      label: 'Inloggen',
    },
  },
  checkConfirmCodeFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het opnieuw.',
    title: 'Bevestigingscode controleren is mislukt',
    testID: 'BoatChargingCheckConfirmCodeFailedAlert',
  },
  confirmCodeExpiredFailed: {
    variant: AlertVariant.negative,
    text: 'De bevestigingscode is verlopen. Er is een nieuwe code gestuurd. Probeer het opnieuw.',
    title: 'Bevestigingscode is niet geldig',
    testID: 'BoatChargingConfirmCodeExpiredFailedAlert',
  },
  confirmCodeMismatchFailed: {
    variant: AlertVariant.negative,
    text: 'De bevestigingscode klopt niet. Probeer het opnieuw.',
    title: 'Bevestigingscode is ongeldig',
    testID: 'BoatChargingConfirmCodeMismatchFailedAlert',
  },
  resendConfirmCodeFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het opnieuw.',
    title: 'Bevestigingscode opnieuw sturen is mislukt',
    testID: 'BoatChargingResendConfirmCodeFailedAlert',
  },
  resendConfirmCodeSuccess: {
    variant: AlertVariant.positive,
    text: 'De bevestigingscode is opnieuw verstuurd.',
    title: 'Bevestigingscode opnieuw gestuurd',
    testID: 'BoatChargingResendConfirmCodeSuccessAlert',
  },
  createAccountFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het opnieuw.',
    title: 'Account aanmaken is mislukt',
    testID: 'BoatChargingCreateAccountFailedAlert',
  },
  forgotPasswordFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het opnieuw.',
    title: 'Nieuw wachtwoord aanvragen is mislukt',
    testID: 'BoatChargingForgotPasswordFailedAlert',
  },
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
  vignetInvalidFailed: {
    variant: AlertVariant.negative,
    text: 'Dit vignet is niet geldig.',
    title: 'Niet geldig',
    testID: 'BoatChargingVignetInvalidAlert',
  },
  vignetDeleteFailed: {
    variant: AlertVariant.negative,
    text: 'Het vignet is niet verwijderd. Probeer het later nog eens.',
    title: 'Er ging iets mis',
    testID: 'BoatChargingVignetDeleteAlert',
  },
  vignetExpiredFailed: {
    variant: AlertVariant.negative,
    text: 'Dit vignet is niet meer geldig.',
    title: 'Dit vignet is verlopen',
    testID: 'BoatChargingVignetExpiredAlert',
  },
  vignetNotApplicableFailed: {
    variant: AlertVariant.negative,
    externalLink: {
      label: 'Bekijk welk vignet u nodig heeft',
      redirectKey: RedirectKey.boatChargingVignetInfo,
    },
    title: 'Met dit vignet kunt u niet laden',
    testID: 'BoatChargingVignetNotApplicableAlert',
  },
  vignetAlreadyInUseFailed: {
    variant: AlertVariant.negative,
    text: 'Er is al een actieve laadsessie met dit vignet. Controleer uw actieve laadsessies.',
    title: 'Vignet is al in gebruik',
    testID: 'BoatChargingVignetAlreadyInUseAlert',
  },
  vignetVerificationErrorFailed: {
    title: 'Vignet controleren is niet gelukt',
    text: 'Probeer het opnieuw.',
    testID: 'BoatChargingVignetVerificationFailedAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
