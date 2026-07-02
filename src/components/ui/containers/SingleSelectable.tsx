import {useMemo} from 'react'
import {StyleSheet, View, ViewProps} from 'react-native'
import {getAccessibleLabel} from '@/utils/accessibility/getAccessibleLabel'

/**
 * Groups its children into a single selectable component for screen readers.
 */
export const SingleSelectable = ({
  children,
  style,
  accessibilityLabel: explicitAccessibilityLabel,
  ...viewProps
}: ViewProps) => {
  const accessibilityLabel = useMemo(
    () =>
      getAccessibleLabel({
        accessibilityLabel: explicitAccessibilityLabel,
        children,
      }),
    [children, explicitAccessibilityLabel],
  )

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityLanguage="nl-NL"
      accessible
      style={[style, styles.singleSelectable]}
      {...viewProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  singleSelectable: {
    flexShrink: 1, // This component usually contains text, so allow shrinking
  },
})
