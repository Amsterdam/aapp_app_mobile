import {useEffect} from 'react'
import {BackHandler} from 'react-native'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'

export const useCloseBottomSheetOnBackPress = () => {
  const {close, isOpen} = useBottomSheet()

  useEffect(() => {
    const onBackPress = () => {
      if (isOpen) {
        close()

        return true // prevent default back action
      }

      return false
    }
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    )

    return () => subscription.remove()
  }, [isOpen, close])
}
