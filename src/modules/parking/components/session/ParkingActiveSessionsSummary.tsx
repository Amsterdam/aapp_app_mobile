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
import {useBoolean} from '@/hooks/useBoolean'
import {useInterval} from '@/hooks/useInterval'
import {useRefetchTimeout} from '@/hooks/useRefetchTimeout'
import {ParkingSessionNavigationButton} from '@/modules/parking/components/session/ParkingSessionNavigationButton'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {ParkingRouteName} from '@/modules/parking/routes'
import {parkingApi} from '@/modules/parking/service'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope, ParkingSessionStatus} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const ParkingActiveSessionsSummary = () => {
  const {navigate} = useNavigation()
  const {
    parkingSessions: activeParkingSessions,
    isLoading,
    isError,
    refetch,
  } = useGetParkingSessions(ParkingSessionStatus.active)
  const parkingAccount = useParkingAccount()
  // refetch sessions when there are sessions returned without a ps_right_id, because somehow, directly after making them it can occur that they do not have them
  const {value: isRefetched, enable: setRefetched} = useBoolean(false)

  useEffect(() => {
    if (parkingAccount?.scope === ParkingPermitScope.visitor) {
      return
    }

    if (
      !isRefetched &&
      activeParkingSessions?.some(session => !session.ps_right_id)
    ) {
      void refetch()
      setRefetched()
    }
  }, [
    activeParkingSessions,
    isRefetched,
    parkingAccount?.scope,
    refetch,
    setRefetched,
  ])

  // refetch sessions every 5 seconds if there are sessions that are not yet paid, it can take a bit before the payment is processed
  useInterval(
    refetch,
    activeParkingSessions?.some(
      session => 'is_paid' in session && !session.is_paid,
    )
      ? 5000
      : 0,
  )

  const firstEndDateTime = activeParkingSessions?.length
    ? activeParkingSessions.reduce((min, session) => {
        const candidateDateTime = dayjs(session.end_date_time)

        return candidateDateTime.isAfter(min) ? min : candidateDateTime
      }, dayjs(activeParkingSessions[0].end_date_time))
    : undefined

  const dispatch = useDispatch()

  useRefetchTimeout(
    () => {
      dispatch(parkingApi.util.invalidateTags(['ParkingSessions']))
    },
    activeParkingSessions?.length
      ? Math.max(
          firstEndDateTime?.endOf('minute').diff(dayjs(), 'milliseconds') ?? 0,
          30000,
        )
      : 0,
  )

  if (isLoading) {
    return <PleaseWait testID="ParkingPermitSessionsActivePleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="ParkingActiveSessionsSummarySomethingWentWrong" />
    )
  }

  if (!activeParkingSessions || activeParkingSessions.length <= 5) {
    return (
      <Column gutter="sm">
        <Title
          level="h5"
          testID="ParkingPermitSessionsActiveTitle"
          text="Nu actief"
        />
        {activeParkingSessions?.length ? (
          activeParkingSessions.map(session => (
            <ParkingSessionNavigationButton
              key={session.ps_right_id ?? session.vehicle_id}
              parkingSession={session}
            />
          ))
        ) : (
          <Phrase testID="ParkingPermitSessionsActiveNotActivePhrase">
            Er zijn geen actieve parkeersessies.
          </Phrase>
        )}
      </Column>
    )
  }

  return (
    <Pressable
      accessibilityLabel={`${activeParkingSessions.length} actieve parkeersessies`}
      onPress={() => navigate(ParkingRouteName.parkingActiveSessions)}
      testID="ParkingPermitSessionsActiveBadgeButton">
      <Row gutter="sm">
        <Title
          accessible={false}
          color="link"
          level="h5"
          testID="ParkingPermitSessionsActiveTitle"
          text="Actief"
        />
        <Badge
          accessible={false}
          color="info"
          testID="ParkingPermitSessionsActiveBadge"
          value={activeParkingSessions.length}
        />
      </Row>
    </Pressable>
  )
}
