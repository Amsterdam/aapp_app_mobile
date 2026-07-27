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

  if (!showTodayOrYesterdayAsDate && (isToday(date) || isYesterday(date))) {
    return isToday(date) ? 'Vandaag' : 'Gisteren'
  }

  return `${capitalizeString(dayjs(date).format('dddd'))}, ${formatDateToDisplay(date)}`
}
