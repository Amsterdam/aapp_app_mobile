import {StyleSheet, View} from 'react-native'
import type {IconProps} from '@/components/ui/media/Icon'
import type {Theme} from '@/themes/themes'
import type {ReactElement, Ref} from 'react'
import {Pressable, type PressableProps} from '@/components/ui/buttons/Pressable'
import {config} from '@/components/ui/config'
import {Badge, type BadgeProps} from '@/components/ui/feedback/Badge'
import {Row} from '@/components/ui/layout/Row'
import {IconSize} from '@/components/ui/types'
import {useThemable} from '@/themes/useThemable'

type Props = {
  badgeColor?: BadgeProps['color']
  badgeInsetsExtra?: {
    bottom?: number
    left?: number
    right?: number
    top?: number
  }
  /**
   * The value for a badge to be displayed on top of the icon.
   */
  badgeValue?: BadgeProps['value']
  /**
   * The icon component to use for the button.
   */
  icon: ReactElement<IconProps>
  ref?: Ref<View>
} & Omit<PressableProps, 'style' | 'children'>

export const IconButton = ({
  ref,
  badgeColor,
  badgeInsetsExtra,
  badgeValue,
  icon,
  ...pressableProps
}: Props) => {
  const styles = useThemable(createStyles(badgeInsetsExtra))
  const hitSlop = (config.minTouchSize - IconSize[icon.props.size ?? 'md']) / 2

  return (
    <Row align="start">
      <Pressable
        accessibilityLanguage="nl-NL"
        accessibilityRole="button"
        hitSlop={hitSlop}
        ref={ref}
        variant="transparent"
        {...pressableProps}>
        {icon}
        {!!badgeValue && (
          <View style={styles.badgePosition}>
            <Badge
              color={badgeColor}
              testID={`${pressableProps.testID}Badge`}
              value={badgeValue}
              variant="on-icon"
            />
          </View>
        )}
      </Pressable>
    </Row>
  )
}

const createStyles =
  (badgeInsetsExtra?: Props['badgeInsetsExtra']) =>
  ({size}: Theme) => {
    const hitSlopSize = size.spacing.sm
    const {top, right, left} = badgeInsetsExtra ?? {}

    return StyleSheet.create({
      badgePosition: {
        position: 'absolute',
        top: -hitSlopSize + (top ?? 0),
        right: -hitSlopSize + (right ?? 0),
        left: -hitSlopSize + (left ?? 0),
        alignItems: 'flex-end',
      },
    })
  }
