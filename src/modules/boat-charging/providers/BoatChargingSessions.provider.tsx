import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo, useState, type ReactNode} from 'react'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useInterval} from '@/hooks/useInterval'
import {BoatChargingSessionsContext} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {
  useBoatChargingSessionsQuery,
  useBoatChargingSocketStatusQuery,
} from '@/modules/boat-charging/service'
import {SocketStatus} from '@/modules/boat-charging/types'
import {getActiveSessions} from '@/modules/boat-charging/utils/getIsActiveSession'

type Props = {
  children: ReactNode
  shouldPollSocketStatus?: boolean
}

export const BoatChargingSessionsProvider = ({
  children,
  shouldPollSocketStatus = false,
}: Props) => {
  const [isNotPluggedInErrorVisible, setIsNotPluggedInErrorVisible] =
    useState(false)
  const {isLoggedIn} = useIsLoggedIn()

  const {data, isLoading, isError} = useBoatChargingSessionsQuery(undefined, {
    skip: !isLoggedIn,
  })

  const activeSessions = getActiveSessions(data)
  const activeSession = activeSessions?.[0]
  const {data: socketStatus, refetch: refetchSocketStatus} =
    useBoatChargingSocketStatusQuery(
      shouldPollSocketStatus ? (activeSession?.id ?? skipToken) : skipToken,
    )
  const isPluggedIn =
    socketStatus?.substatus === SocketStatus.PREPARING ||
    socketStatus?.substatus === SocketStatus.CHARGING

  useInterval(() => {
    if (shouldPollSocketStatus) {
      void refetchSocketStatus()
    }
  }, 5000)

  useSetScreenTitle(activeSession?.location.name)

  const onPressStartButtonNotPluggedIn = useCallback(() => {
    setIsNotPluggedInErrorVisible(true)
  }, [])

  const value = useMemo(
    () => ({
      activeSession,
      activeSessions,
      isLoading,
      isError,
      isPluggedIn,
      isNotPluggedInErrorVisible,
      onPressStartButtonNotPluggedIn,
      sessions: data || [],
    }),
    [
      activeSession,
      activeSessions,
      isLoading,
      isError,
      isPluggedIn,
      isNotPluggedInErrorVisible,
      onPressStartButtonNotPluggedIn,
      data,
    ],
  )

  return (
    <BoatChargingSessionsContext.Provider value={value}>
      {children}
    </BoatChargingSessionsContext.Provider>
  )
}
