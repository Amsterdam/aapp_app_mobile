import {useState} from 'react'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {
  AlertBase,
  type AlertBaseProps,
} from '@/components/ui/feedback/alert/AlertBase'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {isEmptyObject} from '@/utils/object'

/**
 * Inline alert that can be dismissed by the user.
 */
export const AlertInline = ({...alert}: AlertBaseProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useBlurEffect(() => setIsVisible(false))

  if (isEmptyObject(alert)) {
    return null
  }

  if (!isVisible) {
    return null
  }

  return (
    <Pressable
      onPress={() => setIsVisible(false)}
      testID={alert.testID}
      variant="transparent">
      <AlertBase
        hasCloseIcon
        hasIcon
        inset="md"
        {...alert}
      />
    </Pressable>
  )
}
