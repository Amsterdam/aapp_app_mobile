import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ForgotAccessCodeScreen} from '@/modules/access-code/screens/ForgotAccessCodeScreen'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingForgotAccessCodeScreen = () => {
  const {reset} = useNavigation()

  return (
    <ForgotAccessCodeScreen
      onAfterRestart={() =>
        reset({
          index: 0,
          routes: [{name: ParkingRouteName.login}],
        })
      }
      testID="ParkingForgotAccessCodeScreen"
    />
  )
}
