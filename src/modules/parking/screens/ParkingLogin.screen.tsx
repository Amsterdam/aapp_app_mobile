import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ParkingLoginForm} from '@/modules/parking/components/login/ParkingLoginForm'
import {setDeeplinkAccount} from '@/modules/parking/slice'

export const ParkingLoginScreen = () => {
  const dispatch = useDispatch()

  useBlurEffect(() => {
    dispatch(setDeeplinkAccount(undefined))
  })

  return (
    <Screen
      hasStickyAlert
      keyboardAware
      testID="ParkingLoginScreen">
      <Box>
        <ParkingLoginForm />
      </Box>
    </Screen>
  )
}
