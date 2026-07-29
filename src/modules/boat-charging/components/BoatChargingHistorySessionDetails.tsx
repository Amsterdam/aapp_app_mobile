import {MetaDataCard} from '@/components/ui/MetaDataCard'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingHistorySessionDetails = () => {
  const {session, chargingTimeString, settings, isLoading} =
    useBoatChargingSession()

  const {
    email,
    station_id,
    socket_number,
    location,
    start_date_time,
    end_date_time,
    id,
    kwh,
    total_cost,
    currency,
  } = session ?? {}

  if (isLoading) {
    return <PleaseWait testID="BoatChargingHistorySessionDetailsPleaseWait" />
  }

  if (!session) {
    return <Phrase>Geen sessie gevonden</Phrase>
  }

  return (
    <Column gutter="xl">
      <Column gutter="lg">
        {!!location && <Title text={location.name} />}
        <MetaDataCard
          iconName="power-plug"
          testID="BoatChargingHistorySessionDetailsSocketCard"
          title="Stopcontact">
          <Phrase>
            {station_id}-{socket_number}
          </Phrase>
        </MetaDataCard>
        {!!total_cost && !!currency && (
          <MetaDataCard
            iconName="euro-coins"
            testID="BoatChargingHistorySessionDetailsTotalCostCard"
            title="Totale kosten">
            <Phrase>
              {settings?.vat_fraction
                ? `${formatNumber(
                    total_cost * settings.vat_fraction,
                    currency,
                  )} inclusief btw`
                : `${formatNumber(total_cost, currency)} exclusief btw`}
            </Phrase>
          </MetaDataCard>
        )}
        {!!kwh && (
          <MetaDataCard
            iconName="lightning"
            testID="BoatChargingHistorySessionDetailsChargedCard"
            title="Geladen">
            <Phrase>{formatKWH(kwh)}</Phrase>
          </MetaDataCard>
        )}
        <MetaDataCard
          iconName="clock"
          testID="BoatChargingHistorySessionDetailsChargingTimeCard"
          title="Laadtijd">
          {!!chargingTimeString && <Phrase>{chargingTimeString}</Phrase>}
          {!!start_date_time && (
            <Phrase>
              Start: {formatDateTimeToDisplay(start_date_time, true)}
            </Phrase>
          )}
          {!!end_date_time && (
            <Phrase>
              Einde: {formatDateTimeToDisplay(end_date_time, true)}
            </Phrase>
          )}
        </MetaDataCard>
        <Column gutter="smd">
          {!!email && (
            <Phrase
              color="secondary"
              variant="small">
              Betaalbewijs verzonden naar {email}
            </Phrase>
          )}
          {!!id && (
            <Phrase
              color="secondary"
              variant="small">
              Sessienummer {id}
            </Phrase>
          )}
        </Column>
      </Column>
    </Column>
  )
}
