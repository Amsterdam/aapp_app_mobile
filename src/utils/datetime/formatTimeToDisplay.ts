import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {parseTimeToDayjs} from '@/utils/datetime/parseTimeToDayjs'

type Options = {
  hoursLabelShort?: boolean
  includeHoursLabel?: boolean
  replaceMidnightBy24?: boolean
}

export const formatTimeToDisplay = (
  date: string | number | Dayjs,
  {
    includeHoursLabel = false,
    hoursLabelShort = false,
    replaceMidnightBy24,
  }: Options = {},
) => {
  let parsedTime = dayjs(date)

  if (!parsedTime.isValid() && typeof date === 'string') {
    parsedTime = parseTimeToDayjs(date)
  }

  let time = parsedTime.format('HH.mm')

  if (replaceMidnightBy24 && time === '00.00') {
    time = '24.00'
  }

  if (includeHoursLabel) {
    if (hoursLabelShort) {
      return `${time}u`
    }

    return `${time} uur`
  } else {
    return time
  }
}
