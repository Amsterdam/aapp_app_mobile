import {type Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {weekDays} from '@/utils/datetime/weekDays'

export const formatHistoryDateTime = (date: string | number | Dayjs) => {
  if (!date) {
    return ''
  }

  const moment = dayjs(date)
  const today = dayjs()
  const dayDifference = moment.startOf('day').diff(today.startOf('day'), 'days')
  const isToday = dayDifference === 0
  const isYesterday = dayDifference === -1
  const isLastSixDays = dayDifference > -7 && dayDifference < -1

  if (isToday) {
    return `${moment.format('HH.mm')} uur`
  } else if (isYesterday) {
    return 'gisteren'
  } else if (isLastSixDays) {
    return weekDays[moment.get('day')]
  } else {
    return moment.format('D MMMM')
  }
}
