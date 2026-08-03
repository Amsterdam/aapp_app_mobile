import {useEffect} from 'react'
import {Divider} from '@/components/ui/Divider'
import {Box} from '@/components/ui/containers/Box'
import {Notice} from '@/components/ui/feedback/Notice'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {alerts} from '@/modules/boat-charging/alerts'
import {BoatChargingMapNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingMapNavigationButton'
import {BoatChargingSessionInfoContainer} from '@/modules/boat-charging/components/session/BoatChargingSessionInfoContainer'
import {BoatChargingSessionSocket} from '@/modules/boat-charging/components/session/BoatChargingSessionSocket'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  BoatChargingStopReason,
  SessionLengthStatus,
  SessionStatus,
} from '@/modules/boat-charging/types'
import {useAlert} from '@/store/slices/alert'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingSession = () => {
  const {
    session,
    isNotPluggedInErrorVisible,
    isError,
    isLoading,
    isPluggedIn,
    sessionLengthStatus,
    settings,
  } = useBoatChargingSession()

  useSetScreenTitle(session?.location.name)
  const navigation = useNavigation()

  const {setAlert} = useAlert()

  useEffect(() => {
    if (session?.status === SessionStatus.COMPLETED) {
      if (session.stop_reason === BoatChargingStopReason.MANUAL) {
        setAlert(alerts.chargingStoppedSuccess)
      } else if (session.stop_reason === BoatChargingStopReason.UNPLUGGED) {
        setAlert(alerts.chargingStoppedUnpluggedWarning)
      } else if (session.stop_reason === BoatChargingStopReason.NO_BALANCE) {
        setAlert(alerts.chargingStoppedNoBalanceWarning)
      } else {
        setAlert(alerts.chargingStoppedSomethingWentWrongWarning)
      }

      navigation.replace(BoatChargingRouteName.historySessionDetails, {
        id: session.id,
      })
    }
  }, [session?.status, navigation, session?.id, session?.stop_reason, setAlert])

  if (isLoading) {
    return <PleaseWait testID="BoatChargingSessionPleaseWait" />
  }

  if (isError || !session) {
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
              text={`Uw boot mag maximaal ${settings?.session_expiry_hours} uur laden. Daarna betaalt u ${settings?.standard_fine ? formatNumber(settings.standard_fine, 'EUR') : 'een vast bedrag'} per uur. Ook als u maar een deel van een uur gebruikt, betaalt u voor het hele uur.`}
              variant="information"
            />
          )}
          {sessionLengthStatus === SessionLengthStatus.expiry && (
            <Notice
              text={`Uw boot ligt langer dan ${settings?.session_expiry_hours} uur bij het laadpunt. U betaalt nu ${settings?.standard_fine ? formatNumber(settings.standard_fine, 'EUR') : 'een vast bedrag'} per uur. Ook als u maar een deel van een uur gebruikt, betaalt u voor het hele uur.`}
              variant="negative"
            />
          )}
          <BoatChargingSessionSocket
            socketNumber={session?.socket_number}
            stationId={session?.station_id}
          />
          <Divider />
        </Column>
        <BoatChargingMapNavigationButton />
      </Column>
    </Box>
  )
}
