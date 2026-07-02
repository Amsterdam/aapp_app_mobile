import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useBoatChargingSessionsQuery} from '@/modules/boat-charging/service'

export const useBoatChargingSessions = () => {
  const {isLoggedIn} = useIsLoggedIn()

  const {data, isLoading, isError} = useBoatChargingSessionsQuery(undefined, {
    skip: !isLoggedIn,
  })

  return {sessions: data || [], isLoading, isError}
}
