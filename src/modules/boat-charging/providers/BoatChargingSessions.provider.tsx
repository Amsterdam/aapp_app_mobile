import {useMemo, type ReactNode} from 'react'
import {BoatChargingSessionsContext} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {useGuestSessions} from '@/modules/boat-charging/hooks/useGuestSessions'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useBoatChargingSessionsInfiniteQuery} from '@/modules/boat-charging/service'
import {getActiveSessions} from '@/modules/boat-charging/utils/getActiveSessions'

type Props = {
  children: ReactNode
}

const POLLING_INTERVAL = 30000

export const BoatChargingSessionsProvider = ({children}: Props) => {
  const {isLoggedIn} = useIsLoggedIn()

  const {
    sessions: guestSessions,
    isLoading: isLoadingGuestSessions,
    isError: isErrorGuestSessions,
  } = useGuestSessions(isLoggedIn)

  const {
    data,
    isLoading: isLoadingLoggedInSessions,
    isError: isErrorLoggedInSessions,
  } = useBoatChargingSessionsInfiniteQuery(
    {},
    {
      skip: !isLoggedIn,
      pollingInterval: isLoggedIn ? POLLING_INTERVAL : 0,
      initialPageParam: 1,
    },
  )

  const loggedInSessions = useMemo(
    () => getActiveSessions(data?.pages[0].result) || [],
    [data?.pages],
  )

  const value = useMemo(
    () => ({
      activeSessions: isLoggedIn ? loggedInSessions : guestSessions,
      isLoading: isLoggedIn
        ? isLoadingLoggedInSessions
        : isLoadingGuestSessions,
      isError: isLoggedIn ? isErrorLoggedInSessions : isErrorGuestSessions,
    }),
    [
      guestSessions,
      isErrorGuestSessions,
      isErrorLoggedInSessions,
      isLoadingGuestSessions,
      isLoadingLoggedInSessions,
      isLoggedIn,
      loggedInSessions,
    ],
  )

  return (
    <BoatChargingSessionsContext value={value}>
      {children}
    </BoatChargingSessionsContext>
  )
}
