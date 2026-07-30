import {cutAmountOfCharsFromString} from '@/utils/cutAmountOfCharsFromString'
import {dayjs, Dayjs} from '@/utils/datetime/dayjs'
import {formatDate} from '@/utils/datetime/formatDate'
import {isThisYear} from '@/utils/datetime/isThisYear'
import {isToday} from '@/utils/datetime/isToday'
import {isYesterday} from '@/utils/datetime/isYesterday'
import {capitalizeString} from '@/utils/transform/capitalizeString'

export const formatDateToDisplay = (
  date: string | Dayjs,
  {todayAsDate = true, yesterdayAsDate = true, showDayOfWeek = false} = {},
) => {
  const dateToDisplay = formatDate(date)

  if (!todayAsDate && isToday(date)) {
    return 'Vandaag'
  }

  if (!yesterdayAsDate && isYesterday(date)) {
    return 'Gisteren'
  }

  const dayMonthYear = isThisYear(date)
    ? cutAmountOfCharsFromString({
        text: dateToDisplay,
        amount: 5,
        position: 'end',
      })
    : dateToDisplay

  if (showDayOfWeek) {
    const dayOfWeek = capitalizeString(dayjs(date).format('dddd'))

    return `${dayOfWeek}, ${dayMonthYear}`
  }

  return dayMonthYear
}
