import {useRef, useEffect, useCallback} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useCloseBottomSheetOnBackPress} from '@/components/features/bottom-sheet/hooks/useCloseBottomSheetOnBackPress'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useScreen} from '@/store/slices/screen'

export const useBottomSheetHandler = () => {
  const {close, open, isOpen, variant} = useBottomSheet()
  const {setHideContentFromAccessibility} = useScreen()
  const variantRef = useRef(variant)

  useCloseBottomSheetOnBackPress()

  useEffect(() => {
    variantRef.current = variant
  }, [variant])

  useBlurEffect(close)

  const onChange = useCallback(
    (snapPointIndex: number) => {
      const newIsOpen = snapPointIndex !== -1

      if (newIsOpen !== isOpen) {
        newIsOpen ? open(variantRef.current) : close()
      }
    },
    [close, isOpen, open],
  )

  useEffect(() => {
    setHideContentFromAccessibility(isOpen)
  }, [isOpen, setHideContentFromAccessibility])

  return {
    onChange,
    variant,
    onClose: close,
    isOpen,
  }
}
