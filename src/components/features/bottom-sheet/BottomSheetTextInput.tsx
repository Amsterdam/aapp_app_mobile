import {useEffect} from 'react'
import {TextInput as TextInputRN} from 'react-native-gesture-handler'
import type {TextInputProps} from '@/components/ui/forms/input/types'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'

export const BottomSheetTextInput = ({
  autoFocus,
  ref,
  ...props
}: TextInputProps) => {
  const {isOpen} = useBottomSheet()

  useEffect(() => {
    if (!isOpen) {
      ref?.current?.blur()
    } else if (autoFocus) {
      setTimeout(() => ref?.current?.focus(), 500)
    }
  }, [autoFocus, isOpen, ref])

  return (
    <TextInputRN
      ref={ref}
      {...props}
    />
  )
}
