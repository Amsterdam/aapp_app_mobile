import {MetaDataCard} from '@/components/ui/MetaDataCard'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingHistorySessionDetails = () => {
  const {session, chargingTimeString, settings} = useBoatChargingSession()

  if (!session) {
    return <Phrase>Geen sessie gevonden</Phrase>
  }

  return (
    <Column gutter="xl">
      <Column gutter="lg">
        <Title text={session.location.name} />
        <MetaDataCard
          iconName="power-plug"
          testID="BoatChargingHistorySessionDetailsSocketCard"
          title="Stopcontact">
          <Phrase>{session.socket_number}</Phrase>
        </MetaDataCard>
        <MetaDataCard
          iconName="euro-coins"
          testID="BoatChargingHistorySessionDetailsTotalCostCard"
          title="Totale kosten">
          <Phrase>
            {settings?.vat_fraction
              ? `${formatNumber(
                  session.total_cost * settings.vat_fraction,
                  session.currency,
                )} inclusief btw`
              : `${formatNumber(session.total_cost, session.currency)} exclusief btw`}
          </Phrase>
        </MetaDataCard>
        <MetaDataCard
          iconName="lightning"
          testID="BoatChargingHistorySessionDetailsChargedCard"
          title="Geladen">
          <Phrase>{formatKWH(session.kwh)}</Phrase>
        </MetaDataCard>
        <MetaDataCard
          iconName="clock"
          testID="BoatChargingHistorySessionDetailsChargingTimeCard"
          title="Laadtijd">
          <Phrase>{chargingTimeString}</Phrase>
          <Phrase>
            Start: {formatDateTimeToDisplay(session.start_date_time, true)}
          </Phrase>
          <Phrase>
            Einde: {formatDateTimeToDisplay(session.end_date_time, true)}
          </Phrase>
        </MetaDataCard>
        <Column>
          {/* we do not get the associated emailaddress from the backend, so we cannot display it here. Using the last saved e-mail might result in showing the wrong e-mail address, so better not show it than possibly wrong.
          <Phrase>Betaalbewijs verzonden naar</Phrase> */}
          <Phrase
            color="secondary"
            variant="small">
            Sessienummer {session.id}
          </Phrase>
        </Column>
      </Column>
    </Column>
  )
}
