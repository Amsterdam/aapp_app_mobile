import {useFormContext} from 'react-hook-form'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {BoatChargingSocketRadioLabel} from '@/modules/boat-charging/components/BoatChargingSocketRadioLabel'
import {useAvailableAndOtherEvses} from '@/modules/boat-charging/hooks/useAvailableAndOtherEvses'
import {
  ChargingPointStatus,
  type ChargingStation,
} from '@/modules/boat-charging/types'
import {serializeSelectedChargingSocket} from '@/modules/boat-charging/utils/selectedChargingSocket'
import {sizeTokens} from '@/themes/tokens/size'

const EMPTY_RADIO_PLACEHOLDER_SIZE = sizeTokens.spacing.sm + 24 // Radio SVG width is 24, plus sm gutter added by Row in Radio component.

export const BoatChargingDetailsSocketRadioGroup = ({
  hasActiveSession,
  chargingStations = [],
}: {
  chargingStations: ChargingStation[]
  hasActiveSession: boolean
}) => {
  const form = useFormContext<{selectedSocket: string}>()

  const {availableEvses, otherEvses, evses} =
    useAvailableAndOtherEvses(chargingStations)
  const extraPadding = otherEvses.some(
    ({status}) => status === ChargingPointStatus.UNKNOWN,
  )

  const selectableEvses = hasActiveSession ? [] : availableEvses
  const notSelectableEvses = hasActiveSession ? evses : otherEvses

  return (
    <Column gutter="md">
      {!!selectableEvses.length && (
        <RadioGroupControlled
          {...form}
          name="selectedSocket"
          options={selectableEvses.map(({station, name, evse_id}) => ({
            label: (
              <BoatChargingSocketRadioLabel
                name={name}
                status={ChargingPointStatus.OPERATIVE}
                width={extraPadding ? 'wide' : 'default'}
              />
            ),
            value: serializeSelectedChargingSocket({
              stationId: station.id,
              socketNumber: evse_id,
            }),
          }))}
          testID="BoatChargingDetailsChooseSocketRadioGroup"
        />
      )}
      {!!notSelectableEvses.length &&
        notSelectableEvses.map(({station, status, name}) => (
          <Row key={name}>
            {!!selectableEvses.length && (
              <Size width={EMPTY_RADIO_PLACEHOLDER_SIZE} />
            )}
            <BoatChargingSocketRadioLabel
              name={name}
              status={
                status === ChargingPointStatus.OPERATIVE
                  ? station.status
                  : status
              }
              width={extraPadding ? 'wide' : 'default'}
            />
          </Row>
        ))}
    </Column>
  )
}
