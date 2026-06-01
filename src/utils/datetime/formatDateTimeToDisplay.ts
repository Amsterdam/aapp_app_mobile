import {cutAmountOfCharsFromString} from '@/utils/cutAmountOfCharsFromString'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {formatDate} from '@/utils/datetime/formatDate'
import {isThisYear} from '@/utils/datetime/isThisYear'

export const formatDateTimeToDisplay = (
  date: string | Dayjs,
  todayAsDate = true,
  serverTimeDate?: string | Dayjs,
) => {
  const dateToDisplay = formatDate(date)

  const time = `${dayjs(date).format('HH.mm')} uur`

  if (!todayAsDate && dayjs(date).isSame(dayjs(serverTimeDate), 'day')) {
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
