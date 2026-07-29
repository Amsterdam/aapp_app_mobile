import {ForgotAccessCodeScreen} from '@/modules/access-code/screens/ForgotAccessCode.screen'
import {useLogin} from '@/modules/city-pass/hooks/useLogin'

export const CityPassForgotAccessCodeScreen = () => {
  const login = useLogin()

  return (
    <ForgotAccessCodeScreen
      onAfterRestart={login}
      testID="CityPassForgotAccessCodeScreen"
    />
  )
}
