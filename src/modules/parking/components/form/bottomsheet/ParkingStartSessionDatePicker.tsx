import {StyleSheet} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'
import {roundDownToMinutes} from '@/utils/datetime/roundDownToMinutes'

type Props = {
  date: Dayjs
  maxDate?: Dayjs
  minDate: Dayjs
  mode: 'date' | 'time' | 'datetime'
  onChange: (date: Dayjs) => void
}

export const ParkingStartSessionDatePicker = ({
  maxDate,
  minDate,
  date,
  onChange,
  mode,
}: Props) => (
  <DatePicker
    date={date.toDate()}
    is24hourSource="locale"
    locale="nl-NL"
    maximumDate={maxDate?.toDate()}
    minimumDate={roundDownToMinutes(minDate).toDate()}
    mode={mode}
    onDateChange={newDate => onChange(dayjs(newDate))}
    style={styles.centerSelf}
    theme="light"
  />
)

const styles = StyleSheet.create({
  centerSelf: {
    alignSelf: 'center',
  },
})
