import {useCallback, useEffect} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SafeArea} from '@/components/ui/containers/SafeArea'
import {Column} from '@/components/ui/layout/Column'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {
  useBoatChargingCancelSessionMutation,
  useBoatChargingStartSessionMutation,
  useBoatChargingStopSessionMutation,
} from '@/modules/boat-charging/service'
import {NRGStatus} from '@/modules/boat-charging/types'

export const BoatChargingSessionButtons = () => {
  const {session, isPluggedIn, onPressStartButtonNotPluggedIn} =
    useBoatChargingSession()
  const isCharging = session?.nrg_status === NRGStatus.Charging
  const [
    startSession,
    {isLoading: isLoadingStartSession, isError: isErrorStartSession},
  ] = useBoatChargingStartSessionMutation()
  const [
    cancelSession,
    {isLoading: isLoadingCancelSession, isError: isErrorCancelSession},
  ] = useBoatChargingCancelSessionMutation()
  const [
    stopSession,
    {isLoading: isLoadingStopSession, isError: isErrorStopSession},
  ] = useBoatChargingStopSessionMutation()

  useEffect(() => {
    if (
      session?.nrg_status === NRGStatus.CheckedOut &&
      isPluggedIn &&
      !isLoadingStartSession &&
      !isErrorStartSession
    ) {
      void startSession(session.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.nrg_status, isPluggedIn, startSession, session?.id])

  const stop = useCallback(() => {
    if (!session) {
      return
    }

    Alert.alert(
      'Wilt u het laden stoppen?',
      undefined,
      [
        {
          text: 'Annuleren',
          style: 'cancel',
        },
        {
          isPreferred: true,
          text: 'Laden stoppen',
          onPress: () =>
            session.nrg_status === NRGStatus.CheckedOut
              ? cancelSession(session.id)
              : stopSession(session.id),
        },
      ],
      {cancelable: true},
    )
  }, [stopSession, cancelSession, session])

  if (!session) {
    return null
  }

  return (
    <Box variant="distinct">
      <SafeArea bottom>
        {isCharging ? (
          <Button
            isError={isErrorStopSession}
            isLoading={
              isLoadingStopSession || session?.nrg_status === NRGStatus.Stopping
            }
            label="Stop laden"
            onPress={() =>
              isLoadingStopSession || session?.nrg_status === NRGStatus.Stopping
                ? null
                : stop()
            }
            testID="BoatChargingSessionButtonsStopButton"
            variant="secondary"
          />
        ) : (
          <Column gutter="smd">
            {session.nrg_status === NRGStatus.CheckedOut &&
              !!session.last_command_error && (
                <Button
                  isError={isErrorStartSession}
                  isLoading={isLoadingStartSession}
                  label="Opnieuw proberen"
                  onPress={() => {
                    if (isPluggedIn) {
                      void startSession(session.id)
                    } else {
                      onPressStartButtonNotPluggedIn()
                    }
                  }}
                  testID="BoatChargingSessionButtonsStartButton"
                />
              )}
            {(session.nrg_status === NRGStatus.CheckedOut ||
              session.nrg_status === NRGStatus.Starting) && (
              <Button
                isError={isErrorCancelSession}
                isLoading={isLoadingCancelSession}
                label="Annuleren"
                onPress={stop}
                testID="BoatChargingSessionButtonsCancelButton"
                variant="secondary"
              />
            )}
          </Column>
        )}
      </SafeArea>
    </Box>
  )
}
