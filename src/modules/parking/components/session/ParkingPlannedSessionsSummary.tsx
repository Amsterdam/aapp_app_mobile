import {useEffect} from 'react'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Badge} from '@/components/ui/feedback/Badge'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useInterval} from '@/hooks/useInterval'
import {useRefetchTimeout} from '@/hooks/useRefetchTimeout'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingApi} from '@/modules/parking/service'
import {ParkingSessionStatus} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const ParkingPlannedSessionsSummary = () => {
  const {navigate} = useNavigation()
  const {
    parkingSessions: plannedParkingSessions,
    isLoading,
    isError,
    refetch,
  } = useGetParkingSessions(ParkingSessionStatus.planned)

  // refetch sessions when there are sessions returned without a ps_right_id, because somehow, directly after making them it can occur that they do not have them
  useEffect(() => {
    if (plannedParkingSessions?.some(session => !session.ps_right_id)) {
      void refetch()
    }
  }, [plannedParkingSessions, refetch])

  // refetch sessions every 15 seconds if there are sessions that are not yet paid, it can take a bit before the payment is processed
  useInterval(
    refetch,
    plannedParkingSessions?.some(
      session => 'is_paid' in session && !session.is_paid,
    )
      ? 15000
      : 0,
  )

  const firstStartDateTime = plannedParkingSessions?.length
    ? plannedParkingSessions.reduce((min, session) => {
        const candidateDateTime = dayjs(session.start_date_time)

        return candidateDateTime.isAfter(min) ? min : candidateDateTime
      }, dayjs(plannedParkingSessions[0].start_date_time))
    : undefined

  const dispatch = useDispatch()

  useRefetchTimeout(
    () => {
      dispatch(parkingApi.util.invalidateTags(['ParkingSessions']))
    },
    plannedParkingSessions?.length
      ? Math.max(
          firstStartDateTime?.endOf('minute').diff(dayjs(), 'milliseconds') ??
            0,
          30000,
        )
      : 0,
  )

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitSessionsPlannedPleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="ParkingPlannedSessionsSummarySomethingWentWrong" />
    )
  }

  if (!plannedParkingSessions?.length) {
    return (
      <Column gutter="sm">
        <Title
          level="h5"
          testID="ParkingPermitSessionsPlannedTitle"
          text="Gepland"
        />
        <Phrase testID="ParkingPermitSessionsPlannedNoPlannedPhrase">
          Er zijn geen geplande parkeersessies.
        </Phrase>
      </Column>
    )
  }

  return (
    <Pressable
      accessibilityLabel={`${plannedParkingSessions.length} geplande parkeersessies`}
      onPress={() => navigate(ParkingRouteName.parkingPlannedSessions)}
      testID="ParkingPermitSessionsPlannedBadgeButton">
      <Row gutter="sm">
        <Title
          color="link"
          level="h5"
          testID="ParkingPermitSessionsPlannedTitle"
          text="Gepland"
        />
        <Badge
          color="info"
          testID="ParkingPermitSessionsPlannedBadge"
          value={plannedParkingSessions.length}
        />
      </Row>
    </Pressable>
  )
}
