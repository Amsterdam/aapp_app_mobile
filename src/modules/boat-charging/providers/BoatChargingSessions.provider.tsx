import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo, useState, type ReactNode} from 'react'
import {useInterval} from '@/hooks/useInterval'
import {BoatChargingSessionsContext} from '@/modules/boat-charging/hooks/useBoatChargingSessions'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {
  useBoatChargingSessionsQuery,
  useBoatChargingSocketStatusQuery,
} from '@/modules/boat-charging/service'
import {
  NRGStatus,
  SessionLengthStatus,
  SessionStatus,
  SocketStatus,
  type BoatChargingSettings,
} from '@/modules/boat-charging/types'
import {getActiveSessions} from '@/modules/boat-charging/utils/getActiveSessions'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

type Props = {
  children: ReactNode
  shouldPollSessions?: boolean
  shouldPollSocketStatus?: boolean
}

export const BoatChargingSessionsProvider = ({
  children,
  shouldPollSocketStatus = true,
  shouldPollSessions = true,
}: Props) => {
  const [isNotPluggedInErrorVisible, setIsNotPluggedInErrorVisible] =
    useState(false)
  const {isLoggedIn} = useIsLoggedIn()

  const {
    data,
    isLoading,
    isError,
    fulfilledTimeStamp,
    refetch: refetchSessions,
  } = useBoatChargingSessionsQuery(undefined, {
    skip: !isLoggedIn,
  })

  const activeSessions = getActiveSessions(data?.result)
  const activeSession = activeSessions?.[0]
  const {data: socketStatus, refetch: refetchSocketStatus} =
    useBoatChargingSocketStatusQuery(
      shouldPollSocketStatus ? (activeSession?.id ?? skipToken) : skipToken,
    )
  const isPluggedIn =
    socketStatus?.substatus === SocketStatus.PREPARING ||
    socketStatus?.substatus === SocketStatus.CHARGING

  useInterval(
    () => {
      if (shouldPollSessions && isLoggedIn) {
        void refetchSessions()
      }
    },
    shouldPollSessions && isLoggedIn ? 30000 : 0,
  )

  useInterval(
    () => {
      if (
        shouldPollSocketStatus &&
        activeSession?.id &&
        activeSession.nrg_status === NRGStatus.CheckedOut
      ) {
        void refetchSocketStatus()
      }
    },
    shouldPollSocketStatus && !!activeSession?.id ? 5000 : 0,
  )

  const onPressStartButtonNotPluggedIn = useCallback(() => {
    setIsNotPluggedInErrorVisible(true)
  }, [])

  const chargingTimeString = useMemo(
    () =>
      activeSession
        ? formatTimeRangeToDisplay(
            activeSession.start_date_time,
            activeSession.status === SessionStatus.ACTIVE
              ? dayjs()
              : activeSession.end_date_time,
            {
              format: 'veryShort',
            },
          )
        : undefined,
    [activeSession],
  )

  // TODO: fetch from settings endpoint
  const settings: BoatChargingSettings = useMemo(
    () => ({
      pre_authorization_amount: 45,
      session_cleanup_enabled: false,
      session_expiry_hours: 24,
      session_expiry_warning_hours: 20,
      standard_fine: 1,
    }),
    [],
  )

  const chargingTimeHours = (
    activeSession?.status === SessionStatus.ACTIVE
      ? dayjs()
      : dayjs(activeSession?.end_date_time)
  ).diff(dayjs(activeSession?.start_date_time), 'hours')

  const sessionLengthStatus =
    chargingTimeHours >= settings.session_expiry_hours
      ? SessionLengthStatus.expiry
      : chargingTimeHours >= settings.session_expiry_warning_hours
        ? SessionLengthStatus.expiryWarning
        : SessionLengthStatus.normal

  const value = useMemo(
    () => ({
      activeSession,
      activeSessions,
      isLoading,
      isError,
      isPluggedIn,
      isNotPluggedInErrorVisible,
      onPressStartButtonNotPluggedIn,
      sessions: data?.result || [],
      lastUpdated: fulfilledTimeStamp ? dayjs(fulfilledTimeStamp) : undefined,
      chargingTimeString,
      sessionLengthStatus,
      settings,
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
      fulfilledTimeStamp,
      chargingTimeString,
      sessionLengthStatus,
      settings,
    ],
  )

  return (
    <BoatChargingSessionsContext.Provider value={value}>
      {children}
    </BoatChargingSessionsContext.Provider>
  )
}
