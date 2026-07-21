import {Divider} from '@/components/ui/Divider'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {BoatChargingMapNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingMapNavigationButton'
import {BoatChargingSessionInfoContainer} from '@/modules/boat-charging/components/session/BoatChargingSessionInfoContainer'
import {BoatChargingSessionSocket} from '@/modules/boat-charging/components/session/BoatChargingSessionSocket'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'

export const BoatChargingSession = () => {
  const {
    activeSession,
    activeSessions,
    isNotPluggedInErrorVisible,
    isError,
    isLoading,
    isPluggedIn,
  } = useBoatChargingSessions()

  useSetScreenTitle(activeSession?.location.name)

  if (isLoading) {
    return <PleaseWait testID="BoatChargingSessionPleaseWait" />
  }

  if (isError || !activeSessions?.length) {
    return (
      <Box>
        <SomethingWentWrong testID="BoatChargingSessionSomethingWentWrong" />
      </Box>
    )
  }

  return (
    <Box>
      <Column gutter="md">
        <Column gutter="lg">
          <BoatChargingSessionInfoContainer />
          {!!isNotPluggedInErrorVisible && !isPluggedIn && (
            <ErrorMessage
              testID="BoatChargingSessionIsNotPluggedInErrorMessage"
              text="Steek de stekker in het stopcontact om verder te gaan."
            />
          )}
          <BoatChargingSessionSocket
            socketNumber={activeSession?.socket_number}
          />
          <Divider />
        </Column>
        <BoatChargingMapNavigationButton />
      </Column>
    </Box>
  )
}
