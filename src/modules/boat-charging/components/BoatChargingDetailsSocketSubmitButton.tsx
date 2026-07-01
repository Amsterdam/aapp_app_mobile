import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {devLog} from '@/processes/development'

export const BoatChargingDetailsSocketSubmitButton = () => {
  const form = useFormContext<{socket: string}>()
  const {isLoggedIn} = useIsLoggedIn()

  const onSubmit = useCallback(
    (values: {socket?: string}) => {
      if (!values.socket) {
        form.setError('root', {message: 'Kies een stopcontact uit de lijst.'})
      }

      devLog(values.socket)
    },
    [form],
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
