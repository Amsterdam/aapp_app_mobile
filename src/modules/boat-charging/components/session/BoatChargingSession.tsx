import {useEffect} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Divider} from '@/components/ui/Divider'
import {Notice} from '@/components/ui/feedback/Notice'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {MetaDataCard} from '@/components/ui/MetaDataCard'
import {Phrase} from '@/components/ui/text/Phrase'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {BoatChargingMapNavigationButton} from '@/modules/boat-charging/components/navigation/BoatChargingMapNavigationButton'
import {BoatChargingSessionInfoContainer} from '@/modules/boat-charging/components/session/BoatChargingSessionInfoContainer'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {
  NRGStatus,
  SessionLengthStatus,
  SessionStatus,
} from '@/modules/boat-charging/types'
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

  useEffect(() => {
    if (
      (session?.nrg_status === NRGStatus.Completed ||
        session?.nrg_status === NRGStatus.Cancelled) &&
      session?.status === SessionStatus.COMPLETED
    ) {
      navigation.replace(BoatChargingRouteName.historySessionDetails, {
        id: session.id,
      })
    }
  }, [session?.status, navigation, session?.id, session?.nrg_status])

  if (isLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="BoatChargingSessionPleaseWait"
      />
    )
  }

  if (isError || !session) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="BoatChargingSessionSomethingWentWrong"
      />
    )
  }

  return (
    <Box>
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
        <Column gutter="md">
          <Column>
            <MetaDataCard
              testID="BoatChargingSessionSocketMetaDataCard"
              title="Stopcontact">
              <Phrase>
                {session.station_id}-{session.socket_number}
              </Phrase>
            </MetaDataCard>

            <BoatChargingMapNavigationButton />
          </Column>
          <Divider />

          <MetaDataCard
            testID="BoatChargingSessionVignetMetaDataCard"
            title="Vignet">
            <Phrase>{session.vignette_number}</Phrase>
            {!!session.boat_name && (
              <Phrase color="secondary">{session?.boat_name}</Phrase>
            )}
          </MetaDataCard>
        </Column>
      </Column>
    </Box>
  )
}
