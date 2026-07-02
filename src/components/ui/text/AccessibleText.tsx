import {type ReactNode, type Ref, useMemo} from 'react'
import {Text, type TextProps} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import {getAccessibleLabel} from '@/utils/accessibility/getAccessibleLabel'

export type AccessibleTextProps = {
  children: ReactNode
  ref?: Ref<Text | null>
} & TextProps &
  Partial<TestProps>

export const AccessibleText = ({
  ref,
  children,
  accessibilityLabel: explicitAccessibilityLabel,
  ...props
}: AccessibleTextProps) => {
  const accessibilityLabel = useMemo(
    () =>
      getAccessibleLabel({
        accessibilityLabel: explicitAccessibilityLabel,
        children,
      }),
    [children, explicitAccessibilityLabel],
  )

  return (
    <Text
      accessibilityLabel={accessibilityLabel}
      accessible
      ref={ref}
      {...props}>
      {children}
    </Text>
  )
}
