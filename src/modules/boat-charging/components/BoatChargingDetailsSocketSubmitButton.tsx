import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {devLog} from '@/processes/development'

export const BoatChargingDetailsSocketSubmitButton = () => {
  const form = useFormContext<{socketId: string}>()
  const {isLoggedIn} = useIsLoggedIn()
  const {navigate} = useNavigation()

  const onSubmit = useCallback(
    ({socketId}: {socketId?: string}) => {
      if (!socketId) {
        form.setError('root', {message: 'Kies een stopcontact uit de lijst.'})

        return
      }

      devLog(socketId)

      if (isLoggedIn) {
        navigate(BoatChargingRouteName.boatCharging) // TODO: initiate payment flow
      } else {
        navigate(BoatChargingRouteName.boatChargingGuestEmail, {
          socketId,
        })
      }
    },
    [form, isLoggedIn, navigate],
  )

  if (isLoggedIn) {
    return (
      <Button
        icon={{name: 'boat-charging-free', color: 'inverse'}}
        label="Betalen en laden"
        marginTop="auto"
        onPress={form.handleSubmit(onSubmit)}
        testID="BoatChargingDetailsChooseSocketSubmitButton"
      />
    )
  }

  return (
    <Button
      label="Verder met opladen"
      marginTop="auto"
      onPress={form.handleSubmit(onSubmit)}
      testID="BoatChargingDetailsChooseSocketSubmitButton"
    />
  )
}
