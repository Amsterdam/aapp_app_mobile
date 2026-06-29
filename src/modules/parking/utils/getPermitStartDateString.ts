import type {ParkingPermit} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

export const BASE_STRING = 'U kunt een parkeersessie starten vanaf'

export const getPermitStartDateString = (
  started_at: ParkingPermit['started_at'],
) => {
  if (!started_at || !dayjs(started_at).isValid()) return ''

  return `${BASE_STRING} ${formatDateTimeToDisplay(started_at, false).toLowerCase()}.`
}
