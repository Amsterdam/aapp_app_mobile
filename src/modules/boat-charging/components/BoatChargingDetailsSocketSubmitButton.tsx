import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useNewSessionFormValues} from '@/modules/boat-charging/slice'
import {deserializeSelectedChargingSocket} from '@/modules/boat-charging/utils/selectedChargingSocket'

export const BoatChargingDetailsSocketSubmitButton = () => {
  const form = useFormContext<{selectedSocket: string}>()
  const {isLoggedIn} = useIsLoggedIn()
  const {setSelectedChargingSocket} = useNewSessionFormValues()

  const {onPress, isLoading, isError, disabled, mustApproveTerms, refetch} =
    useInitSession()

  const onSubmit = useCallback(
    ({selectedSocket}: {selectedSocket?: string}) => {
      const selectedChargingSocket =
        deserializeSelectedChargingSocket(selectedSocket)

      if (!selectedChargingSocket) {
        form.setError('root', {message: 'Kies een stopcontact uit de lijst.'})

        return Promise.resolve()
      }

      setSelectedChargingSocket(selectedChargingSocket)

      return onPress()
    },
    [setSelectedChargingSocket, onPress, form],
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
