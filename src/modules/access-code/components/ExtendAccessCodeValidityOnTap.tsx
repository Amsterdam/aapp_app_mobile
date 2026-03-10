import {ReactNode, useMemo} from 'react'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {scheduleOnRN} from 'react-native-worklets'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'

type Props = {
  children: ReactNode
}

export const ExtendAccessCodeValidityOnTap = ({children}: Props) => {
  const {onExtendAccessCodeValidity} = useEnterAccessCode()

  const gesture = useMemo(
    () =>
      Gesture.Tap().onBegin(() => {
        scheduleOnRN(onExtendAccessCodeValidity)
      }),
    [onExtendAccessCodeValidity],
  )

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>
}
