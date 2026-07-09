import type {PrideEvent} from '@/modules/pride/types'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

export const formatMeta = ({date_start, time, date_end, type}: PrideEvent) => {
  let date = formatDateToDisplay(date_start)

  if (date_end !== date_start && date_end) {
    date = `${date} - ${formatDateToDisplay(date_end)}`
  }

  const dateString = [date, time].filter(Boolean).join(', ')

  return `${type ?? ''}\n${dateString}`.trim() || undefined
}
