import {useCallback} from 'react'
import {Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {
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
    stopSession,
    {isLoading: isLoadingStopSession, isError: isErrorStopSession},
  ] = useBoatChargingStopSessionMutation()

  const stop = useCallback(() => {
    if (!session) return

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
          onPress: () => stopSession(session.id),
        },
      ],
      {cancelable: true},
    )
  }, [stopSession, session])

  if (!session) {
    return null
  }

  return (
    <Box variant="distinct">
      <SafeAreaView edges={['bottom']}>
        {isCharging ? (
          <Button
            isError={isErrorStopSession}
            isLoading={isLoadingStopSession}
            label="Stop laden"
            onPress={stop}
            testID="BoatChargingSessionButtonsStopButton"
            variant="secondary"
          />
        ) : (
          <Column gutter="smd">
            <Button
              isError={isErrorStartSession}
              isLoading={isLoadingStartSession}
              label="Start laden"
              onPress={() => {
                if (isPluggedIn) {
                  void startSession(session.id)
                } else {
                  onPressStartButtonNotPluggedIn()
                }
              }}
              testID="BoatChargingSessionButtonsStartButton"
            />
          </Column>
        )}
      </SafeAreaView>
    </Box>
  )
}
