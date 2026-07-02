import {StatusBar, StyleSheet, View} from 'react-native'
import {
  useSafeAreaInsets,
  type EdgeInsets,
} from 'react-native-safe-area-context'
import type {NavigationProps} from '@/app/navigation/types'
import type {Theme} from '@/themes/themes'
import {ImageViewer} from '@/components/features/image-viewer/ImageViewer'
import {Screen} from '@/components/features/screen/Screen'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeModalName} from '@/modules/home/routes'
import {useThemable} from '@/themes/useThemable'

type Props = NavigationProps<HomeModalName.imageViewer>

export const ImageViewerScreen = ({route}: Props) => {
  const {goBack} = useNavigation()
  const {top, right} = useSafeAreaInsets()

  const styles = useThemable(createStyles(top, right))

  return (
    <Screen
      scroll={false}
      testID="ImageViewerScreen"
      withBottomInset={false}
      withLeftInset={false}
      withRightInset={false}
      withTopInset={false}>
      <StatusBar barStyle="light-content" />
      <View style={styles.backButtonContainer}>
        <IconButton
          border
          icon={
            <Icon
              color="link"
              name="close"
            />
          }
          inset="sm"
          onPress={goBack}
          testID="ImageViewerScreenCloseButton"
          variant="tertiary"
        />
      </View>

      <ImageViewer {...route.params} />
    </Screen>
  )
}

const createStyles =
  (top: EdgeInsets['top'], right: EdgeInsets['right']) => (theme: Theme) =>
    StyleSheet.create({
      backButtonContainer: {
        position: 'absolute',
        top: theme.size.spacing.md + top,
        right: theme.size.spacing.md + right,
        zIndex: theme.z.overlay,
      },
    })
