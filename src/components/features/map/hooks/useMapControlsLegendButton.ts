import {useCallback, useContext} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'

export const useMapControlsLegendButton = () => {
  const {toggle} = useContext(BottomSheetContext)

  const onPressLegendButton = useCallback(() => {
    toggle('legend')
  }, [toggle])

  return {onPressLegendButton}
}
