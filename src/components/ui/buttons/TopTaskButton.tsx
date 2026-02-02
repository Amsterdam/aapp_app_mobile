import {ReactNode} from 'react'
import {StyleSheet, View, type DimensionValue} from 'react-native'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon, IconProps} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {accessibleText} from '@/utils/accessibility/accessibleText'

const DEFAULT_MIN_HEIGHT = 49

export type TopTaskButtonProps = {
  border?: boolean
  flex?: number
  iconName: SvgIconName
  iconRightName?: SvgIconName
  iconRightSize?: IconProps['size']
  iconSize?: IconProps['size']
  isError?: boolean
  isExternalLink?: boolean
  isInternalLink?: boolean
  minHeight?: DimensionValue
  text?: ReactNode
  textAdditional?: string
  title?: string
  titleIconName?: SvgIconName
} & Omit<PressableProps, 'children' | 'style'>

export const TopTaskButton = ({
  isExternalLink,
  isInternalLink,
  isError = false,
  iconName,
  iconRightName,
  iconRightSize = 'xl',
  iconSize = 'xl',
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
  minHeight = DEFAULT_MIN_HEIGHT,
  ...pressableProps
}: TopTaskButtonProps) => {
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
      <View style={[styles.container, {minHeight}]}>
        <Row gutter="md">
          <HideFromAccessibility>
            <Icon
              color={colorTitleAndIconLeft}
              name={iconName}
              size={iconSize}
              testID={`${testID}Icon`}
            />
          </HideFromAccessibility>
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
              name="external-link"
            />
          )}
          {!!isInternalLink && (
            <Icon
              color={colorDescriptionAndIconRight}
              name="chevron-right"
            />
          )}
          {!!iconRightName && (
            <HideFromAccessibility>
              <Icon
                color={colorDescriptionAndIconRight}
                name={iconRightName}
                size={iconRightSize}
                testID={`${testID}Icon`}
              />
            </HideFromAccessibility>
          )}
        </Row>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
})
