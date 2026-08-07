import {useMemo, type ReactNode} from 'react'
import {BoatChargingSessionsContext} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useBoatChargingSessionsInfiniteQuery} from '@/modules/boat-charging/service'
import {getActiveSessions} from '@/modules/boat-charging/utils/getActiveSessions'

type Props = {
  children: ReactNode
  shouldPollSessions?: boolean
}

export const BoatChargingSessionsProvider = ({
  children,
  shouldPollSessions = true,
}: Props) => {
  const {isLoggedIn} = useIsLoggedIn()

  const {data, isLoading, isError} = useBoatChargingSessionsInfiniteQuery(
    {},
    {
      skip: !isLoggedIn,
      pollingInterval: shouldPollSessions && isLoggedIn ? 30000 : 0,
      initialPageParam: 1,
    },
  )

  const activeSessions = getActiveSessions(data?.pages[0].result)

  const value = useMemo(
    () => ({
      activeSessions,
      isLoading,
      isError,
    }),
    [activeSessions, isLoading, isError],
  )

  return (
    <BoatChargingSessionsContext value={value}>
      {children}
    </BoatChargingSessionsContext>
  )
}
