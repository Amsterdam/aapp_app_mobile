import {skipToken} from '@reduxjs/toolkit/query'
import {useInterval} from '@/hooks/useInterval'
import {useGetServerTimeQuery} from '@/services/bridge.service'
import {isLocalTimeSameAsServerTime} from '@/utils/datetime/isLocalTimeSameAsServerTime'

const REFRESH_INTERVAL_SECONDS = 30

export const useIsLocalTimeSameAsServerTime = (skip = false) => {
  const {data: serverTime, refetch} = useGetServerTimeQuery(
    skip ? skipToken : undefined,
  )

  useInterval(() => {
    if (skip) {
      return
    }

    void refetch()
  }, REFRESH_INTERVAL_SECONDS * 1000)

  const isSameTime = isLocalTimeSameAsServerTime(serverTime)

  return {isSameTime, serverTime}
}
