import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {
  useBoatChargingStartSessionMutation,
  useBoatChargingStopSessionMutation,
} from '@/modules/boat-charging/service'
import {NRGStatus} from '@/modules/boat-charging/types'

export const BoatChargingSessionButtons = () => {
  const {activeSession, isPluggedIn, onPressStartButtonNotPluggedIn} =
    useBoatChargingSessions()
  const isCharging = activeSession?.nrg_status === NRGStatus.Charging
  const [
    startSession,
    {isLoading: isLoadingStartSession, isError: isErrorStartSession},
  ] = useBoatChargingStartSessionMutation()
  const [
    stopSession,
    {isLoading: isLoadingStopSession, isError: isErrorStopSession},
  ] = useBoatChargingStopSessionMutation()

  if (!activeSession) {
    return null
  }

  return (
    <Box>
      {isCharging ? (
        <Button
          isError={isErrorStopSession}
          isLoading={isLoadingStopSession}
          label="Stop laden"
          onPress={() => {
            void stopSession(activeSession.id)
          }}
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
                void startSession(activeSession.id)
              } else {
                onPressStartButtonNotPluggedIn()
              }
            }}
            testID="BoatChargingSessionButtonsStartButton"
          />
        </Column>
      )}
    </Box>
  )
}
