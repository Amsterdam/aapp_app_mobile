// eslint-disable-next-line no-restricted-imports
import DateTimePicker, {
  type DateTimePickerChangeEvent,
} from '@expo/ui/community/datetime-picker'
import {useCallback, useState, type ComponentProps} from 'react'
import {Platform} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {useTimeDifference} from '@/hooks/useTimeDifference'
import {devLog} from '@/processes/development'
import {
  dayjsTimeZoneAware,
  DEFAULT_TIMEZONE,
  type Dayjs,
} from '@/utils/datetime/dayjs'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type DatePickerProps = Omit<
  ComponentProps<typeof DateTimePicker>,
  | 'is24Hour'
  | 'locale'
  | 'onChange'
  | 'onValueChange'
  | 'presentation'
  | 'themeVariant'
  | 'value'
> & {
  date: Date
  onChange: (date: Dayjs) => void
  theme?: 'light' | 'dark' | 'auto'
}

const shiftDateForPicker = (date: Date, utcOffsetInMinutes?: number) => {
  if (utcOffsetInMinutes == null) {
    return date
  }

  const deviceUtcOffsetInMinutes = -date.getTimezoneOffset()
  const offsetDifferenceInMinutes =
    utcOffsetInMinutes - deviceUtcOffsetInMinutes

  if (offsetDifferenceInMinutes === 0) {
    return date
  }

  return new Date(date.getTime() - offsetDifferenceInMinutes * 60_000)
}

const shiftDateFromPicker = (date: Date, utcOffsetInMinutes?: number) => {
  if (utcOffsetInMinutes == null) {
    return date
  }

  const deviceUtcOffsetInMinutes = -date.getTimezoneOffset()
  const offsetDifferenceInMinutes =
    utcOffsetInMinutes - deviceUtcOffsetInMinutes

  if (offsetDifferenceInMinutes === 0) {
    return date
  }

  return new Date(date.getTime() + offsetDifferenceInMinutes * 60_000)
}

export const DatePicker = ({onChange, ...props}: DatePickerProps) => {
  const {serverUtcOffset} = useTimeDifference(undefined, 0)
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios')

  const {minimumDate, maximumDate} = props

  const onValueChange = useCallback(
    (_event: DateTimePickerChangeEvent, date: Date) => {
      const normalizedDate = shiftDateFromPicker(date, serverUtcOffset)
      const dayJsNormalizedDate = dayjsTimeZoneAware(normalizedDate)
      const isBeyondMaxDate =
        maximumDate && dayJsNormalizedDate.isAfter(maximumDate)
      const isBeforeMinDate =
        minimumDate && dayJsNormalizedDate.isBefore(minimumDate)

      if (isBeyondMaxDate || isBeforeMinDate) {
        devLog('[ANDROID]: Invalid time selected', {
          minimumDate,
          maximumDate,
          normalizedDate,
        })

        return
      }

      setShowPicker(Platform.OS === 'ios')

      if (!serverUtcOffset) {
        return onChange(dayjsTimeZoneAware(normalizedDate))
      }

      return onChange(
        dayjsTimeZoneAware(normalizedDate).utcOffset(serverUtcOffset / 60),
      )
    },
    [serverUtcOffset, onChange, minimumDate, maximumDate],
  )

  return (
    <>
      {showPicker ? (
        <DateTimePicker
          {...props}
          display="spinner"
          is24Hour
          locale="nl-NL"
          onDismiss={() => setShowPicker(false)}
          onValueChange={onValueChange}
          themeVariant={props.theme === 'auto' ? undefined : props.theme}
          timeZoneName={DEFAULT_TIMEZONE}
          value={shiftDateForPicker(props.date, serverUtcOffset)}
        />
      ) : (
        <Box insetVertical="md">
          <Button
            label={formatTimeToDisplay(
              dayjsTimeZoneAware(
                shiftDateFromPicker(props.date, serverUtcOffset),
              ),
              {includeHoursLabel: true, hoursLabelShort: false},
            )}
            onPress={() => setShowPicker(true)}
            testID="DateTimePickerButton"
            variant="secondary"
          />
        </Box>
      )}
    </>
  )
}
