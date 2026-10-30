import {EmptyList} from '@/components/features/EmptyList'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {BoatChargingActiveSessionsListItem} from '@/modules/boat-charging/components/BoatChargingActiveSessionsListItem'
import {useBoatChargingSessions} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {BoatChargingSessionProvider} from '@/modules/boat-charging/providers/BoatChargingSession.provider'

export const BoatChargingActiveSessionsList = () => {
  const {activeSessions, isLoading, isError} = useBoatChargingSessions()

  if (isLoading) {
    return <PleaseWait testID="BoatChargingActiveSessionsPleaseWait" />
  }

  if (isError && !activeSessions?.length) {
    return (
      <SomethingWentWrong testID="BoatChargingActiveSessionsSomethingWentWrong" />
    )
  }

  if (!activeSessions?.length) {
    return (
      <EmptyList
        testID="BoatChargingActiveSessionsEmptyList"
        title="Geen actieve laadsessies"
      />
    )
  }

  return activeSessions.map(session => (
    <BoatChargingSessionProvider
      id={session.id}
      key={session.id}>
      <BoatChargingActiveSessionsListItem session={session} />
    </BoatChargingSessionProvider>
  ))
}
