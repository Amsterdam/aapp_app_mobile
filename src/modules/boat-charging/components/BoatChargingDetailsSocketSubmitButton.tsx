import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import type {
  BoatChargingSelectSocketFormValues,
  NewSessionFormValues,
} from '@/modules/boat-charging/types'
import {Button} from '@/components/ui/buttons/Button'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'

export const BoatChargingDetailsSocketSubmitButton = () => {
  const form = useFormContext<BoatChargingSelectSocketFormValues>()
  const {isLoggedIn} = useIsLoggedIn()

  const {onPress, isLoading, isError, disabled, mustApproveTerms, refetch} =
    useInitSession(BoatChargingInitSessionStep.selectSocket)

  const onSubmit = useCallback(
    (params: NewSessionFormValues) => {
      const {selectedSocket} = params

      if (!selectedSocket) {
        form.setError('root', {message: 'Kies een stopcontact uit de lijst.'})

        return Promise.resolve()
      }

      return onPress(params)
    },
    [onPress, form],
  )

  if (isLoggedIn && !mustApproveTerms) {
    return (
      <Button
        disabled={disabled}
        icon={{name: 'boat-charging-free', color: 'inverse'}}
        isError={isError}
        isLoading={isLoading}
        label="Betalen en laden"
        marginTop="auto"
        onPress={isError ? refetch : form.handleSubmit(onSubmit)}
        testID="BoatChargingDetailsChooseSocketSubmitButton"
      />
    )
  }

  return (
    <Button
      disabled={!!isLoggedIn && disabled}
      isError={!!isLoggedIn && isError}
      isLoading={!!isLoggedIn && isLoading}
      label="Verder met opladen"
      marginTop="auto"
      onPress={form.handleSubmit(onSubmit)}
      testID="BoatChargingDetailsChooseSocketSubmitButton"
    />
  )
}
