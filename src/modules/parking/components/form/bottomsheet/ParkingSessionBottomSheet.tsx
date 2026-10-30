import {type FC} from 'react'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {ParkingSessionEndTimeBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionEndTimeBottomSheetContent'
import {ParkingSessionLicensePlateBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionLicensePlateBottomSheetContent'
import {ParkingSessionStartTimeBottomSheetContent} from '@/modules/parking/components/form/bottomsheet/ParkingSessionStartTimeBottomSheetContent'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'

const variantMap: Record<ParkingSessionBottomSheetVariant, FC> = {
  [ParkingSessionBottomSheetVariant.licensePlate]:
    ParkingSessionLicensePlateBottomSheetContent,
  [ParkingSessionBottomSheetVariant.startTime]:
    ParkingSessionStartTimeBottomSheetContent,
  [ParkingSessionBottomSheetVariant.endTime]:
    ParkingSessionEndTimeBottomSheetContent,
}

export const ParkingSessionBottomSheet = () => {
  const {variant} = useBottomSheet()

  return (
    <BottomSheet
      scroll={variant === ParkingSessionBottomSheetVariant.licensePlate}
      testID="ParkingSessionBottomSheet"
      variants={variantMap}
    />
  )
}
