import {ReactNode, useEffect} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {
  PressableBase,
  PressableBaseProps,
} from '@/components/ui/buttons/PressableBase'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {MeatballsMenuIcon} from '@/components/ui/media/icons/MeatballsMenuIcon'
import {ScreenHeaderTitle} from '@/components/ui/text/ScreenHeaderTitle'
import {NewMessageIndicator} from '@/modules/chat/components/NewMessageIndicator'
import {useChat} from '@/modules/chat/exports/useChat'
import {useMenu} from '@/store/slices/menu'
import {useScreen} from '@/store/slices/screen'
import {useTheme} from '@/themes/useTheme'

type WrapperProps = {
  children: ReactNode
  isMaximized: boolean
  onPress: () => void
} & PressableBaseProps

const PressableWhenMinimized = ({
  children,
  isMaximized,
  onPress,
  style,
  ...viewProps
}: WrapperProps) =>
  isMaximized ? (
    children
  ) : (
    <PressableBase
      {...viewProps}
      onPress={onPress}
      style={style}>
      {children}
    </PressableBase>
  )

export const ChatHeader = () => {
  const {isMaximized, setHeaderHeight, toggleVisibility} = useChat()

  const {close: closeMenu, isOpen: isMenuOpen, toggle: toggleMenu} = useMenu()

  const {setHideFromAccessibility} = useScreen()

  const {color} = useTheme()
  const styles = createStyles()

  const expandIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isMaximized ? '0deg' : '-180deg'),
      },
    ],
  }))
  const menuIconStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isMaximized ? 1 : 0),
  }))

  const onPressToggleVisibility = () => {
    toggleVisibility()
    Keyboard.dismiss()
    closeMenu()
  }

  useEffect(() => {
    setHideFromAccessibility(isMaximized)

    return () => {
      setHideFromAccessibility(false)
    }
  }, [isMaximized, setHideFromAccessibility])

  return (
    <View
      onLayout={layout => setHeaderHeight(layout.nativeEvent.layout.height)}
      style={styles.container}>
      <PressableWhenMinimized
        accessibilityHint="Activeer om de chat te maximaliseren"
        isMaximized={isMaximized}
        onPress={toggleVisibility}
        style={styles.pressableWhenMinimized}
        testID="ChatHeaderMaximizeButton">
        <Box testID="ChatHeader">
          <Row align="between">
            <Animated.View style={menuIconStyle}>
              <IconButton
                accessibilityLabel={`Chat menu ${isMenuOpen ? 'sluiten' : 'openen'}.`}
                icon={
                  <MeatballsMenuIcon
                    color={color.pressable.secondary.default.icon}
                  />
                }
                onPress={toggleMenu}
                pointerEvents={isMaximized ? 'auto' : 'none'}
                testID="ChatHeaderMeatballsMenuButton"
              />
            </Animated.View>
            <View accessible>
              <Row gutter="xs">
                <ScreenHeaderTitle text="Chat" />
                <NewMessageIndicator />
              </Row>
            </View>
            <Animated.View style={expandIconStyle}>
              <IconButton
                accessibilityLabel={`Chat ${isMaximized ? 'minimaliseren' : 'maximaliseren'}`}
                icon={
                  <Icon
                    color="link"
                    name="chevron-down"
                    size="lg"
                    testID="ChatHeaderToggleVisibilityButtonIcon"
                  />
                }
                onPress={onPressToggleVisibility}
                testID="ChatHeaderToggleVisibilityButton"
              />
            </Animated.View>
          </Row>
        </Box>
      </PressableWhenMinimized>
    </View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      zIndex: 1,
    },
    pressableWhenMinimized: {
      flexGrow: 1,
    },
  })
