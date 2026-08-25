import {skipToken} from '@reduxjs/toolkit/query'
import type {BoatChargingSessionCostBreakdownItem} from '@/modules/boat-charging/types'
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
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingSessionCostBreakDown = () => {
  const {session, settings} = useBoatChargingSession()

  const {vat_fraction} = settings || {}

  const {
    data: costBreakdown,
    isLoading,
    isError,
  } = useBoatChargingSessionCostBreakdownQuery(session?.id ?? skipToken)

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
            vat_fraction={vat_fraction}
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
  vat_fraction?: number | null
}
export const BoatChargingSessionCostBreakdownItems = ({
  items,
  vat_fraction,
}: Props) => (
  <Column gutter="sm">
    {items.map(item =>
      !item.cost_incl_vat ? null : (
        <BoatChargingHistorySessionCostDetailsInfoRow
          details={boatChargingCostItemTypeMap[item.type].details(
            item,
            vat_fraction,
          )}
          key={item.type}
          label={boatChargingCostItemTypeMap[item.type].label}
          value={formatNumber(item.cost_incl_vat, 'EUR')}
        />
      ),
    )}
  </Column>
)
