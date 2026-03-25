import {useContext, useEffect} from 'react'
import {BackHandler} from 'react-native'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'

export const useCloseBottomSheetOnBackPress = () => {
  const {close, isOpen} = useContext(BottomSheetContext)

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
