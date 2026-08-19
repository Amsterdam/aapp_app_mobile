import {
  BoatChargingCostBreakdownItemType,
  BoatChargingSessionCostBreakdownItem,
} from '@/modules/boat-charging/types'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'
import {formatNumber} from '@/utils/formatNumber'

export const boatChargingCostItemTypeMap: Record<
  BoatChargingCostBreakdownItemType,
  {label: string; meta: (item: BoatChargingSessionCostBreakdownItem) => string}
> = {
  [BoatChargingCostBreakdownItemType.ENERGY]: {
    label: 'Stroom',
    meta: item =>
      `${formatKWH(item.volume)} × ${formatNumber(item.unit_price, 'EUR')} per kWh`,
  },
  [BoatChargingCostBreakdownItemType.TIME]: {
    label: 'Laadtijd',
    meta: item =>
      `${formatTimeDurationToDisplay(item.volume, 'hour', {format: 'short', smallestUnit: item.volume > 100 / 60 ? 'minutes' : 'seconds'})} × ${formatNumber(item.unit_price, 'EUR')}`,
  },
  [BoatChargingCostBreakdownItemType.PARKING_TIME]: {
    label: 'Ligtijd',
    meta: item =>
      `${formatTimeDurationToDisplay(item.volume, 'hour', {format: 'short', smallestUnit: item.volume > 100 / 60 ? 'minutes' : 'seconds'})} × ${formatNumber(item.unit_price, 'EUR')}`,
  },
  [BoatChargingCostBreakdownItemType.FLAT]: {
    label: 'Starttarief',
    meta: () => 'Eenmalig',
  },
}
