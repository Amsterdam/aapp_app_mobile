import type {FC} from 'react'
import {ParkingSelectPermit} from '@/modules/parking/components/select-permit/ParkingSelectPermit'
import {ParkingSessionVisitorLicensePlateForm} from '@/modules/parking/components/session/ParkingSessionShowVisitorSessionsForm'
import {Survey} from '@/modules/survey/exports/Survey'

export enum ParkingDashboardBottomSheetVariant {
  licensePlate = 'licensePlate',
  selectPermit = 'selectPermit',
  survey = 'survey',
}

export const bottomsheetVariants: Record<
  ParkingDashboardBottomSheetVariant,
  FC
> = {
  [ParkingDashboardBottomSheetVariant.survey]: Survey,
  [ParkingDashboardBottomSheetVariant.selectPermit]: ParkingSelectPermit,
  [ParkingDashboardBottomSheetVariant.licensePlate]:
    ParkingSessionVisitorLicensePlateForm,
}
