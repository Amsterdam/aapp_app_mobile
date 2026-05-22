import {type Dayjs} from '@/utils/datetime/dayjs'

type Params = {
  endTime?: Dayjs
  originalEndTime?: Dayjs
  startTime?: Dayjs
}

export const getDateForCostCalculation = ({
  endTime,
  originalEndTime,
  startTime,
}: Params) => {
  const isEndTimeBeforeOriginal =
    originalEndTime && endTime ? endTime.isBefore(originalEndTime) : false
  const newEndTime = endTime?.isBefore(startTime) ? startTime : endTime
  const newStartTime = originalEndTime ?? startTime

  const isNewEndTimeBeforeNewStartTime = newEndTime?.isBefore(newStartTime)
  const calculatedEndTime = isNewEndTimeBeforeNewStartTime
    ? newStartTime
    : newEndTime
  const calculatedStartTime = isNewEndTimeBeforeNewStartTime
    ? newEndTime
    : newStartTime

  return {
    isEndTimeBeforeOriginal,
    calculatedEndTime,
    calculatedStartTime,
  }
}
