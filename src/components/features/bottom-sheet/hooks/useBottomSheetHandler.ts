import BottomSheet from '@gorhom/bottom-sheet'
import {useRef, useEffect, useCallback} from 'react'
import {Dimensions} from 'react-native'
import {useCloseBottomSheetOnBackPress} from '@/components/features/bottom-sheet/hooks/useCloseBottomSheetOnBackPress'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {
  useBottomSheet,
  useBottomSheetSelectors,
} from '@/store/slices/bottomSheet'
import {useScreen} from '@/store/slices/screen'

export const useBottomSheetHandler = () => {
  const {close, open} = useBottomSheet()
  const {isOpen, variant} = useBottomSheetSelectors()
  const {setHideContentFromAccessibility} = useScreen()
  const ref = useRef<BottomSheet>(null)
  const variantRef = useRef(variant) // needed because ref.current?.expand() triggers onChange with old variant value

  useCloseBottomSheetOnBackPress()

  useEffect(() => {
    variantRef.current = variant
  }, [variant])

  useEffect(() => {
    const onChange = () => {
      close()
    }
    const subscription = Dimensions.addEventListener('change', onChange)

    return () => subscription?.remove()
  }, [close])

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
    isOpen ? ref.current?.expand() : ref.current?.close()
    setHideContentFromAccessibility(isOpen)
  }, [isOpen, setHideContentFromAccessibility])

  const {isLandscape} = useDeviceContext()

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => ref.current?.close(), 150)
    }
  }, [ref, isLandscape, isOpen])

  return {
    onChange,
    ref,
    variant,
    onClose: close,
  }
}
