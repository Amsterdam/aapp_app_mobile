import {StyleSheet, View} from 'react-native'
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context'
import type {NavigationProps} from '@/app/navigation/types'
import type {Theme} from '@/themes/themes'
import {HeaderBackButton} from '@/components/features/header/HeaderBackButton'
import {ImageViewer} from '@/components/features/image-viewer/ImageViewer'
import {Screen} from '@/components/features/screen/Screen'
import {Center} from '@/components/ui/layout/Center'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useThemable} from '@/themes/useThemable'

type Props = NavigationProps<'ImageViewerScreen'>

export const ImageViewerScreen = ({route}: Props) => {
  const {goBack} = useNavigation()
  const {top} = useSafeAreaInsets()

  const styles = useThemable(createStyles(top))

  return (
    <Screen
      scroll={false}
      testID="ImageViewerScreen">
      <View style={styles.backButtonContainer}>
        <HeaderBackButton onPress={goBack} />
      </View>

      <Center grow>
        <ImageViewer {...route.params} />
      </Center>
    </Screen>
  )
}

const createStyles = (top: EdgeInsets['top']) => (theme: Theme) =>
  StyleSheet.create({
    backButtonContainer: {
      position: 'absolute',
      top: theme.size.spacing.md + top,
      left: theme.size.spacing.md,
      zIndex: theme.z.overlay,
    },
  })
