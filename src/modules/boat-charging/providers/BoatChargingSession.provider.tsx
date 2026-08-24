import {useIsFocused} from '@react-navigation/native'
import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useEffect, useMemo, useState, type ReactNode} from 'react'
import {VAT_FRACTION_FALLBACK} from '@/modules/boat-charging/constants/settings'
import {BoatChargingSessionContext} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {
  useBoatChargingSessionQuery,
  useBoatChargingSettingsQuery,
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
  shouldPollSession?: boolean
  shouldPollSocketStatus?: boolean
}

export const BoatChargingSessionProvider = ({
  id,
  children,
  shouldPollSession = true,
  shouldPollSocketStatus = true,
}: Props) => {
  const [isNotPluggedInErrorVisible, setIsNotPluggedInErrorVisible] =
    useState(false)
  const isFocused = useIsFocused()
  const [lastStatus, setLastStatus] = useState<NRGStatus | undefined>(undefined)

  const shouldPollFast =
    lastStatus === NRGStatus.Starting || lastStatus === NRGStatus.Stopping

  const {
    data: session,
    isLoading,
    isError,
    fulfilledTimeStamp,
  } = useBoatChargingSessionQuery(id, {
    pollingInterval:
      isFocused && shouldPollSession ? (shouldPollFast ? 5000 : 30000) : 0,
    skip: !id,
  })

  useEffect(() => {
    setLastStatus(session?.nrg_status)
  }, [session?.nrg_status])

  const {data: socketStatus} = useBoatChargingSocketStatusQuery(
    shouldPollSocketStatus ? (id ?? skipToken) : skipToken,
    {
      pollingInterval:
        isFocused &&
        session?.nrg_status === NRGStatus.CheckedOut &&
        !!session?.id
          ? 5000
          : 0,
    },
  )
  const isPluggedIn =
    socketStatus?.substatus === SocketStatus.PREPARING ||
    socketStatus?.substatus === SocketStatus.CHARGING

  const onPressStartButtonNotPluggedIn = useCallback(() => {
    setIsNotPluggedInErrorVisible(true)
  }, [])

  const [chargingTimeString, chargingTimeVeryShortString] = useMemo(() => {
    const endDateTime =
      session?.status === SessionStatus.ACTIVE
        ? dayjs()
        : session?.end_date_time
          ? session.end_date_time
          : undefined

    return session && endDateTime
      ? [
          formatTimeRangeToDisplay(session.start_date_time, endDateTime),
          formatTimeRangeToDisplay(session.start_date_time, endDateTime, {
            format: 'veryShort',
          }),
        ]
      : []
  }, [session])

  const {data: settingsServerData} = useBoatChargingSettingsQuery()
  const settings: BoatChargingSettings = useMemo(
    () =>
      settingsServerData || {
        pre_authorization_amount: null,
        session_cleanup_enabled: null,
        session_expiry_hours: 24,
        session_expiry_warning_hours: 20,
        standard_fine: null,
        vat_fraction: VAT_FRACTION_FALLBACK,
      },
    [settingsServerData],
  )

  const chargingTimeHours = (
    session?.status === SessionStatus.ACTIVE
      ? dayjs()
      : dayjs(session?.end_date_time)
  ).diff(dayjs(session?.start_date_time), 'hours')

  const isSessionExpired =
    settings.session_expiry_hours &&
    chargingTimeHours >= settings.session_expiry_hours

  const isSessionExpiring =
    settings.session_expiry_warning_hours &&
    chargingTimeHours >= settings.session_expiry_warning_hours

  const sessionLengthStatus = isSessionExpired
    ? SessionLengthStatus.expiry
    : isSessionExpiring
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
      chargingTimeVeryShortString,
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
      chargingTimeVeryShortString,
      sessionLengthStatus,
      settings,
    ],
  )

  return (
    <BoatChargingSessionContext value={value}>
      {children}
    </BoatChargingSessionContext>
  )
}
