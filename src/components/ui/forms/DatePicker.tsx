/* eslint-disable no-restricted-imports */
import DateTimePicker from '@expo/ui/community/datetime-picker'
// import {
//   Host,
//   TimePickerDialog as TimePickerAndroid,
//   DatePickerDialog as DatePickerAndroid,
// } from '@expo/ui/jetpack-compose'
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'
import {useCallback, type ComponentProps} from 'react'
// import {Platform} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {useTimeDifference} from '@/hooks/useTimeDifference'
// import {devLog} from '@/processes/development'
import {
  // dayjsTimeZoneAware,
  // DEFAULT_TIMEZONE,
  type Dayjs,
} from '@/utils/datetime/dayjs'
// import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

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

// const shiftDateFromPicker = (date: Date, utcOffsetInMinutes?: number) => {
//   if (utcOffsetInMinutes == null) {
//     return date
//   }

//   const deviceUtcOffsetInMinutes = -date.getTimezoneOffset()
//   const offsetDifferenceInMinutes =
//     utcOffsetInMinutes - deviceUtcOffsetInMinutes

//   if (offsetDifferenceInMinutes === 0) {
//     return date
//   }

//   return new Date(date.getTime() + offsetDifferenceInMinutes * 60_000)
// }

export const DatePicker = ({...props}: DatePickerProps) => {
  const {serverUtcOffset} = useTimeDifference(undefined, 0)
  // const [showTimePicker, setShowTimePicker] = useState(Platform.OS === 'ios')
  // const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

  // const {minimumDate, maximumDate} = props

  const openTimeDialog = useCallback(() => {
    DateTimePickerAndroid.open({
      mode: 'time',
      display: 'spinner',
      value: shiftDateForPicker(props.date, serverUtcOffset),
    })
  }, [props, serverUtcOffset])

  const openDateDialog = useCallback(() => {
    DateTimePickerAndroid.open({
      mode: 'date',
      display: 'spinner',
      value: shiftDateForPicker(props.date, serverUtcOffset),
    })
  }, [props, serverUtcOffset])

  // const onValueChange = useCallback(
  //   (date: Date) => {
  //     const normalizedDate = shiftDateFromPicker(date, serverUtcOffset)
  //     const dayJsNormalizedDate = dayjsTimeZoneAware(normalizedDate)
  //     const isBeyondMaxDate =
  //       maximumDate && dayJsNormalizedDate.isAfter(maximumDate)
  //     const isBeforeMinDate =
  //       minimumDate && dayJsNormalizedDate.isBefore(minimumDate)

  //     if (isBeyondMaxDate || isBeforeMinDate) {
  //       devLog('[ANDROID]: Invalid time selected', {
  //         minimumDate,
  //         maximumDate,
  //         normalizedDate,
  //       })

  //       return
  //     }

  //     setShowTimePicker(Platform.OS === 'ios')

  //     if (!serverUtcOffset) {
  //       return onChange(dayjsTimeZoneAware(normalizedDate))
  //     }

  //     return onChange(
  //       dayjsTimeZoneAware(normalizedDate).utcOffset(serverUtcOffset / 60),
  //     )
  //   },
  //   [serverUtcOffset, onChange, minimumDate, maximumDate],
  // )

  return (
    <>
      {/* {!!showTimePicker && (
        <Host
          matchContents={{vertical: true}}
          style={{width: '100%'}}>
          <TimePickerAndroid
            is24Hour
            onDateSelected={date => {
              onValueChange(date)
            }}
            onDismissRequest={() => setShowTimePicker(false)}
            {...props}
          />
        </Host>
      )}
      {!!showDatePicker && (
        <Host
          matchContents={{vertical: true}}
          style={{width: '100%'}}>
          <DatePickerAndroid
            initialDate={shiftDateForPicker(
              props.date,
              serverUtcOffset,
            ).toDateString()}
            onDateSelected={date => {
              onValueChange(date)
            }}
            onDismissRequest={() => setShowDatePicker(false)}
            selectableDates={{start: minimumDate, end: maximumDate}}
            {...props}
          />
        </Host>
      )} */}
      <Box insetVertical="md">
        <Column gutter="sm">
          <Button
            label="Open expo/ui TimePickerDialog"
            // onPress={() => setShowTimePicker(true)}
            testID="DateTimePickerButton"
            variant="secondary"
          />
          <Button
            label="Open expo/ui DatePickerDialog"
            // onPress={() => setShowDatePicker(true)}
            testID="DateTimePickerButton"
            variant="secondary"
          />
          <Button
            label="Open @react-native-community/datetimepicker' TimePickerDialog"
            onPress={openTimeDialog}
            testID="DateTimePickerButton"
            variant="secondary"
          />
          <Button
            label="Open @react-native-community/datetimepicker' DatePickerDialog"
            onPress={openDateDialog}
            testID="DateTimePickerButton"
            variant="secondary"
          />
        </Column>
      </Box>
    </>
  )
}
