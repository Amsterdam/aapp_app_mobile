import {use} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'

export const useBottomSheet = () => {
  const context = use(BottomSheetContext)

  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider')
  }

  return context
}
