import {dayjs, defaultTimezone} from '@/utils/datetime/dayjs'

export const isLocalTimeSameAsServerTime = (serverTime?: string) => {
  if (!serverTime) {
    return true
  }

  const localTimeZone = dayjs.tz.guess()
  const serverTimeZone = defaultTimezone
  const isTimeZoneSame = localTimeZone === serverTimeZone

  const localNow = dayjs()
  const serverNow = dayjs(serverTime)

  const diffInSeconds = Math.abs(localNow.diff(serverNow, 'seconds'))

  return diffInSeconds < 120 && isTimeZoneSame
}
