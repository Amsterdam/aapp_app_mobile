import simplur from 'simplur'
import type {DurationUnitType} from 'dayjs/plugin/duration'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

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

export const formatTimeRangeToDisplay = (
  startTime: string | Dayjs,
  endTime: string | Dayjs,
  {format = 'default', smallestUnit = 'minutes'}: Options = {},
) => {
  const start = dayjs(startTime)
  const end = dayjs(endTime)
  const {isNegative, hours, minutes, seconds} = getDurationParts(start, end)
  const sign = isNegative ? '- ' : ''

  const hoursString = formatHours(hours, format)

  if (smallestUnit === 'hours') {
    return `${sign}${hoursString}`
  }

  const minutesString = formatMinutes(minutes, format)

  if (smallestUnit === 'minutes') {
    if (hours === 0) {
      return `${sign}${minutesString}`
    }

    if (minutes === 0) {
      return `${sign}${hoursString}`
    }

    return `${sign}${hoursString}${format === 'veryShort' ? ' ' : ' en '}${minutesString}`
  }

  const secondsString = formatSeconds(seconds, format)

  if (minutes === 0 && hours === 0) {
    return `${sign}${secondsString}`
  }

  if (minutes === 0) {
    return `${sign}${hoursString} en ${secondsString}`
  }

  if (hours === 0) {
    return `${sign}${minutesString} en ${secondsString}`
  }

  return `${sign}${hoursString}${format === 'veryShort' ? ' ' : ', '}${minutesString}${format === 'veryShort' ? ' ' : ' en '}${secondsString}`
}
