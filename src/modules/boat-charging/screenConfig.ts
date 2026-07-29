import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  BoatChargingRouteName,
  type ModuleStackParams,
} from '@/modules/boat-charging/routes'
import {BoatChargingScreen} from '@/modules/boat-charging/screens/BoatCharging.screen'
import {BoatChargingActiveSessionScreen} from '@/modules/boat-charging/screens/BoatChargingActiveSession.screen'
import {BoatChargingGuestEmailScreen} from '@/modules/boat-charging/screens/BoatChargingGuestEmail.screen'
import {BoatChargingGuestEmailConfirmScreen} from '@/modules/boat-charging/screens/BoatChargingGuestEmailConfirm.screen'
import {BoatChargingHelpScreen} from '@/modules/boat-charging/screens/BoatChargingHelp.screen'
import {BoatChargingHistoryScreen} from '@/modules/boat-charging/screens/BoatChargingHistory.screen'
import {BoatChargingHistorySessionDetailsScreen} from '@/modules/boat-charging/screens/BoatChargingHistorySessionDetails.screen'
import {BoatChargingLocationDetailsScreen} from '@/modules/boat-charging/screens/BoatChargingLocationDetails.screen'
import {BoatChargingLoginScreen} from '@/modules/boat-charging/screens/BoatChargingLogin.screen'
import {BoatChargingPaymentResultScreen} from '@/modules/boat-charging/screens/BoatChargingPaymentResult.screen'
import {BoatChargingTermsAndConditionsScreen} from '@/modules/boat-charging/screens/BoatChargingTermsAndConditions.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  BoatChargingRouteName
> = {
  [BoatChargingRouteName.map]: {
    component: BoatChargingScreen,
    name: BoatChargingRouteName.map,
    options: {
      headerShown: false,
    },
  },
  [BoatChargingRouteName.locationDetails]: {
    component: BoatChargingLocationDetailsScreen,
    name: BoatChargingRouteName.locationDetails,
    options: {
      headerTitle: 'Laadpunt',
    },
  },
  [BoatChargingRouteName.guestEmail]: {
    component: BoatChargingGuestEmailScreen,
    name: BoatChargingRouteName.guestEmail,
    options: {
      headerTitle: 'Laden zonder account',
    },
  },
  [BoatChargingRouteName.guestEmailConfirm]: {
    component: BoatChargingGuestEmailConfirmScreen,
    name: BoatChargingRouteName.guestEmailConfirm,
    options: {
      headerTitle: 'Controleer uw e-mailadres',
    },
  },
  [BoatChargingRouteName.help]: {
    component: BoatChargingHelpScreen,
    name: BoatChargingRouteName.help,
    options: {
      headerTitle: 'Hulp bij laden',
    },
  },
  [BoatChargingRouteName.history]: {
    component: BoatChargingHistoryScreen,
    name: BoatChargingRouteName.history,
    options: {
      headerTitle: 'Laadgeschiedenis',
    },
  },
  [BoatChargingRouteName.login]: {
    component: BoatChargingLoginScreen,
    name: BoatChargingRouteName.login,
    options: {
      headerTitle: 'Inloggen',
    },
  },
  [BoatChargingRouteName.activeSessionDetails]: {
    component: BoatChargingActiveSessionScreen,
    name: BoatChargingRouteName.activeSessionDetails,
    screenType: 'settings',
    options: {
      headerShown: false,
    },
  },
  [BoatChargingRouteName.historySessionDetails]: {
    component: BoatChargingHistorySessionDetailsScreen,
    name: BoatChargingRouteName.historySessionDetails,
    options: {
      headerShown: false,
      headerTitle: 'Laadsessie',
    },
  },
  [BoatChargingRouteName.termsAndConditions]: {
    component: BoatChargingTermsAndConditionsScreen,
    name: BoatChargingRouteName.termsAndConditions,
    options: {
      headerTitle: 'Voorwaarden',
    },
  },
  [BoatChargingRouteName.paymentResult]: {
    component: BoatChargingPaymentResultScreen,
    name: BoatChargingRouteName.paymentResult,
    options: {
      headerTitle: 'Laadsessie',
    },
  },
}
