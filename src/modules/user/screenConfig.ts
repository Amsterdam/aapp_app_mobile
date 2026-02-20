import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  UserModalParams,
  UserRouteName,
  UserStackParams,
} from '@/modules/user/routes'
import {AccessibilityStatementScreen} from '@/modules/user/screens/AccessibilityStatement.screen'
import {FeedbackScreen} from '@/modules/user/screens/Feedback.screen'
import {ModuleSettingsScreen} from '@/modules/user/screens/ModuleSettings.screen'
import {NotificationSettingsScreen} from '@/modules/user/screens/NotificationSettings.screen'
import {PrivacyStatementScreen} from '@/modules/user/screens/PrivacyStatement.screen'
import {UserScreen} from '@/modules/user/screens/User.screen'
import {UserBiometricsScreen} from '@/modules/user/screens/UserBiometrics.screen'
import {AboutTheAppDutchScreen} from '@/modules/user/screens/about/AboutTheAppDutch.screen'
import {AboutTheAppEnglishScreen} from '@/modules/user/screens/about/AboutTheAppEnglish.screen'
import {AccountsScreen} from '@/modules/user/screens/my-accounts/Accounts.screen'
import {LogoutModuleScreen} from '@/modules/user/screens/my-accounts/LogoutModule.screen'

export const screenConfig: StackNavigationRoutes<
  UserStackParams,
  UserRouteName
> = {
  [UserRouteName.logoutModule]: {
    component: LogoutModuleScreen,
    name: UserRouteName.logoutModule,
    options: {
      headerTitle: 'Uitloggen',
    },
    screenType: 'default',
  },
  [UserRouteName.moduleSettings]: {
    component: ModuleSettingsScreen,
    name: UserRouteName.moduleSettings,
    options: {
      headerTitle: 'Onderwerpen in de app',
    },
  },
  [UserRouteName.notificationSettings]: {
    component: NotificationSettingsScreen,
    name: UserRouteName.notificationSettings,
    options: {
      headerTitle: 'Pushmeldingen',
    },
  },
  [UserRouteName.user]: {
    component: UserScreen,
    name: UserRouteName.user,
    options: {
      headerTitle: 'Mijn profiel',
    },
  },
  [UserRouteName.userBiometrics]: {
    component: UserBiometricsScreen,
    name: UserRouteName.userBiometrics,
    options: {
      headerTitle: 'Biometrische gegevens',
    },
  },
  [UserRouteName.appSummary]: {
    component: AboutTheAppDutchScreen,
    name: UserRouteName.appSummary,
    options: {
      headerTitle: 'Over deze app',
    },
    screenType: 'default',
  },
  [UserRouteName.aboutEnglish]: {
    component: AboutTheAppEnglishScreen,
    name: UserRouteName.aboutEnglish,
    options: {
      accessibilityLanguage: 'en-US',
      headerTitle: 'About this app',
    },
    screenType: 'default',
  },
  [UserRouteName.accessibilityStatement]: {
    component: AccessibilityStatementScreen,
    name: UserRouteName.accessibilityStatement,
    options: {
      headerTitle: 'Toegankelijkheidsverklaring',
    },
    screenType: 'default',
  },
  [UserRouteName.feedback]: {
    component: FeedbackScreen,
    name: UserRouteName.feedback,
    options: {
      headerTitle: 'Uw mening',
    },
    screenType: 'default',
  },
  [UserRouteName.privacyStatement]: {
    component: PrivacyStatementScreen,
    name: UserRouteName.privacyStatement,
    options: {
      headerTitle: 'Privacyverklaring',
    },
    screenType: 'default',
  },
  [UserRouteName.accounts]: {
    component: AccountsScreen,
    name: UserRouteName.accounts,
    options: {
      headerTitle: 'Mijn accounts',
    },
  },
}

export const modals: StackNavigationRoutes<UserModalParams> = {}
