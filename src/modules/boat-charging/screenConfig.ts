import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  BoatChargingRouteName,
  type ModuleStackParams,
} from '@/modules/boat-charging/routes'
import {BoatChargingScreen} from '@/modules/boat-charging/screens/BoatCharging.screen'
import {BoatChargingDetailsScreen} from '@/modules/boat-charging/screens/BoatChargingDetails.screen'
import {BoatChargingGuestEmailScreen} from '@/modules/boat-charging/screens/BoatChargingGuestEmail.screen'
import {BoatChargingGuestEmailConfirmScreen} from '@/modules/boat-charging/screens/BoatChargingGuestEmailConfirm.screen'
import {BoatChargingHelpScreen} from '@/modules/boat-charging/screens/BoatChargingHelp.screen'
import {BoatChargingHistoryScreen} from '@/modules/boat-charging/screens/BoatChargingHistory.screen'
import {BoatChargingLoginScreen} from '@/modules/boat-charging/screens/BoatChargingLogin.screen'
import {BoatChargingSessionScreen} from '@/modules/boat-charging/screens/BoatChargingSession.screen'
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
  [BoatChargingRouteName.boatChargingDetails]: {
    component: BoatChargingDetailsScreen,
    name: BoatChargingRouteName.boatChargingDetails,
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
  [BoatChargingRouteName.boatChargingSession]: {
    component: BoatChargingSessionScreen,
    name: BoatChargingRouteName.boatChargingSession,
    screenType: 'settings',
  },
  [BoatChargingRouteName.boatChargingTermsAndConditions]: {
    component: BoatChargingTermsAndConditionsScreen,
    name: BoatChargingRouteName.boatChargingTermsAndConditions,
    options: {
      headerTitle: 'Voorwaarden',
    },
  },
}
