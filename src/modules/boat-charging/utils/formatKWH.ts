import {formatNumber} from '@/utils/formatNumber'

export const formatKWH = (kwh?: number | null) => {
  if (kwh == null || Number.isNaN(kwh)) {
    return ''
  }

  return `${formatNumber(kwh)} kWh`
}
