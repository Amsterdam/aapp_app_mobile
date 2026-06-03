import {useEffect, useState} from 'react'
import {
  StyleSheet,
  Platform,
  View,
  Image,
  type ImageSourcePropType,
} from 'react-native'
import {GestureDetector} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import type {ImageProps} from '@/components/ui/media/Image'
import type {Theme} from '@/themes/themes'
import type {ImageAspectRatio} from '@/themes/tokens/media'
import {useImageViewerGestures} from '@/components/features/image-viewer/hooks/useImageViewerGestures'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useThemable} from '@/themes/useThemable'

const getUriFromImageSourcePropType = (source: ImageSourcePropType) => {
  if (typeof source === 'number') {
    return
  }

  if (Array.isArray(source)) {
    return source[0].uri
  }

  if (typeof source === 'string') {
    return source
  }

  if (typeof source === 'object' && 'uri' in source) {
    return source.uri
  }
}

export const ImageViewer = ({aspectRatio, ...imageProps}: ImageProps) => {
  const {width, height, isPortrait} = useDeviceContext()
  const [imageLayout, setImageLayout] = useState({width: 0, height: 0})
  const {gestures, animatedStyle} = useImageViewerGestures(imageLayout)
  const [sourceAspectRatio, setSourceAspectRatio] = useState<
    number | ImageAspectRatio | undefined
  >(aspectRatio)

  const styles = useThemable(
    createStyles(Math.min(height, width), sourceAspectRatio),
  )

  useEffect(() => {
    if (!imageProps.source) {
      return
    }

    const uri = getUriFromImageSourcePropType(imageProps.source)

    if (uri) {
      Image.getSize(uri, (w, h) => setSourceAspectRatio(w / h))
    }
  }, [imageProps.source])

  return (
    <GestureDetector gesture={gestures}>
      <View
        accessibilityHint="Tik om terug te gaan"
        accessibilityRole="button"
        accessible
        style={styles.container}>
        <Animated.Image
          accessibilityHint="Maak een knijpgebaar of dubbel tik om in- en uit te zoomen, of sleep om de afbeelding te bewegen."
          accessibilityLabel={
            imageProps.accessibilityLabel ?? imageProps.alt ?? ''
          }
          accessibilityRole="image"
          accessible
          onLayout={({nativeEvent: {layout}}) => setImageLayout(layout)}
          resizeMode="contain"
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
  (minDimension: number, aspectRatio: number | ImageAspectRatio = 'wide') =>
  (theme: Theme) => {
    const aspectRatioValue =
      typeof aspectRatio === 'number'
        ? aspectRatio
        : theme.media.aspectRatio[aspectRatio]

    const altDimension =
      Platform.OS === 'android' && minDimension && aspectRatioValue > 0
        ? minDimension / aspectRatioValue
        : undefined

    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.color.text.default,
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
