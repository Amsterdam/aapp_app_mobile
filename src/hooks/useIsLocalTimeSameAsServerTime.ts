import {useRefetchInterval} from '@/hooks/useRefetchInterval'
import {useGetServerTimeQuery} from '@/services/serverTime.service'
import {isLocalTimeSameAsServerTime} from '@/utils/datetime/isLocalTimeSameAsServerTime'

const REFRESH_INTERVAL_SECONDS = 30

export const useIsLocalTimeSameAsServerTime = () => {
  const {data: serverTime, refetch} = useGetServerTimeQuery()

  useRefetchInterval(refetch, REFRESH_INTERVAL_SECONDS * 1000)

  const isSameTime = isLocalTimeSameAsServerTime(serverTime)

  return {isSameTime, serverTime}
}
