import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {LoadingBar} from '@/components/ui/feedback/LoadingBar'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {useBoatChargingStopSessionMutation} from '@/modules/boat-charging/service'
import {NRGStatus, SessionLengthStatus} from '@/modules/boat-charging/types'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingSessionInfoContainerCharging = () => {
  const {
    session,
    lastUpdated,
    chargingTimeVeryShortString,
    sessionLengthStatus,
    settings,
  } = useBoatChargingSession()
  const {toggle} = useBottomSheet()
  const [, {isLoading: isLoadingStopSession}] =
    useBoatChargingStopSessionMutation()

  const isStopping =
    session?.nrg_status === NRGStatus.Stopping || isLoadingStopSession

  const kwh = session?.kwh ?? 0
  const currency = session?.currency ?? 'EUR'
  const totalCost = session?.total_cost ?? 0

  return (
    <>
      <Row gutter="xs">
        <Icon
          color="secondary"
          isFilled
          name="lightning"
        />
        <Phrase
          color="secondary"
          variant="small">
          Geladen
        </Phrase>
      </Row>
      <Title
        level="h1"
        text={formatKWH(kwh)}
      />
      <Row
        flex={1}
        valign="start">
        <Column
          basis={1}
          flex={1}
          halign="center">
          <PressableBase
            hitSlop={16}
            onPress={() => toggle()}
            testID="BoatChargingSessionEstimatedCostButton">
            <Row gutter="xs">
              <Phrase
                color="secondary"
                variant="small">
                Geschatte kosten
              </Phrase>
              <Icon
                color="secondary"
                name="chevron-down"
                size="sm"
              />
            </Row>
          </PressableBase>
          <Title
            level="h3"
            text={
              settings?.vat_fraction
                ? formatNumber(totalCost * settings.vat_fraction, currency)
                : `${formatNumber(totalCost, currency)} ex btw`
            }
          />
        </Column>
        <Column
          basis={1}
          flex={1}
          halign="center">
          <Phrase
            color="secondary"
            variant="small">
            Laadtijd
          </Phrase>
          <Row
            gutter="sm"
            valign="center">
            {sessionLengthStatus === SessionLengthStatus.expiry && (
              <Icon
                color="warning"
                isFilled
                name="warning"
                size="lg"
              />
            )}
            <Title
              color={
                sessionLengthStatus === SessionLengthStatus.expiry
                  ? 'warning'
                  : 'default'
              }
              level="h3"
              text={chargingTimeVeryShortString ?? ''}
              textAlign="center"
            />
          </Row>
        </Column>
      </Row>
      <Row flex={1}>
        <Column
          flex={1}
          gutter="sm">
          <LoadingBar active={!isStopping} />
          <Phrase
            color="secondary"
            variant="small">
            {isStopping
              ? 'Bezig met stoppen...'
              : lastUpdated
                ? `Laatste update om ${formatTimeToDisplay(lastUpdated, {includeHoursLabel: true})}`
                : ''}
          </Phrase>
        </Column>
      </Row>
    </>
  )
}
