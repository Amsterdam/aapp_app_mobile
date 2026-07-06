import {LayoutAnimation} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {
  AlertBase,
  type AlertBaseProps,
} from '@/components/ui/feedback/alert/AlertBase'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useAlert} from '@/store/slices/alert'
import {getAccessibleLabel} from '@/utils/accessibility/getAccessibleLabel'
import {isEmptyObject} from '@/utils/object'

export const AlertTopOfScreen = ({
  inset = 'md',
}: {
  inset?: AlertBaseProps['inset']
}) => {
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const {resetAlert, alert} = useAlert()

  const onPress = () => {
    if (!isReduceMotionEnabled) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }

    resetAlert()
  }

  useBlurEffect(resetAlert)

  if (isEmptyObject(alert)) {
    return null
  }

  return (
    <Pressable
      accessibilityHint="Tik om deze melding te sluiten."
      accessibilityLabel={getAccessibleLabel({
        children: alert.children ?? (
          <>
            {alert.title}
            {alert.text}
          </>
        ),
      })}
      onPress={onPress}
      testID={alert.testID}
      variant="transparent">
      <AlertBase
        {...alert}
        hasCloseIcon
        hasIcon
        inset={inset}
      />
    </Pressable>
  )
}
