import type {FC} from 'react'
import {ParkingMachineBottomSheetContent} from '@/modules/parking/components/permit-zone/bottomsheet/ParkingMachineBottomSheetContent'
import {ParkingPermitZoneLegend} from '@/modules/parking/components/permit-zone/bottomsheet/ParkingPermitZoneLegend'

export enum PermitZoneMapBottomSheetVariant {
  legend = 'legend',
  parkingMachine = 'parkingMachine',
}

export const bottomsheetVariants: Record<PermitZoneMapBottomSheetVariant, FC> =
  {
    [PermitZoneMapBottomSheetVariant.parkingMachine]:
      ParkingMachineBottomSheetContent,
    [PermitZoneMapBottomSheetVariant.legend]: ParkingPermitZoneLegend,
  }
