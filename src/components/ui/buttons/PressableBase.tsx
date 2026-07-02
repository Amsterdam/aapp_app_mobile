import {useMemo, type Ref} from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Pressable as PressableRN,
  // eslint-disable-next-line no-restricted-imports
  type PressableProps as PressableRNProps,
  View,
  type GestureResponderEvent,
} from 'react-native'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {type LogProps, PiwikAction} from '@/processes/piwik/types'
import {getAccessibleLabel} from '@/utils/accessibility/getAccessibleLabel'

export type PressableBaseProps = {
  'logging-label'?: string
  ref?: Ref<View>
} & PressableRNProps &
  LogProps &
  TestProps

/**
 * Used to build other interactive components, do not use on its own.
 * This is a drop in replacement of the React Native Pressable component.
 */
export const PressableBase = ({
  ref,
  children,
  onPress = () => null,
  logAction = PiwikAction.buttonPress,
  onAccessibilityAction,
  accessibilityLabel: explicitAccessibilityLabel,
  ...pressableProps
}: PressableBaseProps) => {
  const onEvent = usePiwikTrackCustomEventFromProps<unknown>({
    ...pressableProps,
    logAction,
  })
  const accessibilityChildren =
    typeof children === 'function' ? undefined : children
  const accessibilityLabel = useMemo(
    () =>
      getAccessibleLabel({
        accessibilityLabel: explicitAccessibilityLabel,
        children: accessibilityChildren,
      }),
    [accessibilityChildren, explicitAccessibilityLabel],
  )

  return (
    <PressableRN
      accessibilityLabel={accessibilityLabel}
      accessibilityLanguage="nl-NL"
      accessibilityRole="button"
      onAccessibilityAction={event => {
        onAccessibilityAction?.(event)
        onEvent(event, {
          nameSuffix: event.nativeEvent.actionName,
          action: PiwikAction.accessibilityAction,
        })
      }}
      onPress={(event: GestureResponderEvent) => {
        onPress?.(event)
        onEvent(event)
      }}
      ref={ref}
      {...pressableProps}>
      {children}
    </PressableRN>
  )
}
