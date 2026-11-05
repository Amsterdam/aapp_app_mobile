import {
  ParkingSessionStatus,
  type ParkingSession,
  type VisitorParkingSession,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'
import {isToday} from '@/utils/datetime/isToday'
import {isTomorrow} from '@/utils/datetime/isTomorrow'

const formatActiveDateTime = (date: string) =>
  isToday(date)
    ? formatTimeToDisplay(date, {includeHoursLabel: true})
    : formatDateTimeToDisplay(date)

export const getParkingSessionDurationDescription = (
  parkingSession: ParkingSession | VisitorParkingSession,
  maxSessionLengthInDays: number,
  noEndTime: boolean,
) => {
  const {start_date_time, end_date_time, status} = parkingSession

  if (status === ParkingSessionStatus.active) {
    return noEndTime
      ? `Actief sinds ${formatActiveDateTime(start_date_time)}`
      : `Tot ${formatActiveDateTime(end_date_time)}`
  }

  if (noEndTime || maxSessionLengthInDays > 1) {
    return formatDateTimeToDisplay(start_date_time)
  }

  if (!dayjs(start_date_time).isSame(dayjs(end_date_time), 'day')) {
    return `${formatDateTimeToDisplay(start_date_time, false)} tot ${formatDateTimeToDisplay(end_date_time, false).toLowerCase()}`
  }

  const dateLabel = isToday(start_date_time)
    ? 'Van'
    : isTomorrow(start_date_time)
      ? 'Morgen'
      : `${formatDateToDisplay(start_date_time, {yesterdayAsDate: false})}`

  return `${dateLabel} ${formatTimeToDisplay(start_date_time)} tot ${formatTimeToDisplay(end_date_time, {includeHoursLabel: true})}`
}
