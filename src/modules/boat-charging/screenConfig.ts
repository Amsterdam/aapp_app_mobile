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
import {BoatChargingTermsAndConditionsScreen} from '@/modules/boat-charging/screens/BoatChargingTermsAndConditions.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  BoatChargingRouteName
> = {
  [BoatChargingRouteName.boatCharging]: {
    component: BoatChargingScreen,
    name: BoatChargingRouteName.boatCharging,
    options: {
      headerShown: false,
    },
  },
  [BoatChargingRouteName.boatChargingLocationDetails]: {
    component: BoatChargingLocationDetailsScreen,
    name: BoatChargingRouteName.boatChargingLocationDetails,
    options: {
      headerTitle: 'Laadpunt',
    },
  },
  [BoatChargingRouteName.boatChargingGuestEmail]: {
    component: BoatChargingGuestEmailScreen,
    name: BoatChargingRouteName.boatChargingGuestEmail,
    options: {
      headerTitle: 'Laden zonder account',
    },
  },
  [BoatChargingRouteName.boatChargingGuestEmailConfirm]: {
    component: BoatChargingGuestEmailConfirmScreen,
    name: BoatChargingRouteName.boatChargingGuestEmailConfirm,
    options: {
      headerTitle: 'Controleer uw e-mailadres',
    },
  },
  [BoatChargingRouteName.boatChargingHelp]: {
    component: BoatChargingHelpScreen,
    name: BoatChargingRouteName.boatChargingHelp,
    options: {
      headerTitle: 'Hulp bij laden',
    },
  },
  [BoatChargingRouteName.boatChargingHistory]: {
    component: BoatChargingHistoryScreen,
    name: BoatChargingRouteName.boatChargingHistory,
    options: {
      headerTitle: 'Laadgeschiedenis',
    },
  },
  [BoatChargingRouteName.boatChargingLogin]: {
    component: BoatChargingLoginScreen,
    name: BoatChargingRouteName.boatChargingLogin,
    options: {
      headerTitle: 'Inloggen',
    },
  },
  [BoatChargingRouteName.boatChargingActiveSessionDetails]: {
    component: BoatChargingActiveSessionScreen,
    name: BoatChargingRouteName.boatChargingActiveSessionDetails,
    screenType: 'settings',
    options: {
      headerShown: false,
    },
  },
  [BoatChargingRouteName.boatChargingHistorySessionDetails]: {
    component: BoatChargingHistorySessionDetailsScreen,
    name: BoatChargingRouteName.boatChargingHistorySessionDetails,
    options: {
      headerShown: false,
      headerTitle: 'Laadsessie',
    },
  },
  [BoatChargingRouteName.boatChargingTermsAndConditions]: {
    component: BoatChargingTermsAndConditionsScreen,
    name: BoatChargingRouteName.boatChargingTermsAndConditions,
    options: {
      headerTitle: 'Voorwaarden',
    },
  },
}
