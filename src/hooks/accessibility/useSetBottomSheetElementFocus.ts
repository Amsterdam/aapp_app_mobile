import {type Component, useContext, useEffect, useRef} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {Duration} from '@/types/duration'

/**
 * Set accessibility focus on a component when the bottom sheet is open
 * @returns ref - Ref to the component to set accessibility focus on
 */
export const useSetBottomSheetElementFocus = () => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)
  const {isOpen} = useContext(BottomSheetContext)

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-explicit-any
  const ref = useRef<any | Component | null>(null)

  useEffect(() => {
    if (isOpen && ref.current) {
      setAccessibilityFocus(ref.current as Component)
    }
  }, [isOpen, setAccessibilityFocus])

  return ref
}
