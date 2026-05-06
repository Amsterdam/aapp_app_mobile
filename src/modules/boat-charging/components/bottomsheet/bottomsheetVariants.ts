import type {FC} from 'react'
import {BoatChargingMapLegend} from '@/modules/boat-charging/components/bottomsheet/BoatChargingMapLegend'

export enum BoatChargingBottomSheetVariant {
  boatChargingPointDetails = 'boatChargingPointDetails',
  legend = 'legend',
}

export const bottomsheetVariants: Record<BoatChargingBottomSheetVariant, FC> = {
  [BoatChargingBottomSheetVariant.boatChargingPointDetails]: () => null, //TODO: add details sheet
  [BoatChargingBottomSheetVariant.legend]: BoatChargingMapLegend,
}
