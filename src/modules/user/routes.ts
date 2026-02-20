import type {ModuleSlug} from '@/modules/slugs'
import type {RedirectErrorCodes} from '@/types/mijnAmsterdam'
import type {LoginResult} from '@/types/navigation'

export enum UserRouteName {
  aboutEnglish = 'AboutEnglish',
  accessibilityStatement = 'AccessibilityStatement',
  accounts = 'Accounts',
  appSummary = 'AppSummary',
  feedback = 'Feedback',
  logoutModule = 'LogoutModule',
  moduleSettings = 'ModuleSettings',
  notificationSettings = 'NotificationSettings',
  privacyStatement = 'PrivacyStatement',
  user = 'User',
  userBiometrics = 'UserBiometrics',
}

export type UserStackParams = {
  [UserRouteName.aboutEnglish]: undefined
  [UserRouteName.accessibilityStatement]: undefined
  [UserRouteName.accounts]:
    | {
        'amp;errorCode'?: string
        errorCode?: RedirectErrorCodes
        errorMessage?: string
        loginResult?: LoginResult
      }
    | undefined
  [UserRouteName.appSummary]: undefined
  [UserRouteName.feedback]: undefined
  [UserRouteName.logoutModule]: {slug: ModuleSlug}
  [UserRouteName.privacyStatement]: undefined
  [UserRouteName.moduleSettings]: undefined
  [UserRouteName.notificationSettings]: undefined
  [UserRouteName.user]: undefined
  [UserRouteName.userBiometrics]: undefined
}

export enum UserModalName {}

export type UserModalParams = Record<string, never>
