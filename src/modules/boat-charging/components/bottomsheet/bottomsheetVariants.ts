import type {FC} from 'react'
import {BoatChargingMapLegend} from '@/modules/boat-charging/components/bottomsheet/BoatChargingMapLegend'
import {BoatChargingPointDetails} from '@/modules/boat-charging/components/bottomsheet/BoatChargingPointDetails'

export enum BoatChargingBottomSheetVariant {
  boatChargingPointDetails = 'boatChargingPointDetails',
  legend = 'legend',
}

export const bottomsheetVariants: Record<BoatChargingBottomSheetVariant, FC> = {
  [BoatChargingBottomSheetVariant.boatChargingPointDetails]:
    BoatChargingPointDetails,
  [BoatChargingBottomSheetVariant.legend]: BoatChargingMapLegend,
}
