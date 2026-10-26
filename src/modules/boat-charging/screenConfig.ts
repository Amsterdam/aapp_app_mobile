import {StackNavigationRoutes} from '@/app/navigation/types'
import {BoatChargingAddVignetHeaderButton} from '@/modules/boat-charging/components/vignettes/BoatChargingAddVignetHeaderButton'
import {
  BoatChargingRouteName,
  type ModuleStackParams,
} from '@/modules/boat-charging/routes'
import {BoatChargingScreen} from '@/modules/boat-charging/screens/BoatCharging.screen'
import {BoatChargingActiveSessionScreen} from '@/modules/boat-charging/screens/BoatChargingActiveSession.screen'
import {BoatChargingChooseVignetScreen} from '@/modules/boat-charging/screens/BoatChargingChooseVignet.screen'
import {BoatChargingCreateAccountScreen} from '@/modules/boat-charging/screens/BoatChargingCreateAccount.screen'
import {BoatChargingCreateAccountConfirmScreen} from '@/modules/boat-charging/screens/BoatChargingCreateAccountConfirm.screen'
import {BoatChargingForgotPasswordScreen} from '@/modules/boat-charging/screens/BoatChargingForgotPassword.screen'
import {BoatChargingForgotPasswordNewPasswordScreen} from '@/modules/boat-charging/screens/BoatChargingForgotPasswordNewPassword.screen'
import {BoatChargingGuestEmailScreen} from '@/modules/boat-charging/screens/BoatChargingGuestEmail.screen'
import {BoatChargingHelpScreen} from '@/modules/boat-charging/screens/BoatChargingHelp.screen'
import {BoatChargingHistoryScreen} from '@/modules/boat-charging/screens/BoatChargingHistory.screen'
import {BoatChargingHistorySessionDetailsScreen} from '@/modules/boat-charging/screens/BoatChargingHistorySessionDetails.screen'
import {BoatChargingLocationDetailsScreen} from '@/modules/boat-charging/screens/BoatChargingLocationDetails.screen'
import {BoatChargingLoginScreen} from '@/modules/boat-charging/screens/BoatChargingLogin.screen'
import {BoatChargingMyVignettesScreen} from '@/modules/boat-charging/screens/BoatChargingMyVignettes.screen'
import {BoatChargingPaymentResultScreen} from '@/modules/boat-charging/screens/BoatChargingPaymentResult.screen'
import {BoatChargingTermsAndConditionsScreen} from '@/modules/boat-charging/screens/BoatChargingTermsAndConditions.screen'
import {BoatChargingVerifyVignetScreen} from '@/modules/boat-charging/screens/BoatChargingVerifyVignet.screen'
import {BoatChargingVignetScreen} from '@/modules/boat-charging/screens/BoatChargingVignet.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
  Exclude<
    BoatChargingRouteName,
    BoatChargingRouteName.forgotAccessCode | BoatChargingRouteName.loginSteps
  >
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
  [BoatChargingRouteName.verifyVignet]: {
    component: BoatChargingVerifyVignetScreen,
    name: BoatChargingRouteName.verifyVignet,
    options: {
      headerTitle: 'Vignet controleren',
    },
  },
  [BoatChargingRouteName.chooseVignet]: {
    component: BoatChargingChooseVignetScreen,
    name: BoatChargingRouteName.chooseVignet,
    options: {
      headerTitle: 'Vignet kiezen',
    },
  },
  [BoatChargingRouteName.confirmSession]: {
    component: () => null,
    name: BoatChargingRouteName.confirmSession,
    options: {
      headerTitle: 'Laadsessie controleren',
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
  [BoatChargingRouteName.myVignettes]: {
    component: BoatChargingMyVignettesScreen,
    name: BoatChargingRouteName.myVignettes,
    options: {
      headerTitle: 'Mijn vignetten',
      SideComponent: BoatChargingAddVignetHeaderButton,
    },
  },
  [BoatChargingRouteName.vignet]: {
    component: BoatChargingVignetScreen,
    name: BoatChargingRouteName.vignet,
    options: {
      headerShown: false,
    },
  },
  [BoatChargingRouteName.createAccount]: {
    component: BoatChargingCreateAccountScreen,
    name: BoatChargingRouteName.createAccount,
    options: {
      headerTitle: 'Account aanmaken',
    },
  },
  [BoatChargingRouteName.createAccountConfirm]: {
    component: BoatChargingCreateAccountConfirmScreen,
    name: BoatChargingRouteName.createAccountConfirm,
    options: {
      headerTitle: 'Account aanmaken',
    },
  },
  [BoatChargingRouteName.forgotPassword]: {
    component: BoatChargingForgotPasswordScreen,
    name: BoatChargingRouteName.forgotPassword,
    options: {
      headerTitle: 'Wachtwoord vergeten',
    },
  },
  [BoatChargingRouteName.forgotPasswordNewPassword]: {
    component: BoatChargingForgotPasswordNewPasswordScreen,
    name: BoatChargingRouteName.forgotPasswordNewPassword,
    options: {
      headerTitle: 'Nieuw wachtwoord',
    },
  },
}
