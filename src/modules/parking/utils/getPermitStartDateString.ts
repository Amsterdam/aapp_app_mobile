import type {ParkingPermit} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {isToday} from '@/utils/datetime/isToday'

export const getPermitStartDateString = (
  started_at: ParkingPermit['started_at'],
) => {
  if (!started_at) return

  const permitStartDate = dayjs(started_at)
  const today = isToday(permitStartDate)

  const dateString = today
    ? permitStartDate.format('HH:mm')
    : `${permitStartDate.format('D MMMM YYYY')} om ${permitStartDate.format('HH:mm')}`

  return `U kunt een parkeersessie starten vanaf ${dateString} uur.`
}
