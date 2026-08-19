import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ForgotAccessCodeScreen} from '@/modules/access-code/screens/ForgotAccessCodeScreen'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

export const BoatChargingForgotAccessCodeScreen = () => {
  const navigation = useNavigation()

  return (
    <ForgotAccessCodeScreen
      onAfterRestart={() =>
        navigation.popTo(ModuleSlug['boat-charging'], {
          screen: BoatChargingRouteName.login,
        })
      }
      testID="BoatChargingForgotAccessCodeScreen"
    />
  )
}
