import {ReactElement} from 'react'
import {View, StyleSheet} from 'react-native'
import Animated, {FadeOut} from 'react-native-reanimated'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import {HideFromAccessibility} from '@/components/features/accessibility/HideFromAccessibility'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type Props = {
  children?: ReactElement
  isLoading: boolean
}

export const Skeleton = ({children, isLoading}: Props) => {
  const isReduceMotionEnabled = useIsReduceMotionEnabled()
  const theme = useTheme()
  const {skeleton} = theme.color
  const styles = createStyles(theme)

  return (
    <View>
      {!!isLoading && (
        <Animated.View
          exiting={FadeOut}
          style={styles.wrapper}>
          <SkeletonPlaceholder
            backgroundColor={skeleton.background}
            highlightColor={skeleton.highlight}
            // eslint-disable-next-line sonarjs/no-all-duplicated-branches
            speed={isReduceMotionEnabled ? 0 : 0}>
            <SkeletonPlaceholder.Item
              height="100%"
              width="100%"
            />
          </SkeletonPlaceholder>
        </Animated.View>
      )}
      <HideFromAccessibility hide={isLoading}>{children}</HideFromAccessibility>
    </View>
  )
}

const createStyles = ({z}: Theme) =>
  StyleSheet.create({
    wrapper: {
      position: 'absolute',
      flex: 1,
      height: '100%',
      width: '100%',
      zIndex: z.skeleton,
    },
  })
