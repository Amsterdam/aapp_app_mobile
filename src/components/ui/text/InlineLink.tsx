import {type ReactNode} from 'react'
import type {AccessibilityProps} from 'react-native'
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
  flexShrink?: number
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
    'ellipsizeMode' | 'numberOfLines' | 'logging-label' | 'textAlign'
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
  isInverse,
  onPress,
  phraseVariant,
  logAction = PiwikAction.buttonPress,
  testID,
  variant = 'internal',
  actionIcon,
  ...otherProps
}: InlineLinkProps) => {
  const onEvent = usePiwikTrackCustomEventFromProps({
    ...otherProps,
    testID,
    logAction,
    onEvent: onPress,
  })

  const icon = VARIANT_ICON_MAP[variant]

  if (!icon) {
    return null
  }

  const {placement = 'end'} = icon

  const iconProps = variant === 'action' ? (actionIcon ?? icon) : icon

  const color = isInverse ? 'inverse' : 'link'

  const IconComponent = (
    <Icon
      color={color}
      containerPhraseVariant={phraseVariant}
      size={phraseVariant === 'intro' ? 'ml' : 'md'}
      testID={`${testID}Icon`}
      {...iconProps}
    />
  )

  return (
    <Phrase
      accessibilityRole={variant === 'external' ? 'link' : accessibilityRole}
      color={color}
      onPress={onEvent}
      testID={testID}
      variant={phraseVariant}
      {...otherProps}>
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
}
