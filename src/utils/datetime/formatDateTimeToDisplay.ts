import {isDayjs} from 'dayjs'
import {cutAmountOfCharsFromString} from '@/utils/cutAmountOfCharsFromString'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {formatDate} from '@/utils/datetime/formatDate'
import {isThisYear} from '@/utils/datetime/isThisYear'

export const formatDateTimeToDisplay = (
  date: string | Dayjs,
  showTodayAsDate = true,
  serverTimeDate?: Dayjs,
) => {
  if (!date) {
    return ''
  }

  const dayjsDate = isDayjs(date) ? date : dayjs(date)
  const dateToDisplay = formatDate(date)

  const time = `${dayjsDate.format('HH.mm')} uur`

  if (!showTodayAsDate && dayjsDate.isSame(serverTimeDate, 'day')) {
    return `Vandaag, ${time}`
  }

  return `${
    isThisYear(date)
      ? cutAmountOfCharsFromString({
          text: dateToDisplay,
          amount: 5,
          position: 'end',
        })
      : dateToDisplay
  }, ${time}`
}
