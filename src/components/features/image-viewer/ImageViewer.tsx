import {useState} from 'react'
import {StyleSheet, Platform, View} from 'react-native'
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
  const {width, height, isPortrait} = useDeviceContext()
  const [initialLayout, setInitialLayout] = useState({width: 0, height: 0})
  const {gestures, animatedStyle} = useImageViewerGestures(initialLayout)
  const styles = useThemable(createStyles(Math.min(height, width), aspectRatio))

  return (
    <GestureDetector gesture={gestures}>
      <View
        accessibilityHint="Tik om terug te gaan"
        accessibilityRole="button"
        accessible
        style={styles.container}>
        <Animated.Image
          accessibilityLabel="Maak een knijpgebaar of dubbel tik om in- en uit te zoomen, of sleep om de afbeelding te bewegen."
          accessibilityRole="image"
          accessible
          onLayout={({nativeEvent: {layout}}) => setInitialLayout(layout)}
          {...imageProps}
          style={[
            styles.image,
            isPortrait ? styles.portrait : styles.landscape,
            animatedStyle,
          ]}
        />
      </View>
    </GestureDetector>
  )
}

const createStyles =
  (minDimension: number, aspectRatio: ImageAspectRatio = 'wide') =>
  (theme: Theme) => {
    const aspectRatioValue = theme.media.aspectRatio[aspectRatio]

    const altDimension =
      Platform.OS === 'android' && minDimension && aspectRatioValue > 0
        ? minDimension / aspectRatioValue
        : undefined

    return StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: minDimension,
        backgroundColor: theme.color.imageFallback.background,
        aspectRatio: aspectRatioValue,
      },
      portrait: {
        width: minDimension,
        height: altDimension,
      },
      landscape: {
        width: altDimension,
        height: minDimension,
      },
    })
  }
