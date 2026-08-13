import {useFormContext} from 'react-hook-form'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {BoatChargingSocketRadioLabel} from '@/modules/boat-charging/components/BoatChargingSocketRadioLabel'
import {useAvailableAndAllEvses} from '@/modules/boat-charging/hooks/useAvailableAndAllEvses'
import {
  ChargingPointStatus,
  type BoatChargingSelectSocketFormValues,
  type ChargingStation,
} from '@/modules/boat-charging/types'

export const BoatChargingDetailsSocketRadioGroup = ({
  hasActiveSession,
  chargingStations = [],
}: {
  chargingStations: ChargingStation[]
  hasActiveSession: boolean
}) => {
  const form = useFormContext<BoatChargingSelectSocketFormValues>()

  const {availableEvses, evses} = useAvailableAndAllEvses(chargingStations)

  const selectableEvses = hasActiveSession ? [] : availableEvses

  return (
    <Column gutter="md">
      {!!evses.length && (
        <RadioGroupControlled
          {...form}
          disabledStyle={!selectableEvses.length ? 'none' : 'hidden'}
          name="selectedSocket"
          options={evses.map(({station, name, evse_id, status}) => ({
            label: (
              <BoatChargingSocketRadioLabel
                name={name}
                status={
                  status === ChargingPointStatus.OPERATIVE
                    ? station.status
                    : status
                }
              />
            ),
            value: {
              stationId: station.id,
              socketNumber: evse_id,
            },
            disabled:
              hasActiveSession ||
              station.status !== ChargingPointStatus.OPERATIVE ||
              status !== ChargingPointStatus.OPERATIVE,
          }))}
          testID="BoatChargingDetailsChooseSocketRadioGroup"
        />
      )}
    </Column>
  )
}
