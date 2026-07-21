import {useCallback} from 'react'
import type {BoatChargingLocation} from '@/modules/boat-charging/types'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {BoatChargingBottomSheetVariant} from '@/modules/boat-charging/components/bottomsheet/bottomsheetVariants'
import {setSelectedBoatChargingPointId} from '@/modules/boat-charging/slice'

export const useSelectChargingPoint = () => {
  const dispatch = useDispatch()
  const {open} = useBottomSheet()

  return useCallback(
    (id: BoatChargingLocation['id']) => {
      dispatch(setSelectedBoatChargingPointId(id))
      open(BoatChargingBottomSheetVariant.boatChargingPointDetails)
    },
    [dispatch, open],
  )
}
