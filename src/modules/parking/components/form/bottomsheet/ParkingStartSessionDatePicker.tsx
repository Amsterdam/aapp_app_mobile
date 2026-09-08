import type {Dayjs} from '@/utils/datetime/dayjs'
import {DatePicker} from '@/components/ui/forms/DatePicker'
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
    maximumDate={maxDate?.toDate()}
    minimumDate={
      mode === 'time'
        ? roundDownToMinutes(minDate).toDate()
        : minDate.startOf('day').toDate()
    }
    mode={mode}
    onChange={newDate => {
      if (newDate.isBefore(minDate)) {
        onChange(minDate)

        return
      }

      onChange(newDate)
    }}
    theme="light"
  />
)
