import {type Component, useEffect, useRef} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {Duration} from '@/types/duration'

/**
 * Set accessibility focus on a component when the bottom sheet is open
 * @returns ref - Ref to the component to set accessibility focus on
 */
export const useSetBottomSheetElementFocus = () => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)
  const {isOpen} = useBottomSheet()

  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-explicit-any
  const ref = useRef<any | Component | null>(null)

  useEffect(() => {
    if (isOpen && ref.current) {
      setAccessibilityFocus(ref.current as Component)
    }
  }, [isOpen, setAccessibilityFocus])

  return ref
}
