import {useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {BoatChargingSocketRadioLabel} from '@/modules/boat-charging/components/BoatChargingSocketRadioLabel'
import {
  ChargingPointStatus,
  type ChargingStation,
} from '@/modules/boat-charging/types'
import {sizeTokens} from '@/themes/tokens/size'

const EMPTY_RADIO_PLACEHOLDER_SIZE = sizeTokens.spacing.sm + 24 // Radio SVG width is 24, plus sm gutter added by Row in Radio component.

export const BoatChargingDetailsSocketRadioGroup = ({
  chargingStations = [],
}: {
  chargingStations: ChargingStation[]
}) => {
  const form = useFormContext<{socket: string}>()

  const [availableSockets, otherSockets] = useMemo(
    () =>
      //TODO: Should not return any available socket if user has an active session.
      [
        chargingStations.filter(
          station => station.status === ChargingPointStatus.OPERATIVE,
        ),
        chargingStations.filter(
          station => station.status !== ChargingPointStatus.OPERATIVE,
        ),
      ],
    [chargingStations],
  )

  const extraPadding = otherSockets.some(
    ({status}) => status === ChargingPointStatus.UNKNOWN,
  )

  return (
    <Column gutter="md">
      {!!availableSockets.length && (
        <RadioGroupControlled
          {...form}
          name="socket"
          options={availableSockets.map(socket => ({
            label: (
              <BoatChargingSocketRadioLabel
                id={socket.id}
                status={ChargingPointStatus.OPERATIVE}
                width={extraPadding ? 'wide' : 'default'}
              />
            ),
            value: socket.id,
          }))}
          testID="BoatChargingDetailsChooseSocketRadioGroup"
        />
      )}
      {!!otherSockets.length &&
        otherSockets.map(socket => (
          <Row key={socket.id}>
            {!!availableSockets.length && (
              <Size width={EMPTY_RADIO_PLACEHOLDER_SIZE} />
            )}
            <BoatChargingSocketRadioLabel
              {...socket}
              width={extraPadding ? 'wide' : 'default'}
            />
          </Row>
        ))}
    </Column>
  )
}
