// eslint-disable-next-line no-restricted-imports
import dayjsFn, {ConfigType} from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import minMax from 'dayjs/plugin/minMax'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import 'dayjs/locale/nl'

export {Dayjs} from 'dayjs'

const defaultTimezone = 'Europe/Amsterdam'

dayjsFn.extend(utc)
dayjsFn.extend(timezone)
dayjsFn.extend(minMax)
dayjsFn.extend(weekOfYear)

dayjsFn.extend(localeData)
dayjsFn.locale('nl')
dayjsFn.tz.setDefault(defaultTimezone)

/**
 * This function replaces the default dayjs function to make sure the timezone uses the default that is set above and the locale is set properly
 */
export const dayjs = (date?: ConfigType) => {
  const date1 = dayjsFn(date).format()

  return dayjsFn(date1)
}

dayjs.min = dayjsFn.min
dayjs.max = dayjsFn.max
dayjs.utc = dayjsFn.utc

export const dayjsFromUnix = (timestamp: number) => {
  const date1 = dayjsFn.unix(timestamp)

  return dayjsFn(date1)
}
