import {useCallback, useEffect, useState} from 'react'
import {Button, type ButtonProps} from '@/components/ui/buttons/Button'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  setIsLoggingIn,
  useParkingAccountIsLoggingIn,
} from '@/modules/parking/slice'

type Props = ButtonProps

export const AdditionalLoginButton = (props: Props) => {
  const dispatch = useDispatch()
  const {navigate} = useNavigation()
  const isLoggingIn = useParkingAccountIsLoggingIn()
  const [isPressed, setIsPressed] = useState(false)

  const onPress = useCallback(() => {
    dispatch(setIsLoggingIn(true))
    setIsPressed(true)
  }, [dispatch])

  useEffect(() => {
    if (isLoggingIn && isPressed) {
      navigate(ParkingRouteName.login)
    }
  }, [isLoggingIn, isPressed, navigate])

  useBlurEffect(() => {
    setIsPressed(false)
  })

  return (
    <Button
      {...props}
      label="Account toevoegen"
      onPress={onPress}
    />
  )
}
