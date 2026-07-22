import {Divider} from '@/components/ui/Divider'
import {Box} from '@/components/ui/containers/Box'
import {Notice} from '@/components/ui/feedback/Notice'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {BoatChargingMapNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingMapNavigationButton'
import {BoatChargingSessionInfoContainer} from '@/modules/boat-charging/components/session/BoatChargingSessionInfoContainer'
import {BoatChargingSessionSocket} from '@/modules/boat-charging/components/session/BoatChargingSessionSocket'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {SessionLengthStatus} from '@/modules/boat-charging/types'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingSession = () => {
  const {
    activeSession,
    activeSessions,
    isNotPluggedInErrorVisible,
    isError,
    isLoading,
    isPluggedIn,
    sessionLengthStatus,
    settings,
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
          {sessionLengthStatus === SessionLengthStatus.expiryWarning && (
            <Notice
              text={`Uw boot mag maximaal ${settings.session_expiry_hours} uur laden. Daarna betaalt u ${formatNumber(settings.standard_fine, 'EUR')} per uur. Ook als u maar een deel van een uur gebruikt, betaalt u voor het hele uur.`}
              variant="information"
            />
          )}
          {sessionLengthStatus === SessionLengthStatus.expiry && (
            <Notice
              text={`Uw boot ligt langer dan ${settings.session_expiry_hours} uur bij het laadpunt. U betaalt nu ${formatNumber(settings.standard_fine, 'EUR')} per uur. Ook als u maar een deel van een uur gebruikt, betaalt u voor het hele uur.`}
              variant="negative"
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
