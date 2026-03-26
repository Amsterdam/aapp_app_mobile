import {
  type AlertsRecord,
  AlertVariant,
} from '@/components/ui/feedback/alert/Alert.types'
import {ParkingRouteName} from '@/modules/parking/routes'
import {getFirstMonthOfNextQuarter} from '@/modules/parking/utils/getFirstMonthOfNextQuarter'
import {ModuleSlug} from '@/modules/slugs'

const loginFailedTitle = 'Inloggen mislukt'

export const alerts = {
  accountPinCodeChangeSuccess: {
    variant: AlertVariant.positive,
    title: 'Uw pincode is gewijzigd.',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingAccountPinCodeChangeSuccessAlert',
  },
  adjustSessionSuccess: {
    variant: AlertVariant.positive,
    title: 'Uw parkeersessie is aangepast',
    hasCloseIcon: true,
    hasIcon: true,
    testID: 'ParkingAdjustSessionSuccessAlert',
  },
  adjustSessionFailed: {
    variant: AlertVariant.negative,
    text: 'We konden uw parkeersessie niet aanpassen.',
    title: 'Mislukt',
    hasIcon: true,
    testID: 'ParkingAdjustSessionFailedAlert',
  },
  adjustTimeBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'We konden het tijdsaldo niet aanpassen.',
    title: 'Mislukt',
    hasIcon: true,
    testID: 'ParkingManageVisitorAdjustTimeBalanceFailedAlert',
  },
  adjustTimeBalanceSuccess: {
    variant: AlertVariant.positive,
    text: 'Tijdsaldo is aangepast.',
    title: 'Gelukt',
    hasIcon: true,
    testID: 'ParkingManageVisitorAdjustTimeBalanceSuccessAlert',
  },
  changeParkingPermitAliasInfo: {
    variant: AlertVariant.information,
    text: 'Zo herkent u ze direct.',
    title: 'Geef uw accounts een naam',
    hasIcon: true,
    testID: 'ParkingPermitAccountsChangeAliasInfoAlert',
    link: {
      label: 'Naam aanpassen',
      to: [
        ModuleSlug.parking,
        {name: ParkingRouteName.accounts, params: undefined},
      ],
    },
  },
  createVisitorAccountSuccess: {
    variant: AlertVariant.positive,
    text: 'Voeg tijdsaldo toe en deel de meldcode en pincode met uw bezoek.',
    title: 'Nieuw bezoekersaccount',
    hasIcon: true,
    testID: 'ParkingManageVisitorCreateAccountSuccessAlert',
  },
  createVisitorAccountFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het later nog een keer.',
    title: 'Geen bezoekersaccount',
    hasIcon: true,
    testID: 'ParkingManageVisitorCreateAccountFailedAlert',
  },
  decreaseTimeBalanceSuccess: {
    variant: AlertVariant.positive,
    text: 'Tijdsaldo is succesvol verlaagd.',
    title: 'Gelukt',
    hasIcon: true,
    testID: 'ParkingManageVisitorDecreaseTimeBalanceSuccessAlert',
  },
  decreaseTimeBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Tijdsaldo verlagen is mislukt, probeer het nog een keer.',
    title: 'Mislukt',
    hasIcon: true,
    testID: 'ParkingManageVisitorDecreaseTimeBalanceFailedAlert',
  },
  freeParkingSuccess: {
    variant: AlertVariant.positive,
    text: 'U hoeft geen parkeersessie te starten.',
    title: 'Parkeren in deze periode is gratis',
    hasIcon: true,
    testID: 'ParkingFreeParkingSuccessAlert',
  },
  inactiveSessionFailed: {
    variant: AlertVariant.negative,
    text: 'Uw sessie is verlopen. Plan een nieuwe sessie.',
    title: 'Sessie verlopen',
    hasIcon: true,
    testID: 'ParkingInactiveSessionFailedAlert',
  },
  increaseBalanceSuccess: {
    variant: AlertVariant.positive,
    text: 'Geldsaldo is verhoogd. Het kan even duren voordat het saldo is bijgewerkt.',
    title: 'Gelukt',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingIncreaseBalanceSuccessAlert',
  },
  increaseBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Geldsaldo verhogen is mislukt, probeer het nog een keer.',
    title: 'Mislukt',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingIncreaseBalanceFailedAlert',
  },
  insufficientMoneyBalanceFailed: {
    variant: AlertVariant.negative,
    text: 'Er is niet genoeg geldsaldo om te parkeren. Voeg eerst geld toe. Daarna kun kunt u de parkeersessie starten.',
    title: 'Uw saldo is te laag',
    hasIcon: true,
    hasCloseIcon: false,
    testID: 'ParkingInsufficientMoneyBalanceFailedAlert',
  },
  insufficientTimeBalanceFailed: {
    variant: AlertVariant.negative,
    text: `Op 1 ${getFirstMonthOfNextQuarter().format('MMMM')} ontvangt u nieuw tijdsaldo. Probeer eventueel een kortere parkeertijd te kiezen.`,
    title: 'Niet genoeg tijdsaldo',
    hasIcon: true,
    hasCloseIcon: false,
    testID: 'ParkingInsufficientTimeBalanceFailedAlert',
  },
  insufficientTimeBalanceVisitorFailed: {
    variant: AlertVariant.negative,
    text: 'Vraag aan de persoon die u bezoekt om het tijdsaldo te verhogen.',
    title: 'Niet genoeg tijdsaldo',
    hasIcon: true,
    hasCloseIcon: false,
    testID: 'ParkingInsufficientTimeBalanceFailedAlert',
  },
  loginForbiddenFailed: {
    variant: AlertVariant.negative,
    text: 'Controleer uw meldcode en pincode en probeer het opnieuw.',
    title: loginFailedTitle,
    testID: 'ParkingLoginForbiddenFailedAlert',
  },
  loginFailed: {
    variant: AlertVariant.negative,
    text: 'Er is iets misgegaan. Probeer het opnieuw.',
    title: loginFailedTitle,
    testID: 'ParkingLoginFailedAlert',
  },
  loginAccountInactiveFailed: {
    variant: AlertVariant.negative,
    text: 'Account is niet actief. Neem contact op.',
    title: loginFailedTitle,
    testID: 'ParkingLoginAccountInactiveFailedAlert',
  },
  loginAccountBlockedFailed: {
    variant: AlertVariant.negative,
    text: 'Dit account is geblokkeerd voor 24 uur door te veel mislukte inlogpogingen.',
    title: loginFailedTitle,
    testID: 'ParkingLoginAccountBlockedFailedAlert',
  },
  logoutWithAnotherAccountSuccess: {
    variant: AlertVariant.positive,
    text: 'U bent nog ingelogd met een ander account.',
    title: 'Uitgelogd',
    hasIcon: true,
    testID: 'ParkingLogoutWithAnotherAccountSuccessAlert',
  },
  maximumSessionsWarning: {
    variant: AlertVariant.warning,
    text: 'Pas de parkeertijd aan.',
    title: 'Maximum aantal parkeersessies bereikt',
    hasIcon: true,
    testID: 'ParkingMaximumSessionsWarningAlert',
  },
  saveLicensePlateDuplicateWarning: {
    variant: AlertVariant.warning,
    text: 'Dit kenteken is al opgeslagen in Mijn kentekens.',
    title: 'Kenteken bestaat al',
    hasIcon: true,
    hasCloseIcon: true,
    testID: 'ParkingLicensePlateDuplicateErrorAlert',
  },
  startSessionSuccess: {
    variant: AlertVariant.positive,
    title: 'Uw parkeersessie is opgeslagen',
    hasCloseIcon: true,
    hasIcon: true,
    testID: 'ParkingStartSessionSuccessAlert',
  },
} as const satisfies AlertsRecord

export type Alerts = keyof typeof alerts
