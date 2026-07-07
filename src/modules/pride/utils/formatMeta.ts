import type {PrideEvent} from '@/modules/pride/types'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

export const formatMeta = ({date_start, time, date_end}: PrideEvent) => {
  let date = formatDateToDisplay(date_start)

  if (date_end !== date_start && date_end) {
    date = `${date} - ${formatDateToDisplay(date_end)}`
  }

  const meta = [date, time].filter(Boolean)

  return meta.length > 0 ? meta.join(', ') : undefined
}
