import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import type {ManageVisitorIncreaseTimeBalanceFormValues} from '@/modules/parking/providers/ManageVisitorIncreaseTimeBalanceFormProvider'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

type Props = {
  isNegative?: boolean
}

export const ManageVisitorChooseTimeAddOn = ({isNegative}: Props) => {
  const operator = isNegative ? '-' : '+'

  return (
    <SelectButtonControlled<ManageVisitorIncreaseTimeBalanceFormValues, 'time'>
      icon={{name: 'clock', size: 'lgx'}}
      name="time"
      rules={{
        required: 'Kies een tijdsduur',
      }}
      testID="ManageVisitorChooseTimeAddOnButton"
      text={time =>
        time
          ? `${operator} ` +
            formatTimeDurationToDisplay(time, 'seconds', {format: 'short'})
          : undefined
      }
      title={time => (time ? 'Tijdsduur' : 'Kies tijdsduur')}
    />
  )
}
