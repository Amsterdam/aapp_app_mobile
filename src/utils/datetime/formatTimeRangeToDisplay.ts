import simplur from 'simplur'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

export type Options = {
  format?: 'default' | 'short' | 'veryShort'
  veryShort?: boolean
}

const formatHours = (hours: number, format: NonNullable<Options['format']>) => {
  if (format === 'veryShort') return `${hours} u`
  if (format === 'short') return `${hours} uur`

  return simplur`${hours} u[ur|ren]`
}

const formatMinutes = (
  minutes: number,
  format: NonNullable<Options['format']>,
) => {
  if (format !== 'default') return `${minutes} min`

  return simplur`${minutes} minu[ut|ten]`
}

const getDurationParts = (start: Dayjs, end: Dayjs) => {
  const isNegative = end.isBefore(start)
  const earlier = isNegative ? end : start
  const later = isNegative ? start : end

  const hours = later.diff(earlier, 'hour')
  const minutes = later.diff(earlier.add(hours, 'hour'), 'minute')

  return {isNegative, hours, minutes}
}

export const formatTimeRangeToDisplay = (
  startTime: string | Dayjs,
  endTime: string | Dayjs,
  {format = 'default'}: Options = {},
) => {
  const start = dayjs(startTime)
  const end = dayjs(endTime)
  const {isNegative, hours, minutes} = getDurationParts(start, end)
  const sign = isNegative ? '- ' : ''

  const minutesText = formatMinutes(minutes, format)

  if (hours === 0) {
    return `${sign}${minutesText}`
  }

  const hoursText = formatHours(hours, format)

  if (minutes === 0) {
    return `${sign}${hoursText}`
  }

  const separator = format === 'veryShort' ? ' ' : ' en '

  return `${sign}${hoursText}${separator}${minutesText}`
}
