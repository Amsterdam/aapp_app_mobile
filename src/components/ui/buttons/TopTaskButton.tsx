import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon, IconProps} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export type TopTaskButtonProps = {
  border?: boolean
  flex?: number
  icon: IconProps
  iconRight?: IconProps
  isError?: boolean
  isExternalLink?: boolean
  isInternalLink?: boolean
  text?: ReactNode
  textAdditional?: string
  title?: string
  titleIconName?: SvgIconName
} & Omit<PressableProps, 'children' | 'style'>

export const TopTaskButton = ({
  isExternalLink,
  isInternalLink,
  isError = false,
  icon,
  iconRight,
  onPress,
  text,
  textAdditional,
  title,
  titleIconName,
  testID,
  accessibilityRole = 'button',
  insetHorizontal = 'md',
  insetVertical = 'sm',
  variant = 'tertiary',
  ...pressableProps
}: TopTaskButtonProps) => {
  const styles = useThemable(createStyles)

  const colorTitleAndIconLeft =
    variant === 'transparentInverse' ? 'inverse' : 'link'
  const colorDescriptionAndIconRight =
    variant === 'transparentInverse' ? 'inverse' : 'secondary'

  return (
    <Pressable
      accessibilityHint={isExternalLink ? 'Opent in webbrowser' : undefined}
      accessibilityLabel={accessibleText(
        title,
        typeof text === 'string' ? text : '',
      )}
      accessibilityLanguage="nl-NL"
      accessibilityRole={isExternalLink ? 'link' : accessibilityRole}
      onPress={onPress}
      testID={testID}
      {...pressableProps}
      insetHorizontal={insetHorizontal}
      insetVertical={insetVertical}
      variant={variant}>
      <Row gutter="md">
        <View style={styles.height}>
          <HideFromAccessibility>
            <Icon
              size="xl"
              {...icon}
              color={colorTitleAndIconLeft}
              testID={`${testID}Icon`}
            />
          </HideFromAccessibility>
        </View>
        <Column
          align="center"
          grow={1}
          shrink={1}>
          <Row gutter="sm">
            {!!title && (
              <Title
                color={colorTitleAndIconLeft}
                level="h5"
                testID={`${testID}Title`}
                text={title}
              />
            )}
            {!!titleIconName && (
              <Icon
                color={colorTitleAndIconLeft}
                name={titleIconName}
                testID={`${testID}TitleIcon`}
              />
            )}
          </Row>
          {typeof text === 'string' ? (
            <Paragraph
              color={
                variant === 'transparentInverse'
                  ? 'inverse'
                  : isError
                    ? 'warning'
                    : undefined
              }
              testID={`${testID}Text`}
              variant="small">
              {text}
            </Paragraph>
          ) : (
            text
          )}
          {!!textAdditional && (
            <Paragraph
              color={colorDescriptionAndIconRight}
              testID={`${testID}AdditionalText`}
              variant="small">
              {textAdditional}
            </Paragraph>
          )}
        </Column>
        {!!isExternalLink && (
          <Icon
            color={colorDescriptionAndIconRight}
            name="link-external"
          />
        )}
        {!!isInternalLink && (
          <Icon
            color={colorDescriptionAndIconRight}
            name="chevron-right"
          />
        )}
        {!!iconRight && (
          <View style={styles.height}>
            <HideFromAccessibility>
              <Icon
                size="xl"
                {...iconRight}
                color={colorDescriptionAndIconRight}
                testID={`${testID}Icon`}
              />
            </HideFromAccessibility>
          </View>
        )}
      </Row>
    </Pressable>
  )
}

const createStyles = ({text}: Theme) =>
  StyleSheet.create({
    height: {
      justifyContent: 'center',
      height: text.lineHeight.h5 + text.lineHeight.small,
    },
  })
