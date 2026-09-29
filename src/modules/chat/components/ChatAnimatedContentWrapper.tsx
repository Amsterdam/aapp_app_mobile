import {ReactNode} from 'react'
import {StyleSheet} from 'react-native'
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated'
import {useChat} from '@/modules/chat/exports/useChat'
import {useTheme} from '@/themes/useTheme'

type Props = {
  children: ReactNode
}

export const ChatAnimatedContentWrapper = ({children}: Props) => {
  const {isMaximized} = useChat()
  const {duration} = useTheme()
  const styles = createStyles()

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: withTiming(isMaximized ? 1 : 0, {
      duration: duration.transition.short,
    }),
  }))

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      {children}
    </Animated.View>
  )
}

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
    },
  })
