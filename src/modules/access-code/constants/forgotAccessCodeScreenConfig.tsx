import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {ForgotAccessCodeScreen} from '@/modules/access-code/screens/ForgotAccessCode.screen'

export const FORGOT_CODE_SCREEN = {
  component: () => <ForgotAccessCodeScreen testID="ForgotAccessCodeScreen" />,
  name: AccessCodeRouteName.forgotAccessCode,
  options: {headerTitle: 'Toegangscode vergeten'},
}
