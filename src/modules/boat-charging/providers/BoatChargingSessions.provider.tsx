import {useMemo, type ReactNode} from 'react'
import {useInterval} from '@/hooks/useInterval'
import {BoatChargingSessionsContext} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useBoatChargingSessionsQuery} from '@/modules/boat-charging/service'
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

  const {
    data,
    isLoading,
    isError,
    refetch: refetchSessions,
  } = useBoatChargingSessionsQuery(undefined, {
    skip: !isLoggedIn,
  })

  const activeSessions = getActiveSessions(data?.result)

  useInterval(
    () => {
      if (shouldPollSessions && isLoggedIn) {
        void refetchSessions()
      }
    },
    shouldPollSessions && isLoggedIn ? 30000 : 0,
  )

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
