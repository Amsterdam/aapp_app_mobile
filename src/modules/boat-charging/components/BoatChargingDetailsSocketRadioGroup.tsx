import {useFormContext} from 'react-hook-form'
import {RadioGroupControlled} from '@/components/ui/forms/RadioGroupControlled'
import {Column} from '@/components/ui/layout/Column'
import {BoatChargingSocketRadioLabel} from '@/modules/boat-charging/components/BoatChargingSocketRadioLabel'
import {
  ChargingPointStatus,
  type BoatChargingSelectSocketFormValues,
  type ChargingStation,
} from '@/modules/boat-charging/types'
import {useAvailableAndAllEvses} from '@/modules/boat-charging/utils/getAvailableAndAllEvses'

type Props = {
  chargingStations: ChargingStation[]
  hasActiveSession: boolean
}

export const BoatChargingDetailsSocketRadioGroup = ({
  hasActiveSession,
  chargingStations = [],
}: Props) => {
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
          options={evses.map(({station, name, evse_id, status}) => {
            const disabled =
              hasActiveSession ||
              station.status !== ChargingPointStatus.OPERATIVE ||
              status !== ChargingPointStatus.OPERATIVE

            return {
              label: (
                <BoatChargingSocketRadioLabel
                  disabled={disabled}
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
              disabled,
            }
          })}
          testID="BoatChargingDetailsChooseSocketRadioGroup"
        />
      )}
    </Column>
  )
}
