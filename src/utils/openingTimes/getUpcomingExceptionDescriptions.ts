import {CityOffice} from '@/modules/contact/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const getUpcomingExceptionDescriptions = (
  visitingHoursExceptions: CityOffice['visitingHours']['exceptions'],
) => {
  const today = dayjs().startOf('day')
  const in7Days = today.add(7, 'day')

  return (visitingHoursExceptions || [])
    .filter(e => {
      const d = dayjs(e.date)

      return (
        d.isAfter(today) && (d.isBefore(in7Days) || d.isSame(in7Days, 'day'))
      )
    })
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
    .map(e => e.description || '')
}
