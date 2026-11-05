import {WasteType} from '@/modules/waste-guide/types'
import {dayjs} from '@/utils/datetime/dayjs'
import {isToday} from '@/utils/datetime/isToday'
import {isTomorrow} from '@/utils/datetime/isTomorrow'
import {capitalizeString} from '@/utils/transform/capitalizeString'

const getDateToDisplay = (next_date: string) => {
  const nextDate = dayjs(next_date)

  if (isToday(nextDate)) {
    return 'Vandaag'
  }

  if (isTomorrow(nextDate)) {
    return 'Morgen'
  }

  return capitalizeString(nextDate.format('dddd D MMMM'))
}

export const getNextCollectionDate = (fraction: WasteType) =>
  fraction.next_date ? getDateToDisplay(fraction.next_date) : ''
