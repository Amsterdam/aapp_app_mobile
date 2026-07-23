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

  if (!session) {
    return null
  }

  return (
    <Box variant="distinct">
      {isCharging ? (
        <Button
          isError={isErrorStopSession}
          isLoading={isLoadingStopSession}
          label="Stop laden"
          onPress={() => {
            void stopSession(session.id)
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
                void startSession(session.id)
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
