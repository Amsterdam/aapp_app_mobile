import {VAT_FRACTION_FALLBACK} from '@/modules/boat-charging/constants/settings'
import {
  BoatChargingCostBreakdownItemType,
  BoatChargingSessionCostBreakdownItem,
} from '@/modules/boat-charging/types'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'
import {formatNumber} from '@/utils/formatNumber'

const getItemString = (
  item: BoatChargingSessionCostBreakdownItem,
  vat_fraction?: number | null,
) =>
  `${formatTimeDurationToDisplay(item.volume, 'hour', {format: 'short', smallestUnit: item.volume > 100 / 60 ? 'minutes' : 'seconds'})} × ${formatNumber(item.unit_price * (vat_fraction ?? VAT_FRACTION_FALLBACK), 'EUR', {maximumFractionDigits: 4})} per uur`

export const boatChargingCostItemTypeMap: Record<
  BoatChargingCostBreakdownItemType,
  {
    details: (
      item: BoatChargingSessionCostBreakdownItem,
      vat_fraction?: number | null,
    ) => string
    label: string
  }
> = {
  [BoatChargingCostBreakdownItemType.STANDARD_FINE]: {
    label: 'Kleeftarief',
    details: getItemString,
  },
  [BoatChargingCostBreakdownItemType.ENERGY]: {
    label: 'Stroom',
    details: (item, vat_fraction) =>
      `${formatKWH(item.volume)} × ${formatNumber(item.unit_price * (vat_fraction ?? VAT_FRACTION_FALLBACK), 'EUR', {maximumFractionDigits: 4})} per kWh`,
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
