import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import type {BoatChargingSelectSocketFormValues} from '@/modules/boat-charging/types'
import {Button} from '@/components/ui/buttons/Button'
import {useInitSession} from '@/modules/boat-charging/hooks/useInitSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useNewSessionFormValues} from '@/modules/boat-charging/slice'

export const BoatChargingDetailsSocketSubmitButton = () => {
  const form = useFormContext<BoatChargingSelectSocketFormValues>()
  const {isLoggedIn} = useIsLoggedIn()
  const {setSelectedChargingSocket} = useNewSessionFormValues()

  const {onPress, isLoading, isError, disabled, mustApproveTerms, refetch} =
    useInitSession()

  const onSubmit = useCallback(
    ({
      selectedSocket,
    }: {
      selectedSocket?: {
        socketNumber: string
        stationId: string
      }
    }) => {
      if (!selectedSocket) {
        form.setError('root', {message: 'Kies een stopcontact uit de lijst.'})

        return Promise.resolve()
      }

      setSelectedChargingSocket(selectedSocket)

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
