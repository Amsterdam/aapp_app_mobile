import simplur from 'simplur'
import type {Dayjs} from '@/utils/datetime/dayjs'
import type {DurationUnitType} from 'dayjs/plugin/duration'
import {processDateInput} from '@/utils/datetime/isDayjsOrDate'

export type Options = {
  format?: 'default' | 'short' | 'veryShort'
  smallestUnit?: Extract<DurationUnitType, 'seconds' | 'minutes' | 'hours'>
}

const formatHours = (hours: number, format: NonNullable<Options['format']>) => {
  if (format === 'veryShort') return `${hours} u`

  return `${hours} uur`
}

const formatMinutes = (
  minutes: number,
  format: NonNullable<Options['format']>,
) => {
  if (format !== 'default') return `${minutes} min`

  return simplur`${minutes} minu[ut|ten]`
}

const formatSeconds = (
  seconds: number,
  format: NonNullable<Options['format']>,
) => {
  if (format !== 'default') return `${seconds} sec`

  return simplur`${seconds} second[e|en]`
}

const getDurationParts = (start: Dayjs, end: Dayjs) => {
  const isNegative = end.isBefore(start)
  const earlier = isNegative ? end : start
  const later = isNegative ? start : end

  const hours = later.diff(earlier, 'hour')
  const minutes = later.diff(earlier.add(hours, 'hour'), 'minute')
  const seconds = later.diff(
    earlier.add(hours, 'hour').add(minutes, 'minute'),
    'second',
  )

  return {isNegative, hours, minutes, seconds}
}

const constructTimeString = (
  {smallestUnit = 'minutes', format = 'default'}: Options,
  hours: number,
  minutes: number,
  seconds: number,
) => {
  const separator = format === 'veryShort' ? ' ' : ' en '
  const hourString = formatHours(hours, format)

  if (smallestUnit === 'hours') {
    return hourString
  }

  const minutesString = formatMinutes(minutes, format)

  if (smallestUnit === 'minutes') {
    const parts = []

    if (hours > 0) {
      parts.push(hourString)
    }

    if (minutes > 0 || hours === 0) {
      parts.push(minutesString)
    }

    return parts.join(separator)
  }

  const secondsString = formatSeconds(seconds, format)

  const parts = []

  if (hours > 0) {
    parts.push(hourString)
  }

  if (minutes > 0) {
    parts.push(minutesString)
  }

  if (seconds > 0 || (hours === 0 && minutes === 0)) {
    parts.push(secondsString)
  }

  const additionalSeparator = format === 'veryShort' ? ' ' : ', '

  return parts.length === 3
    ? `${parts[0]}${additionalSeparator}${parts[1]}${separator}${parts[2]}`
    : parts.join(separator)
}

export const formatTimeRangeToDisplay = (
  startTime: string | Dayjs,
  endTime: string | Dayjs,
  options: Options = {},
) => {
  const start = processDateInput(startTime)
  const end = processDateInput(endTime)
  const {isNegative, hours, minutes, seconds} = getDurationParts(start, end)
  const sign = isNegative ? '- ' : ''

  const timeString = constructTimeString(options, hours, minutes, seconds)

  return `${sign}${timeString}`
}
