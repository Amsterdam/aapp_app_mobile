import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

type Props = {
  isNegative?: boolean
}

export const ManageVisitorChooseTimeAddOn = ({isNegative}: Props) => {
  const operator = isNegative ? '-' : '+'

  return (
    <SelectButtonControlled<{time?: number}, 'time'>
      icon={{name: 'clock'}}
      name="time"
      rules={{
        required: 'Kies een tijdsduur',
      }}
      testID="ManageVisitorChooseTimeAddOnButton"
      text={time =>
        time
          ? `${operator} ` +
            formatTimeDurationToDisplay(time, 'seconds', {short: true})
          : undefined
      }
      title={time => (time ? 'Tijdsduur' : 'Kies tijdsduur')}
    />
  )
}
