import type {NavigationProps} from '@/app/navigation/types'
import {ForgotAccessCodeScreen} from '@/modules/access-code/screens/ForgotAccessCodeScreen'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type Props = NavigationProps<BoatChargingRouteName.forgotAccessCode>

export const BoatChargingForgotAccessCodeScreen = ({navigation}: Props) => (
  <ForgotAccessCodeScreen
    onAfterRestart={() =>
      navigation.popTo(ModuleSlug['boat-charging'], {
        screen: BoatChargingRouteName.login,
      })
    }
    testID="BoatChargingForgotAccessCodeScreen"
  />
)
