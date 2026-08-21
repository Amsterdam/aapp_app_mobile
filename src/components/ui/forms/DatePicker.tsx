import {useCallback, type ComponentProps} from 'react'
import {StyleSheet} from 'react-native'
// eslint-disable-next-line no-restricted-imports
import DatePickerRN from 'react-native-date-picker'
import {useTimeDifference} from '@/hooks/useTimeDifference'
import {dayjsTimeZoneAware, type Dayjs} from '@/utils/datetime/dayjs'

type DatePickerProps = Omit<
  ComponentProps<typeof DatePickerRN>,
  'is24hourSource' | 'locale' | 'timeZoneOffsetInMinutes' | 'onDateChange'
> & {onChange: (date: Dayjs) => void}

export const DatePicker = ({onChange, ...props}: DatePickerProps) => {
  const {serverUtcOffset} = useTimeDifference(undefined, 0)

  const onDateChange = useCallback(
    (date: Date) => {
      if (!serverUtcOffset) {
        return onChange(dayjsTimeZoneAware(date))
      }

      return onChange(dayjsTimeZoneAware(date).utcOffset(serverUtcOffset / 60))
    },
    [serverUtcOffset, onChange],
  )

  return (
    <DatePickerRN
      {...props}
      is24hourSource="locale"
      locale="nl-NL"
      onDateChange={onDateChange}
      style={[styles.centerSelf, props.style]}
      theme={props.theme || 'light'}
      timeZoneOffsetInMinutes={serverUtcOffset}
    />
  )
}

const styles = StyleSheet.create({
  centerSelf: {
    alignSelf: 'center',
  },
})
