import {View, type AccessibilityProps} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'

type Props = {
  children: React.ReactNode
  hideDescendants?: boolean
} & AccessibilityProps

export const AccessibilityGroup = ({
  children,
  hideDescendants = true,
  ...props
}: Props) => (
  <View
    accessible
    {...props}>
    <HideFromAccessibility hide={hideDescendants}>
      {children}
    </HideFromAccessibility>
  </View>
)
