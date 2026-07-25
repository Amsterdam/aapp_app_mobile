import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {FallbackForgotAccessCodeScreen} from '@/modules/access-code/screens/ForgotAccessCode.screen'

export const FORGOT_CODE_SCREEN = {
  component: FallbackForgotAccessCodeScreen,
  name: AccessCodeRouteName.forgotAccessCode,
  options: {headerTitle: 'Toegangscode vergeten'},
}
