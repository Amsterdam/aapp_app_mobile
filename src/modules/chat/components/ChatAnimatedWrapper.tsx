import {ReactNode, useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import Animated, {
  interpolate,
  interpolateColor,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {ChatMenu} from '@/modules/chat/components/ChatMenu'
import {useChatContext} from '@/modules/chat/providers/chat.context'
import {useChat} from '@/modules/chat/slice'
import {useScreen} from '@/store/slices/screen'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

const CHAT_MINIMIZED_HEIGHT = 60
const HEIGHT_CORRECTION = 8 // TODO: don't know why needed, refactor later
const BOUNCE_HEIGHT = 25

type Props = {
  children: ReactNode
}

export const ChatAnimatedWrapper = ({children}: Props) => {
  const theme = useTheme()
  const {isOpen} = useBottomSheet()

  const {isMaximized} = useChat()
  const [maxHeight, setMaxHeight] = useState(0)
  const height = useSharedValue(0)
  const bounce = useSharedValue(0)
  const maximized = useSharedValue(isMaximized ? 1 : 0)
  const insets = useSafeAreaInsets()
  const {fontScale} = useDeviceContext()
  const {newMessagesCount} = useChatContext()

  const {setSpaceBottom: setScreenSpaceBottom} = useScreen()
  const styles = createStyles(theme, insets)
  const minimizedHeight = CHAT_MINIMIZED_HEIGHT * fontScale + insets.bottom

  useEffect(() => {
    maximized.value = withTiming(isMaximized ? 1 : 0)
  }, [isMaximized, maximized])

  useEffect(() => {
    setScreenSpaceBottom(minimizedHeight - HEIGHT_CORRECTION)

    return () => {
      setScreenSpaceBottom(0)
    }
  }, [minimizedHeight, setScreenSpaceBottom])

  useEffect(() => {
    if (newMessagesCount > 0 && !isMaximized && !isOpen) {
      bounce.value = withRepeat(
        withSequence(
          withTiming(-BOUNCE_HEIGHT, {
            duration: 400,
          }),
          withSpring(0, {
            duration: 1000,
            dampingRatio: 0.3,
          }),
          withTiming(0, {
            duration: 3000,
          }),
        ),
        -1,
      )
    } else {
      bounce.value = 0
    }
  }, [bounce, isMaximized, isOpen, newMessagesCount])

  useEffect(() => {
    height.value = withTiming(
      isMaximized ? 0 : maxHeight - (isOpen ? 0 : minimizedHeight),
    )
  }, [isMaximized, height, maxHeight, isOpen, minimizedHeight])

  const animatedStylesOuter = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: height.value + bounce.value,
      },
    ],
    backgroundColor: interpolateColor(
      maximized.value,
      [0, 1],
      [
        theme.color.chat.minimized.background,
        theme.color.chat.maximized.background,
      ],
    ),
    borderTopColor: interpolateColor(
      maximized.value,
      [0, 1],
      [theme.color.chat.border, 'transparent'],
    ),
    borderTopWidth: interpolate(
      maximized.value,
      [0, 1],
      [theme.border.width.md, 0],
    ),
  }))

  const animatedStylesInner = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(maximized.value, [0, 1], [-insets.top, 0]),
      },
    ],
  }))

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideOutDown}
      onLayout={e => {
        setMaxHeight(e.nativeEvent.layout.height)
      }}
      style={[StyleSheet.absoluteFill, styles.container, animatedStylesOuter]}>
      <ChatMenu />
      <Animated.View style={[styles.inner, animatedStylesInner]}>
        {children}
      </Animated.View>
    </Animated.View>
  )
}

const createStyles = ({z}: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      zIndex: z.overlay - 1,
    },
    inner: {
      flexGrow: 1,
    },
  })
