import {useCallback} from 'react'
import {Button, type ButtonProps} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ParkingRouteName} from '@/modules/parking/routes'
import {setIsLoggingIn} from '@/modules/parking/slice'

type Props = ButtonProps

export const AdditionalLoginButton = (props: Props) => {
  const dispatch = useDispatch()
  const {navigate} = useNavigation()

  const onPress = useCallback(() => {
    dispatch(setIsLoggingIn(true))
    navigate(ParkingRouteName.login)
  }, [dispatch, navigate])

  return (
    <Button
      {...props}
      label="Inloggen"
      onPress={onPress}
      variant="secondary"
    />
  )
}
