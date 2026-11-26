import {type ReactNode} from 'react'
import type {AccessibilityProps} from 'react-native'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Icon, type IconProps} from '@/components/ui/media/Icon'
import {Phrase, type PhraseProps} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'
import {usePiwikTrackCustomEventFromProps} from '@/processes/piwik/hooks/usePiwikTrackCustomEventFromProps'
import {type LogProps, PiwikAction} from '@/processes/piwik/types'

/**
 * internal: navigates to another screen within the app.
 * external: opens a link outside the app.
 * action: performs an action within the app.
 * disclosure: opens additional content or a choice in a bottom sheet. When used to change the active context, the label must clearly state what the user can choose or change (context selector).
 */
type InlineLinkVariant = 'internal' | 'external' | 'action' | 'disclosure'

type ConfigurableIconProps = Omit<IconProps, 'size' | 'path' | 'color'>

export type InlineLinkProps = {
  children: ReactNode
  /**
   * Preserves text flow when embedded inside another text element.
   * Native text accessibility limitations still apply.
   */
  isInline?: boolean
  /**
   * Inverts the color when set to true.
   */
  isInverse?: boolean
  onPress: () => void
  /**
   * The variant of the text in the link
   */
  phraseVariant?: PhraseProps['variant']
} & TestProps &
  Pick<
    PhraseProps,
    | 'ellipsizeMode'
    | 'flexShrink'
    | 'logging-label'
    | 'numberOfLines'
    | 'textAlign'
  > &
  AccessibilityProps &
  LogProps &
  (
    | {actionIcon?: never; variant?: InlineLinkVariant}
    | {actionIcon: ConfigurableIconProps; variant: 'action'}
  )

const VARIANT_ICON_MAP: Record<
  InlineLinkVariant,
  ConfigurableIconProps & {placement?: 'start' | 'end'}
> = {
  external: {
    name: 'link-external',
  },
  internal: {
    name: 'chevron-right',
  },
  action: {
    name: 'info',
    placement: 'start',
  },
  disclosure: {
    name: 'chevron-down',
  },
} as const

export const InlineLink = ({
  accessibilityRole = 'button',
  children,
  isInline = false,
  isInverse,
  onPress,
  phraseVariant = 'body',
  logAction = PiwikAction.buttonPress,
  testID,
  variant = 'internal',
  actionIcon,
  ellipsizeMode,
  flexShrink = 1,
  numberOfLines,
  textAlign,
  ...otherProps
}: InlineLinkProps) => {
  const onEvent = usePiwikTrackCustomEventFromProps({
    ...otherProps,
    testID,
    logAction,
    onEvent: onPress,
  })

  const icon = VARIANT_ICON_MAP[variant]

  const {placement = 'end'} = icon

  const iconProps = variant === 'action' ? (actionIcon ?? icon) : icon

  const color = isInverse ? 'inverse' : 'link'
  const resolvedAccessibilityRole =
    variant === 'external' ? 'link' : accessibilityRole

  const IconComponent = (
    <Icon
      color={color}
      containerPhraseVariant={phraseVariant}
      size={phraseVariant === 'intro' ? 'ml' : 'md'}
      testID={`${testID}Icon`}
      {...iconProps}
    />
  )

  const phrase = (
    <Phrase
      {...(isInline ? otherProps : {})}
      accessibilityRole={isInline ? resolvedAccessibilityRole : undefined}
      accessible={isInline ? (otherProps.accessible ?? true) : false}
      color={color}
      ellipsizeMode={ellipsizeMode}
      flexShrink={flexShrink}
      numberOfLines={numberOfLines}
      onPress={isInline ? onEvent : undefined}
      testID={isInline ? testID : `${testID}Phrase`}
      textAlign={textAlign}
      variant={phraseVariant}>
      {placement === 'start' && (
        <>
          {IconComponent}
          <Gutter width="xs" />
        </>
      )}
      {children}
      {placement === 'end' && (
        <>
          <Gutter width="xs" />
          {IconComponent}
        </>
      )}
    </Phrase>
  )

  if (isInline) {
    return phrase
  }

  return (
    <PressableBase
      accessibilityRole={resolvedAccessibilityRole}
      logAction={logAction}
      onPress={onPress}
      style={{flexShrink}}
      testID={testID}
      {...otherProps}>
      {phrase}
    </PressableBase>
  )
}
