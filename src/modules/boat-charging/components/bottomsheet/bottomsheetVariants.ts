import type {FC} from 'react'
import {BoatChargingMapLegend} from '@/modules/boat-charging/components/bottomsheet/BoatChargingMapLegend'
import {BoatChargingPointDetails} from '@/modules/boat-charging/components/bottomsheet/BoatChargingPointDetails'
import {BoatChargingSessionChargingTimeBottomSheet} from '@/modules/boat-charging/components/session/BoatChargingSessionChargingTimeBottomSheet'
import {BoatChargingSessionCostsBottomSheet} from '@/modules/boat-charging/components/session/BoatChargingSessionCostsBottomSheet'

export enum BoatChargingBottomSheetVariant {
  boatChargingPointDetails = 'boatChargingPointDetails',
  legend = 'legend',
}

export const boatChargingMapBottomsheetVariants: Record<
  BoatChargingBottomSheetVariant,
  FC
> = {
  [BoatChargingBottomSheetVariant.boatChargingPointDetails]:
    BoatChargingPointDetails,
  [BoatChargingBottomSheetVariant.legend]: BoatChargingMapLegend,
}

export enum BoatChargingSessionBottomsheetVariants {
  chargingTime = 'chargingTime',
  costs = 'costs',
}

export const boatChargingSessionBottomsheetVariants: Record<
  BoatChargingSessionBottomsheetVariants,
  FC
> = {
  [BoatChargingSessionBottomsheetVariants.costs]:
    BoatChargingSessionCostsBottomSheet,
  [BoatChargingSessionBottomsheetVariants.chargingTime]:
    BoatChargingSessionChargingTimeBottomSheet,
}
