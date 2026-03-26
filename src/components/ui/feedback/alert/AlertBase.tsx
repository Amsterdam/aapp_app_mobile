import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import type {AlertProps} from '@/components/ui/feedback/alert/Alert.types'
import type {ModuleSlug} from '@/modules/slugs'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Link} from '@/components/ui/text/Link'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {Theme} from '@/themes/themes'
import {SpacingTokens} from '@/themes/tokens/size'
import {useThemable} from '@/themes/useThemable'
import {Duration} from '@/types/duration'
import {accessibleText} from '@/utils/accessibility/accessibleText'

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
  link,
  title,
  variant = AlertVariant.information,
}: AlertBaseProps) => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)
  const iconName = alertVariantIcon[variant]
  const styles = useThemable(createStyles(variant, hasIcon))
  const {navigate} = useNavigation()

  const hasContent = !!text || !!title || !!children

  if (!hasContent) {
    return null
  }

  return (
    <Wrapper inset={inset}>
      <View
        accessibilityLanguage="nl-NL"
        accessibilityRole="alert"
        accessible
        ref={setAccessibilityFocus}
        style={styles.outerContainer}
        testID={testID}>
        {!!hasIcon && (
          <View style={[styles.iconWrapper, styles.variantBackground]}>
            <Icon
              color="inverse"
              isFilled
              name={iconName}
              size="lg"
              testID={`${testID}Icon`}
            />
          </View>
        )}
        <View style={styles.innerContainer}>
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
                <Column
                  gutter="sm"
                  shrink={1}>
                  {!!title && (
                    <Title
                      level="h5"
                      text={title}
                    />
                  )}
                  {!!text && typeof text === 'string' ? (
                    <Paragraph>{text}</Paragraph>
                  ) : (
                    text
                  )}
                </Column>
              </SingleSelectable>
            </Row>
          )}

          {!!link && (
            <Link
              label={link.label}
              onPress={e => {
                e?.preventDefault()

                if (Array.isArray(link.to)) {
                  navigate(...(link.to as [ModuleSlug, never]))
                } else {
                  navigate(link.to as never)
                }
              }}
              testID={`${testID}Link`}
              variant="forward"
            />
          )}
        </View>
        {!!hasCloseIcon && (
          <View style={styles.iconWrapper}>
            <Icon
              name="close"
              size="ml"
              testID={`${testID}CloseIcon`}
            />
          </View>
        )}
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
  (variant: AlertVariant, hasIcon: boolean) =>
  ({color, size, border}: Theme) =>
    StyleSheet.create({
      iconWrapper: {
        paddingHorizontal: size.spacing.smd,
        paddingVertical: size.spacing.md,
      },
      variantBackground: {
        backgroundColor: color.alert[variant].border,
      },
      outerContainer: {
        backgroundColor: color.alert[variant].background,
        borderWidth: border.width.xl,
        borderLeftWidth: hasIcon ? 0 : undefined,
        borderColor: color.alert[variant].border,
        flexDirection: 'row',
      },
      innerContainer: {
        paddingHorizontal: size.spacing.lg,
        paddingVertical: size.spacing.md,
        gap: size.spacing.sm,
        flex: 1,
      },
    })
