import {
  dayjs,
  dayjsTimeZoneAware,
  DEFAULT_TIMEZONE as serverTimezone,
} from '@/utils/datetime/dayjs'

const MARGIN = 120 // seconds

export const isLocalTimeSameAsServerTime = (serverTime?: string) => {
  if (!serverTime) {
    return true
  }

  const localTimeZone = dayjs.tz.guess()
  const isTimeZoneSame =
    // Double check timezone using different API's
    serverTimezone === localTimeZone ||
    serverTimezone === Intl.DateTimeFormat().resolvedOptions().timeZone

  const localNow = dayjs()
  const serverNow = dayjsTimeZoneAware(serverTime)

  const diffInSeconds = Math.abs(localNow.diff(serverNow, 'seconds'))

  return diffInSeconds < MARGIN && isTimeZoneSame
}
