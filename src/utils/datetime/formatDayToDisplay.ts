import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {isToday} from '@/utils/datetime/isToday'
import {isYesterday} from '@/utils/datetime/isYesterday'
import {capitalizeString} from '@/utils/transform/capitalizeString'

export const formatDayToDisplay = (
  date: string | Dayjs,
  showTodayOrYesterdayAsDate = true,
) => {
  if (!date) {
    return ''
  }

  const dateIsToday = isToday(date)
  const dateIsYesterday = isYesterday(date)

  if (!showTodayOrYesterdayAsDate && (dateIsToday || dateIsYesterday)) {
    return dateIsToday ? 'Vandaag' : 'Gisteren'
  }

  return `${capitalizeString(dayjs(date).format('dddd'))}, ${formatDateToDisplay(date)}`
}
