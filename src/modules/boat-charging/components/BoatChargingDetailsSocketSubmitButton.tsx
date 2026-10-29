import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {
  ChargingPointStatus,
  type BoatChargingSelectSocketFormValues,
  type NewSessionFormValues,
} from '@/modules/boat-charging/types'

type Props = {id: string}

export const BoatChargingDetailsSocketSubmitButton = ({id}: Props) => {
  const form = useFormContext<BoatChargingSelectSocketFormValues>()

  const {
    data: location,
    isLoading: isLoadingLocationDetails,
    isError: isErrorLocationDetails,
  } = useBoatChargingLocationDetailsQuery(id ?? skipToken)

  const {onPress, isLoading, isError, disabled} = useInitSession(
    BoatChargingInitSessionStep.selectSocket,
  )

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

  const showSubmitButton = useMemo(
    () =>
      !isLoadingLocationDetails &&
      !isErrorLocationDetails &&
      location?.charging_stations.some(
        socket => socket.status === ChargingPointStatus.OPERATIVE,
      ),
    [location, isLoadingLocationDetails, isErrorLocationDetails],
  )

  if (!showSubmitButton) {
    return null
  }

  return (
    <Box>
      <Button
        disabled={disabled}
        isError={isError}
        isLoading={isLoading}
        label="Kies stopcontact"
        marginTop="auto"
        onPress={form.handleSubmit(onSubmit)}
        testID="BoatChargingDetailsChooseSocketSubmitButton"
      />
    </Box>
  )
}
