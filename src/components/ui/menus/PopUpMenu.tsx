import {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated'
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context'
import {PopUpMenuItem} from '@/components/ui/menus/PopUpMenuItem'
import {PopupMenuItem, PopupMenuOrientation} from '@/components/ui/menus/types'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useSelector} from '@/hooks/redux/useSelector'
import {ScreenContext} from '@/providers/screen.context'
import {useMenu} from '@/store/slices/menu'
import {selectHeaderHeight} from '@/store/slices/screen'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'
import {Duration} from '@/types/duration'

type Props = {
  menuItems: PopupMenuItem[]
  orientation: PopupMenuOrientation
  /**
   * only set this if you want to override the automatic top inset
   */
  topInset?: number
}

export const PopUpMenu = ({menuItems, orientation, topInset}: Props) => {
  const {close, isOpen} = useMenu()
  const theme = useTheme()
  const setAccessibilityFocus = useAccessibilityFocus(Duration.normal)
  const {nativeScreenHeader} = useContext(ScreenContext)
  const headerHeight = useSelector(selectHeaderHeight)
  const insets = useSafeAreaInsets()

  const sheetStyles = createStyles(theme, orientation, {
    [orientation]: insets[orientation],
    top: topInset || (nativeScreenHeader ? 0 : headerHeight),
  })

  useBlurEffect(() => close())

  return isOpen ? (
    <Animated.View
      entering={FadeIn.duration(theme.duration.transition.short)}
      exiting={FadeOut.duration(theme.duration.transition.short)}
      style={sheetStyles.container}>
      <View>
        {menuItems.map((item, index) => {
          const {color, label, onPress, testID} = item

          return (
            <PopUpMenuItem
              color={color}
              key={testID}
              label={label}
              onPress={onPress}
              ref={ref => {
                if (index === 0) {
                  setAccessibilityFocus(ref)
                }
              }}
              testID={testID}
            />
          )
        })}
      </View>
    </Animated.View>
  ) : null
}

const createStyles = (
  {color, z, size}: Theme,
  orientation: PopupMenuOrientation,
  insets: Partial<EdgeInsets>,
) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexShrink: 1,
      position: 'absolute',
      [orientation]: size.spacing.sm,
      top: insets.top,
      marginLeft: insets.left,
      marginRight: insets.right,
      backgroundColor: color.box.background.distinct,
      zIndex: z.tooltip,
      elevation: 2,
      shadowColor: color.shadow.default,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
      shadowOpacity: 0.3,
    },
  })
