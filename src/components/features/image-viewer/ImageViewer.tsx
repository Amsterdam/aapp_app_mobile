import {StyleSheet, Platform} from 'react-native'
import {GestureDetector} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import type {ImageProps} from '@/components/ui/media/Image'
import type {Theme} from '@/themes/themes'
import type {ImageAspectRatio} from '@/themes/tokens/media'
import {useImageViewerGestures} from '@/components/features/image-viewer/hooks/useImageViewerGestures'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useThemable} from '@/themes/useThemable'

type Props = Omit<ImageProps, 'style'>

export const ImageViewer = ({aspectRatio, ...imageProps}: Props) => {
  const {width, height} = useDeviceContext()
  const {gestures, animatedStyle} = useImageViewerGestures()
  const styles = useThemable(createStyles(Math.min(height, width), aspectRatio))

  return (
    <GestureDetector gesture={gestures}>
      <Animated.Image
        {...imageProps}
        style={[styles.image, animatedStyle]}
      />
    </GestureDetector>
  )
}

const createStyles =
  (width: number, aspectRatio: ImageAspectRatio = 'wide') =>
  (theme: Theme) => {
    const aspectRatioValue = theme.media.aspectRatio[aspectRatio]

    return StyleSheet.create({
      image: {
        width,
        backgroundColor: theme.color.imageFallback.background,
        height:
          Platform.OS === 'android' && width && aspectRatioValue > 0
            ? width / aspectRatioValue
            : undefined,
        aspectRatio: aspectRatioValue,
      },
    })
  }
