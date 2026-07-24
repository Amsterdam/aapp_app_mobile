import type {BoatChargingLocation} from '@/modules/boat-charging/types'

export const formatMaxKW = (maxKW?: BoatChargingLocation['max_kw']) => {
  if (maxKW == null || Number.isNaN(maxKW)) {
    return ''
  }

  return `${maxKW.toFixed(1)} kW`
}
