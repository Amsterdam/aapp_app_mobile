import {
  BoatChargingCostBreakdownItemType,
  BoatChargingSessionCostBreakdownItem,
} from '@/modules/boat-charging/types'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'
import {formatNumber} from '@/utils/formatNumber'

const getItemString = (item: BoatChargingSessionCostBreakdownItem) =>
  `${formatTimeDurationToDisplay(item.volume, 'hour', {format: 'short', smallestUnit: item.volume > 100 / 60 ? 'minutes' : 'seconds'})} × ${formatNumber(item.unit_price, 'EUR')}`

export const boatChargingCostItemTypeMap: Record<
  BoatChargingCostBreakdownItemType,
  {
    details: (item: BoatChargingSessionCostBreakdownItem) => string
    label: string
  }
> = {
  [BoatChargingCostBreakdownItemType.ENERGY]: {
    label: 'Stroom',
    details: item =>
      `${formatKWH(item.volume)} × ${formatNumber(item.unit_price, 'EUR')} per kWh`,
  },
  [BoatChargingCostBreakdownItemType.TIME]: {
    label: 'Laadtijd',
    details: getItemString,
  },
  [BoatChargingCostBreakdownItemType.PARKING_TIME]: {
    label: 'Ligtijd',
    details: getItemString,
  },
  [BoatChargingCostBreakdownItemType.FLAT]: {
    label: 'Starttarief',
    details: () => 'Eenmalig',
  },
}
