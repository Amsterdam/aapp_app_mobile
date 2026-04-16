import {useCallback, useContext} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'

export enum MapControlBottomSheetKey {
  layers = 'layers',
  legend = 'legend',
}

export const useMapControlsToggleBottomSheetButton = (
  key: MapControlBottomSheetKey,
) => {
  const {toggle} = useContext(BottomSheetContext)

  const onPressControlButton = useCallback(() => {
    toggle(key)
  }, [toggle, key])

  return {onPressControlButton}
}
