import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo, useState, type ReactNode} from 'react'
import {useInterval} from '@/hooks/useInterval'
import {BoatChargingSessionContext} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {
  useBoatChargingSessionQuery,
  useBoatChargingSocketStatusQuery,
} from '@/modules/boat-charging/service'
import {
  NRGStatus,
  SessionLengthStatus,
  SessionStatus,
  SocketStatus,
  type BoatChargingSession,
  type BoatChargingSettings,
} from '@/modules/boat-charging/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

type Props = {
  children: ReactNode
  id: BoatChargingSession['id']
  shouldPollSessions?: boolean
  shouldPollSocketStatus?: boolean
}

export const BoatChargingSessionProvider = ({
  id,
  children,
  shouldPollSocketStatus = true,
  shouldPollSessions = true,
}: Props) => {
  const [isNotPluggedInErrorVisible, setIsNotPluggedInErrorVisible] =
    useState(false)
  const {isLoggedIn} = useIsLoggedIn()

  const {
    data: session,
    isLoading,
    isError,
    fulfilledTimeStamp,
    refetch: refetchSessions,
  } = useBoatChargingSessionQuery(id, {
    skip: !isLoggedIn || !id,
  })

  const {data: socketStatus, refetch: refetchSocketStatus} =
    useBoatChargingSocketStatusQuery(
      shouldPollSocketStatus ? (id ?? skipToken) : skipToken,
      {
        skip: !id,
      },
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
        id &&
        session?.nrg_status === NRGStatus.CheckedOut
      ) {
        void refetchSocketStatus()
      }
    },
    shouldPollSocketStatus && !!session?.id ? 5000 : 0,
  )

  const onPressStartButtonNotPluggedIn = useCallback(() => {
    setIsNotPluggedInErrorVisible(true)
  }, [])

  const chargingTimeString = useMemo(
    () =>
      session
        ? formatTimeRangeToDisplay(
            session.start_date_time,
            session.status === SessionStatus.ACTIVE
              ? dayjs()
              : session.end_date_time,
            {
              format: 'veryShort',
            },
          )
        : undefined,
    [session],
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
    session?.status === SessionStatus.ACTIVE
      ? dayjs()
      : dayjs(session?.end_date_time)
  ).diff(dayjs(session?.start_date_time), 'hours')

  const sessionLengthStatus =
    chargingTimeHours >= settings.session_expiry_hours
      ? SessionLengthStatus.expiry
      : chargingTimeHours >= settings.session_expiry_warning_hours
        ? SessionLengthStatus.expiryWarning
        : SessionLengthStatus.normal

  const value = useMemo(
    () => ({
      session,
      isLoading,
      isError,
      isPluggedIn,
      isNotPluggedInErrorVisible,
      onPressStartButtonNotPluggedIn,
      lastUpdated: fulfilledTimeStamp ? dayjs(fulfilledTimeStamp) : undefined,
      chargingTimeString,
      sessionLengthStatus,
      settings,
    }),
    [
      session,
      isLoading,
      isError,
      isPluggedIn,
      isNotPluggedInErrorVisible,
      onPressStartButtonNotPluggedIn,
      fulfilledTimeStamp,
      chargingTimeString,
      sessionLengthStatus,
      settings,
    ],
  )

  return (
    <BoatChargingSessionContext.Provider value={value}>
      {children}
    </BoatChargingSessionContext.Provider>
  )
}
