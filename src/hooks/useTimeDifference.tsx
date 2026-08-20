import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {useGetServerTimeQuery} from '@/services/bridge.service'
import {dayjs, dayjsTimeZoneAware, type Dayjs} from '@/utils/datetime/dayjs'
import {isLocalTimeSameAsServerTime} from '@/utils/datetime/isLocalTimeSameAsServerTime'

const REFRESH_INTERVAL_SECONDS = 30

type UseTimeDifferenceReturnType = {
  deviceNow: Dayjs
  differenceMS?: number
  differenceUtcOffset?: number
  isSameDay: boolean
  isSameTime: boolean
  serverNow?: Dayjs
  serverUtcOffset?: number
}

const DEFAULTS = {
  isSameTime: true,
  isSameDay: true,
}

/**
 * Checks the device time and timezone, and matches it against the server time
 * @param skip Optional boolean to conditionally skip the query (and polling of query)
 * @returns
 */
export const useTimeDifference = (
  skip?: boolean,
  pollingInterval: number = REFRESH_INTERVAL_SECONDS * 1000,
) => {
  const {
    data: serverTime,
    isLoading,
    isError,
  } = useGetServerTimeQuery(skip ? skipToken : undefined, {
    pollingInterval,
  })

  return useMemo<UseTimeDifferenceReturnType>(() => {
    const deviceNow = dayjs()

    if (isLoading || isError || !serverTime) {
      return {...DEFAULTS, deviceNow}
    }

    const serverNow = dayjsTimeZoneAware(serverTime)

    return {
      ...DEFAULTS,
      deviceNow,
      serverNow,
      differenceMS: deviceNow.diff(serverNow),
      differenceUtcOffset: deviceNow.utcOffset() - serverNow.utcOffset(),
      isSameTime: isLocalTimeSameAsServerTime(serverTime),
      isSameDay: serverNow.isSame(deviceNow, 'day'),
      serverUtcOffset: serverNow.utcOffset(),
    }
  }, [isLoading, serverTime, isError])
}
