import {ChargingPointStatus} from '@/modules/boat-charging/types'

export const mapFilters = [
  {
    filter_key: 'status',
    filter_value: ChargingPointStatus.OPERATIVE,
    label: 'Nu Vrij',
  },
]
