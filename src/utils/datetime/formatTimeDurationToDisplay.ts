import {type ManipulateType} from 'dayjs'
import {devError} from '@/processes/development'
import {dayjs} from '@/utils/datetime/dayjs'
import {
  formatTimeRangeToDisplay,
  Options,
} from '@/utils/datetime/formatTimeRangeToDisplay'

export const formatTimeDurationToDisplay = (
  value: number,
  unit: ManipulateType,
  options?: Options,
) => {
  const now = dayjs()

  const isInvalid =
    Number.isNaN(Number(value)) || !Number.isFinite(Number(value))
  const valueGuard = isInvalid ? 0 : value

  if (isInvalid) {
    devError(
      `[formatTimeDurationToDisplay] The value ${value} is not a valid number.`,
    )
  }

  return formatTimeRangeToDisplay(now, now.add(valueGuard, unit), options)
}
