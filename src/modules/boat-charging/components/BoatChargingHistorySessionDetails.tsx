import {useEffect} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {MetaDataCard} from '@/components/ui/MetaDataCard'
import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useBeforeRemove} from '@/hooks/navigation/useBeforeRemove'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {alerts} from '@/modules/boat-charging/alerts'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {
  addCompletedSessionSeenId,
  selectCompletedSessionSeenIds,
  setLastGuestSessionId,
} from '@/modules/boat-charging/slice'
import {
  BoatChargingStopReason,
  SessionStatus,
} from '@/modules/boat-charging/types'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {useAlert} from '@/store/slices/alert'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingHistorySessionDetails = () => {
  const {session, chargingTimeString, settings, isLoading} =
    useBoatChargingSession()

  const dispatch = useDispatch()

  useBeforeRemove(() => {
    if (session?.status === SessionStatus.COMPLETED) {
      dispatch(setLastGuestSessionId(undefined))
    }
  })

  const {setAlert} = useAlert()

  const completedSessionSeenIds = useSelector(
    selectCompletedSessionSeenIds,
    (a, b) => a.length === b.length,
  )

  useEffect(() => {
    if (session && !completedSessionSeenIds.includes(session?.id)) {
      if (
        session.stop_reason === BoatChargingStopReason.MANUAL ||
        session.stop_reason === BoatChargingStopReason.CANCELLED
      ) {
        setAlert(alerts.chargingStoppedSuccess)
      } else if (session.stop_reason === BoatChargingStopReason.UNPLUGGED) {
        setAlert(alerts.chargingStoppedUnpluggedWarning)
      } else if (
        session.stop_reason === BoatChargingStopReason.OUT_OF_BALANCE
      ) {
        setAlert(alerts.chargingStoppedOutOfBalanceWarning)
      } else {
        setAlert(alerts.chargingStoppedSomethingWentWrongWarning)
      }

      dispatch(addCompletedSessionSeenId(session.id))
    }
  }, [completedSessionSeenIds, dispatch, session, setAlert])

  const {toggle} = useBottomSheet()

  if (isLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="BoatChargingHistorySessionDetailsPleaseWait"
      />
    )
  }

  if (!session) {
    return <Phrase>Geen sessie gevonden</Phrase>
  }

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
  } = session

  return (
    <Column gutter="xl">
      <Column gutter="lg">
        <Title text={location.name} />
        <MetaDataCard
          iconName="power-plug"
          testID="BoatChargingHistorySessionDetailsSocketCard"
          title="Stopcontact">
          <Phrase>
            {station_id}-{socket_number}
          </Phrase>
        </MetaDataCard>
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
          <Button
            icon={{name: 'chevron-down', size: 'md'}}
            isReverseOrder
            label="Kostenoverzicht bekijken"
            noPadding
            onPress={() => toggle()}
            testID="BoatChargingHistorySessionDetailsViewCostBreakdownButton"
            variant="tertiary"
          />
        </MetaDataCard>
        <MetaDataCard
          iconName="lightning"
          testID="BoatChargingHistorySessionDetailsChargedCard"
          title="Geladen">
          <Phrase>{formatKWH(kwh)}</Phrase>
        </MetaDataCard>
        <MetaDataCard
          iconName="clock"
          testID="BoatChargingHistorySessionDetailsChargingTimeCard"
          title="Laadtijd">
          <Phrase>{chargingTimeString}</Phrase>
          <Phrase>
            Start: {formatDateTimeToDisplay(start_date_time, true)}
          </Phrase>
          {!!end_date_time && (
            <Phrase>
              Einde: {formatDateTimeToDisplay(end_date_time, true)}
            </Phrase>
          )}
        </MetaDataCard>
        <Column gutter="smd">
          <Phrase
            color="secondary"
            variant="small">
            Betaalbewijs verzonden naar {email}
          </Phrase>
          <Phrase
            color="secondary"
            variant="small">
            Sessienummer {id}
          </Phrase>
        </Column>
      </Column>
    </Column>
  )
}
