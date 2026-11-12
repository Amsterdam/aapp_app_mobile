import {
  BoatChargingCostBreakdownItemType,
  BoatChargingSessionCostBreakdownItem,
  type BoatChargingSettings,
} from '@/modules/boat-charging/types'
import {formatKWH} from '@/modules/boat-charging/utils/formatKWH'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'
import {formatNumber} from '@/utils/formatNumber'

const getItemString = (item: BoatChargingSessionCostBreakdownItem) =>
  item.volume
    ? `${formatTimeDurationToDisplay(item.volume, 'hour', {format: 'short', smallestUnit: item.volume > 100 / 60 ? 'minutes' : 'seconds'})} × ${formatNumber(item.unit_price_incl_vat, 'EUR', {maximumFractionDigits: 4})} per uur`
    : ''

export const boatChargingCostItemTypeMap = (
  sessionExpiryHours: BoatChargingSettings['session_expiry_hours'] | undefined,
): Record<
  BoatChargingCostBreakdownItemType,
  {
    details: (item: BoatChargingSessionCostBreakdownItem) => string
    label: string
  }
> => ({
  [BoatChargingCostBreakdownItemType.STANDARD_FINE]: {
    label: sessionExpiryHours ? `Na ${sessionExpiryHours} uur` : 'Extra kosten',
    details: getItemString,
  },
  [BoatChargingCostBreakdownItemType.ENERGY]: {
    label: 'Stroom',
    details: item =>
      `${formatKWH(item.volume)} × ${formatNumber(item.unit_price_incl_vat, 'EUR', {maximumFractionDigits: 4})} per kWh`,
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
})
