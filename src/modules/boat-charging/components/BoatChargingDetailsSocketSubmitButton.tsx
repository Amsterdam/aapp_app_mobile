import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {
  BoatChargingInitSessionStep,
  useInitSession,
} from '@/modules/boat-charging/hooks/useInitSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {
  ChargingPointStatus,
  type BoatChargingSelectSocketFormValues,
  type NewSessionFormValues,
} from '@/modules/boat-charging/types'

type Props = {id: string}

export const BoatChargingDetailsSocketSubmitButton = ({id}: Props) => {
  const form = useFormContext<BoatChargingSelectSocketFormValues>()
  const {isLoggedIn} = useIsLoggedIn()

  const {
    data: location,
    isLoading: isLoadingLocationDetails,
    isError: isErrorLocationDetails,
  } = useBoatChargingLocationDetailsQuery(id ?? skipToken)
  const {
    activeSessions,
    isLoading: isLoadingSessions,
    isError: isErrorSessions,
  } = useBoatChargingSessions()

  const {
    onPress,
    isLoading,
    isError,
    disabled,
    mustApproveTerms,
    refetch,
    shouldRefetchTerms,
  } = useInitSession(BoatChargingInitSessionStep.selectSocket)

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
      !isLoadingSessions &&
      !isErrorLocationDetails &&
      !isErrorSessions &&
      !activeSessions?.length &&
      location?.charging_stations.some(
        socket => socket.status === ChargingPointStatus.OPERATIVE,
      ),
    [
      activeSessions,
      location,
      isLoadingLocationDetails,
      isLoadingSessions,
      isErrorLocationDetails,
      isErrorSessions,
    ],
  )

  if (!showSubmitButton) {
    return null
  }

  if (isLoggedIn && !mustApproveTerms) {
    return (
      <Box>
        <Button
          disabled={disabled}
          icon={{name: 'boat-charging-free', color: 'inverse'}}
          isError={isError}
          isLoading={isLoading}
          label="Betalen en laden"
          marginTop="auto"
          onPress={shouldRefetchTerms ? refetch : form.handleSubmit(onSubmit)}
          testID="BoatChargingDetailsChooseSocketSubmitButton"
        />
      </Box>
    )
  }

  return (
    <Box>
      <Button
        disabled={!!isLoggedIn && disabled}
        isError={!!isLoggedIn && isError}
        isLoading={!!isLoggedIn && isLoading}
        label="Verder met opladen"
        marginTop="auto"
        onPress={form.handleSubmit(onSubmit)}
        testID="BoatChargingDetailsChooseSocketSubmitButton"
      />
    </Box>
  )
}
