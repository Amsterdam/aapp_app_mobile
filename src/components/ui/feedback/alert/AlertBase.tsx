import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import type {AlertProps} from '@/components/ui/feedback/alert/Alert.types'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'
import {Duration} from '@/types/duration'
import {accessibleText} from '@/utils/accessibility/accessibleText'

const TEXT_ALIGN_CORRECTION = 3

export type AlertBaseProps = {
  accessibilityLabel?: string
  inset?: keyof SpacingTokens
} & AlertProps

type WrapperProps = {
  children: ReactNode
  inset: AlertBaseProps['inset']
}

const Wrapper = ({children, inset}: WrapperProps) => {
  if (inset !== undefined) {
    return <Box inset={inset}>{children}</Box>
  }

  return <>{children}</>
}

/**
 * Display alert messages to the user without being able to dismiss.
 */
export const AlertBase = ({
  accessibilityLabel,
  children,
  hasCloseIcon = false,
  inset,
  testID,
  hasIcon = false,
  text,
  title,
  variant = AlertVariant.information,
}: AlertBaseProps) => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)
  const iconName = alertVariantIcon[variant]
  const styles = useThemable(createStyles(variant))

  const hasContent = !!text || !!title || !!children

  if (!hasContent) {
    return null
  }

  return (
    <Wrapper inset={inset}>
      <View testID={`${testID}Wrapper`}>
        <View
          accessibilityLanguage="nl-NL"
          accessibilityRole="alert"
          accessible
          ref={setAccessibilityFocus}
          style={styles?.view}
          testID={testID}>
          {children ?? (
            <Row
              align="between"
              valign="start">
              <SingleSelectable
                accessibilityLabel={
                  accessibilityLabel ??
                  (typeof text === 'string'
                    ? accessibleText(title, text)
                    : undefined)
                }
                accessibilityLanguage="nl-NL"
                accessibilityRole="alert">
                <Row
                  gutter="md"
                  valign="start">
                  {!!hasIcon && (
                    <View style={styles?.iconWrapper}>
                      <Icon
                        name={iconName}
                        size="lg"
                        testID={`${testID}Icon`}
                      />
                    </View>
                  )}
                  <Column shrink={1}>
                    {!!title && (
                      <Title
                        level="h4"
                        text={title}
                      />
                    )}
                    {!!text && typeof text === 'string' ? (
                      <Paragraph>{text}</Paragraph>
                    ) : (
                      text
                    )}
                  </Column>
                </Row>
              </SingleSelectable>
              {!!hasCloseIcon && (
                <View>
                  <Icon
                    name="close"
                    size="lg"
                    testID={`${testID}CloseIcon`}
                  />
                </View>
              )}
            </Row>
          )}
        </View>
      </View>
    </Wrapper>
  )
}

const alertVariantIcon: Record<AlertVariant, SvgIconName> = {
  [AlertVariant.information]: 'info',
  [AlertVariant.negative]: 'error',
  [AlertVariant.positive]: 'success',
  [AlertVariant.warning]: 'warning',
}

const createStyles =
  (variant: AlertVariant) =>
  ({color, size}: Theme) => {
    if (!variant) {
      return
    }

    return StyleSheet.create({
      iconWrapper: {
        top: TEXT_ALIGN_CORRECTION,
      },
      view: {
        backgroundColor: color.alert[variant].background,
        borderWidth: 2,
        borderColor: color.alert[variant].border,
        paddingHorizontal: size.spacing.lg,
        paddingVertical: size.spacing.md,
      },
    })
  }
