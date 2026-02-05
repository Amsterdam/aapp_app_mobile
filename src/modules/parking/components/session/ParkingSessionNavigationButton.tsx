import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useLicensePlateString} from '@/modules/parking/hooks/useLicensePlateString'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  type ParkingSession,
  type VisitorParkingSession,
  type ParkingHistorySession,
  ParkingSessionStatus,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

const DATE_FORMAT = 'D MMMM, HH.mm'

type Props = {
  parkingSession: ParkingSession | VisitorParkingSession | ParkingHistorySession
}

export const ParkingSessionNavigationButton = ({parkingSession}: Props) => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()

  const licensePlateString = useLicensePlateString(
    parkingSession.vehicle_id,
    parkingSession.visitor_name,
  )

  return (
    <NavigationButton
      accessibilityLabel={getAccessibilityLabel(
        parkingSession,
        licensePlateString,
        currentPermit.max_session_length_in_days,
        currentPermit.no_endtime,
      )}
      description={getDescription(
        parkingSession,
        currentPermit.max_session_length_in_days,
        currentPermit.no_endtime,
      )}
      icon={{name: 'car'}}
      insetHorizontal="no"
      insetVertical="no"
      onPress={() => {
        navigate(ParkingRouteName.parkingSession, {parkingSession})
      }}
      testID="ParkingSessionNavigationButton"
      title={licensePlateString}
    />
  )
}

const getAccessibilityLabel = (
  parkingSession: Props['parkingSession'],
  title: string,
  maxSessionLengthInDays: number,
  noEndTime: boolean,
) => {
  const {start_date_time, end_date_time} = parkingSession

  const remainingTimeStringLong = formatTimeRangeToDisplay(
    start_date_time,
    end_date_time,
    {short: false},
  )
  const startTimeString = `${dayjs(start_date_time).format('HH.mm')} uur`
  const startDateTimeString = `${dayjs(start_date_time).format(DATE_FORMAT)} uur`
  const timeLabel = `Starttijd ${startTimeString} ${noEndTime || maxSessionLengthInDays > 1 ? startDateTimeString : 'Parkeertijd ' + remainingTimeStringLong}`

  return `Kenteken ${title}. ${timeLabel}`
}

const getDescription = (
  parkingSession: Props['parkingSession'],
  maxSessionLengthInDays: number,
  noEndTime: boolean,
) => {
  const {start_date_time, end_date_time, status} = parkingSession

  if (status === ParkingSessionStatus.active) {
    const isEndDateToday = dayjs(end_date_time).isSame(dayjs(), 'day')

    return noEndTime
      ? `Actief sinds ${dayjs(start_date_time).format(isEndDateToday ? 'HH.mm' : DATE_FORMAT)} uur`
      : `Tot ${dayjs(end_date_time).format(isEndDateToday ? 'HH.mm' : DATE_FORMAT)} uur`
  }

  const startDateTimeString = `${dayjs(start_date_time).format(DATE_FORMAT)} uur`
  const startTimeString = `${dayjs(start_date_time).format('HH.mm')} uur`
  const isEndDateSameAsStart = dayjs(end_date_time).isSame(
    dayjs(start_date_time),
    'day',
  )
  const endTimeString = `${dayjs(end_date_time).format(isEndDateSameAsStart ? 'HH.mm' : DATE_FORMAT)} uur`

  return noEndTime || maxSessionLengthInDays > 1
    ? `${startDateTimeString}`
    : `Van ${startTimeString} tot ${endTimeString}`
}
