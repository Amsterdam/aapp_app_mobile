import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import type {RedirectErrorCodes} from '@/types/mijnAmsterdam'
import type {LoginResult} from '@/types/navigation'

export enum UserRouteName {
  about = 'About',
  accessibilityStatement = 'AccessibilityStatement',
  accounts = 'Accounts',
  feedback = 'Feedback',
  logoutModule = 'LogoutModule',
  moduleSettings = 'ModuleSettings',
  notificationSettings = 'NotificationSettings',
  privacyStatement = 'PrivacyStatement',
  removeAllData = 'UserRemoveAllData',
  removeAllDataPermissions = 'UserRemoveAllDataPermissions',
  removeAllDataResult = 'UserRemoveAllDataResult',
  user = 'User',
  userBiometrics = 'UserBiometrics',
}

export type ModuleStackParams = {
  [UserRouteName.accessibilityStatement]: undefined
  [UserRouteName.accounts]:
    | {
        'amp;errorCode'?: string
        errorCode?: RedirectErrorCodes
        errorMessage?: string
        loginResult?: LoginResult
      }
    | undefined
  [UserRouteName.about]: undefined
  [UserRouteName.feedback]: undefined
  [UserRouteName.logoutModule]: {slug: ModuleSlug}
  [UserRouteName.privacyStatement]: undefined
  [UserRouteName.moduleSettings]: undefined
  [UserRouteName.notificationSettings]: undefined
  [UserRouteName.user]: undefined
  [UserRouteName.userBiometrics]: undefined
  [UserRouteName.removeAllData]: undefined
  [UserRouteName.removeAllDataPermissions]: undefined
  [UserRouteName.removeAllDataResult]: {errors?: string[]; success: boolean}
}
