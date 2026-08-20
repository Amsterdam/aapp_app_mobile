// eslint-disable-next-line no-restricted-imports
import dayjsFn, {ConfigType} from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import minMax from 'dayjs/plugin/minMax'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import 'dayjs/locale/nl'

export {Dayjs} from 'dayjs'

export const DEFAULT_TIMEZONE = 'Europe/Amsterdam'
const UTC_OFFSET_PATTERN = /([+-]\d{2}:\d{2}|Z)$/

dayjsFn.extend(utc)
dayjsFn.extend(timezone)
dayjsFn.extend(minMax)
dayjsFn.extend(weekOfYear)
dayjsFn.extend(localeData)
dayjsFn.locale('nl')
dayjsFn.tz.setDefault(DEFAULT_TIMEZONE)

/**
 * This function replaces the default dayjs function to make sure the locale is set properly.
 */
export const dayjs = (date?: ConfigType) => {
  const date1 = dayjsFn(date).format()

  return dayjsFn(date1)
}

dayjs.min = dayjsFn.min
dayjs.max = dayjsFn.max
dayjs.utc = dayjsFn.utc
dayjs.tz = dayjsFn.tz

export const dayjsFromUnix = (timestamp: number) => {
  const date1 = dayjsFn.unix(timestamp)

  return dayjsFn(date1)
}

/**
 * Uses an explicit offset from the input when present, otherwise normalizes the value to the local runtime timezone.
 */
export const dayjsTimeZoneAware = (date?: ConfigType) => {
  if (typeof date !== 'string') {
    return dayjsFn(date).local()
  }

  const utcOffsetString = UTC_OFFSET_PATTERN.exec(date)?.[1]

  if (!utcOffsetString) {
    return dayjsFn(date).local()
  }

  return utcOffsetString === 'Z'
    ? dayjsFn.utc(date)
    : dayjsFn.utc(date).utcOffset(utcOffsetString)
}
