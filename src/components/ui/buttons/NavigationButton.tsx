import {ReactNode} from 'react'
import {TextProps} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {MainAxisAlignment} from '@/components/ui/layout/types'
import {Icon, type IconProps} from '@/components/ui/media/Icon'
import {Phrase, PhraseProps} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {SpacingTokens} from '@/themes/tokens/size'

type Props = {
  Icon?: ReactNode
  accessibilityLabel?: string
  accessibilityLanguage?: TextProps['accessibilityLanguage']
  accessibilityRole?: 'link' | 'button'
  border?: boolean
  chevronColor?: keyof Theme['color']['text']
  chevronSize?: IconProps['size']
  color?: keyof Theme['color']['text']
  description?: string
  direction?: 'backward' | 'forward'
  emphasis?: PhraseProps['emphasis']
  horizontallyAlign?: MainAxisAlignment
  icon?: IconProps
  insetHorizontal?: keyof SpacingTokens
  insetVertical?: keyof SpacingTokens
  isDescriptionBelowIcon?: boolean
  onPress: () => void
  title: string
} & TestProps

export const NavigationButton = ({
  color = 'link',
  description,
  direction = 'forward',
  emphasis = 'strong',
  horizontallyAlign = 'between',
  icon,
  chevronColor = 'link',
  chevronSize = 'lgx',
  insetHorizontal = 'md',
  insetVertical = 'sm',
  isDescriptionBelowIcon = true,
  title,
  onPress,
  testID,
  accessibilityRole = 'link',
  accessibilityLanguage = 'nl-NL',
  accessibilityLabel,
  border = false,
  ...props
}: Props) => (
  <Pressable
    accessibilityLabel={accessibilityLabel}
    accessibilityLanguage={accessibilityLanguage}
    accessibilityRole={accessibilityRole}
    onPress={onPress}
    testID={testID}>
    <Box
      {...(border && {
        borderColor: 'default',
        borderStyle: 'solid',
        borderWidth: 'md',
      })}
      insetHorizontal={insetHorizontal}
      insetVertical={insetVertical}>
      <Row
        align={horizontallyAlign}
        gutter="md">
        {direction === 'backward' && (
          <Icon
            color={chevronColor}
            name="chevron-left"
            size={chevronSize}
            testID={`${testID}Icon`}
          />
        )}
        <Column shrink={1}>
          <Row
            gutter="md"
            shrink={0}>
            {!!icon && (
              <Icon
                size="lg"
                {...icon}
                color={color}
                testID={`${testID}Icon`}
              />
            )}
            {!!props.Icon && !icon ? props.Icon : null}
            <Column shrink={1}>
              {emphasis === 'strong' ? (
                <Title
                  color={color}
                  level="h5"
                  testID="NavigationButtonTitle"
                  text={title}
                />
              ) : (
                <Phrase
                  color={color}
                  testID="NavigationButtonTitle">
                  {title}
                </Phrase>
              )}
              {!!description && !isDescriptionBelowIcon && (
                <Phrase testID="NavigationButtonDescription">
                  {description}
                </Phrase>
              )}
            </Column>
          </Row>
          {!!description && !!isDescriptionBelowIcon && (
            <Phrase testID="NavigationButtonDescription">{description}</Phrase>
          )}
        </Column>
        {direction === 'forward' && (
          <Icon
            color={chevronColor}
            name="chevron-right"
            size={chevronSize}
            testID={`${testID}Icon`}
          />
        )}
      </Row>
    </Box>
  </Pressable>
)
