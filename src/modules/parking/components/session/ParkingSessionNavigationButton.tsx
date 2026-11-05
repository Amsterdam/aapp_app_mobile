import {useMemo} from 'react'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useLicensePlate} from '@/modules/parking/hooks/useLicensePlate'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  type ParkingSession,
  type VisitorParkingSession,
} from '@/modules/parking/types'
import {getParkingSessionDurationDescription} from '@/modules/parking/utils/getParkingSessionDurationDescription'
import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

type Props = {
  parkingSession: ParkingSession | VisitorParkingSession
  withIcon?: boolean
}

export const ParkingSessionNavigationButton = ({
  parkingSession,
  withIcon = true,
}: Props) => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()

  const {licensePlateString} = useLicensePlate(
    parkingSession.vehicle_id,
    parkingSession.visitor_name,
  )
  const accessibilityLabel = useMemo(
    () =>
      getAccessibilityLabel(
        parkingSession,
        licensePlateString,
        currentPermit.max_session_length_in_days,
        currentPermit.no_endtime,
      ),
    [
      parkingSession,
      licensePlateString,
      currentPermit.max_session_length_in_days,
      currentPermit.no_endtime,
    ],
  )
  const description = useMemo(
    () =>
      getParkingSessionDurationDescription(
        parkingSession,
        currentPermit.max_session_length_in_days,
        currentPermit.no_endtime,
      ),
    [
      parkingSession,
      currentPermit.max_session_length_in_days,
      currentPermit.no_endtime,
    ],
  )

  return (
    <NavigationButton
      accessibilityLabel={accessibilityLabel}
      chevronColor="secondary"
      chevronSize="ml"
      description={description}
      icon={withIcon ? {name: 'car'} : undefined}
      insetHorizontal="no"
      insetVertical="no"
      isDescriptionBelowIcon={false}
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
  )
  const startDateTimeString = formatDateTimeToDisplay(start_date_time)
  const timeLabel = `Starttijd ${startDateTimeString} ${noEndTime || maxSessionLengthInDays > 1 ? startDateTimeString : 'Parkeertijd ' + remainingTimeStringLong}`

  return `Kenteken ${title}. ${timeLabel}`
}
