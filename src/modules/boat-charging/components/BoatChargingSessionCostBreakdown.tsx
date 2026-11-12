import {skipToken} from '@reduxjs/toolkit/query'
import {Divider} from '@/components/ui/Divider'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {BoatChargingHistorySessionCostDetailsInfoRow} from '@/modules/boat-charging/components/bottomsheet/BoatChargingHistorySessionCostDetailsInfoRow'
import {boatChargingCostItemTypeMap} from '@/modules/boat-charging/constants/boatChargingCostItemTypeMap'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {useBoatChargingSessionCostBreakdownQuery} from '@/modules/boat-charging/service'
import {
  SessionStatus,
  type BoatChargingSessionCostBreakdownItem,
  type BoatChargingSettings,
} from '@/modules/boat-charging/types'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingSessionCostBreakdown = () => {
  const {session, settings} = useBoatChargingSession()

  const {
    data: costBreakdown,
    isLoading,
    isError,
  } = useBoatChargingSessionCostBreakdownQuery(session?.id ?? skipToken, {
    pollingInterval:
      session?.id && session.status === SessionStatus.ACTIVE ? 5000 : 0,
    refetchOnMountOrArgChange: true,
  })

  return (
    <Column gutter="lg">
      {!!isLoading && (
        <PleaseWait testID="BoatChargingHistorySessionCostDetailsBottomSheetPleaseWait" />
      )}
      {!!isError && (
        <SomethingWentWrong testID="BoatChargingHistorySessionCostDetailsBottomSheetSomethingWentWrong" />
      )}

      {!!costBreakdown && (
        <>
          <BoatChargingSessionCostBreakdownItems
            items={costBreakdown.items}
            settings={settings}
            vat_fraction={costBreakdown.items[0].vat_percentage}
          />

          <Divider height="md" />

          <Column gutter="xs">
            <Row
              align="between"
              flex={1}>
              <Title
                accessibilityLabel={`Totaal ${formatNumber(
                  costBreakdown.total_incl_vat,
                  'EUR',
                )}`}
                level="h3"
                text="Totaal"
              />
              <Title
                accessible={false}
                level="h3"
                text={formatNumber(costBreakdown.total_incl_vat, 'EUR')}
              />
            </Row>
            <Phrase
              color="secondary"
              variant="small">
              Prijzen zijn inclusief btw.
            </Phrase>
          </Column>
        </>
      )}
    </Column>
  )
}

type Props = {
  items: BoatChargingSessionCostBreakdownItem[]
  settings: BoatChargingSettings | undefined
  vat_fraction?: number | null
}
export const BoatChargingSessionCostBreakdownItems = ({
  items,
  vat_fraction,
  settings,
}: Props) => (
  <Column gutter="sm">
    {items.map(item => {
      if (!item.cost_incl_vat) {
        return null
      }

      const {details, label} = boatChargingCostItemTypeMap(settings)[item.type]

      return (
        <BoatChargingHistorySessionCostDetailsInfoRow
          details={details(item, vat_fraction)}
          key={item.type}
          label={label}
          value={formatNumber(item.cost_incl_vat, 'EUR')}
        />
      )
    })}
  </Column>
)
