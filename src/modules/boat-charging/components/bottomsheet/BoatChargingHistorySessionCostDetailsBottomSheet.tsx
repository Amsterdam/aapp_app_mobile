import {skipToken} from '@reduxjs/toolkit/query'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {BottomSheetLabelValueRow} from '@/components/features/bottom-sheet/BottomSheetLabelValueRow'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {useBoatChargingSessionCostBreakdownQuery} from '@/modules/boat-charging/service'
import {BoatChargingCostBreakdownItemType} from '@/modules/boat-charging/types'
import {formatNumber} from '@/utils/formatNumber'

const BoatChargingCostBreakdownItemTypeToLabel: Record<
  BoatChargingCostBreakdownItemType,
  string
> = {
  [BoatChargingCostBreakdownItemType.ENERGY]: 'Stroom',
  [BoatChargingCostBreakdownItemType.TIME]: 'Laadtijd',
  [BoatChargingCostBreakdownItemType.PARKING_TIME]: 'Ligtijd',
  [BoatChargingCostBreakdownItemType.FLAT]: 'Starttarief',
}

export const BoatChargingHistorySessionCostDetailsBottomSheet = () => {
  const {session} = useBoatChargingSession()

  const {
    data: costBreakdown,
    isLoading,
    isError,
  } = useBoatChargingSessionCostBreakdownQuery(session?.id ?? skipToken)

  return (
    <BottomSheet
      scroll
      testID="BoatChargingHistorySessionCostDetailsBottomSheet"
      withCloseButton>
      <Box>
        <Column gutter="lg">
          <Column gutter="md">
            <Title
              level="h3"
              text="Kostenoverzicht"
            />
            {!isLoading && (
              <PleaseWait testID="BoatChargingHistorySessionCostDetailsBottomSheetPleaseWait" />
            )}
            {!isError && (
              <SomethingWentWrong testID="BoatChargingHistorySessionCostDetailsBottomSheetSomethingWentWrong" />
            )}
            {!!costBreakdown && (
              <Column gutter="sm">
                {costBreakdown.items.map(item => (
                  <BottomSheetLabelValueRow
                    key={item.type}
                    label={BoatChargingCostBreakdownItemTypeToLabel[item.type]}
                    value={formatNumber(
                      item.costInclVat,
                      costBreakdown.currency,
                    )}
                  />
                ))}
              </Column>
            )}
          </Column>
          {!!costBreakdown && (
            <Column gutter="xs">
              <Title
                level="h3"
                text={`Totaal ${formatNumber(costBreakdown.totalInclVat, costBreakdown.currency)}`}
              />
              <Phrase
                color="secondary"
                variant="small">
                Prijzen zijn inclusief btw.
              </Phrase>
            </Column>
          )}
        </Column>
      </Box>
    </BottomSheet>
  )
}
