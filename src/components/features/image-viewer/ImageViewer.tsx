import {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {GestureDetector} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import type {ImageProps} from '@/components/ui/media/Image'
import type {Theme} from '@/themes/themes'
import type {ImageAspectRatio} from '@/themes/tokens/media'
import {useImageViewerGestures} from '@/components/features/image-viewer/hooks/useImageViewerGestures'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useThemable} from '@/themes/useThemable'
import {getAspectRatioFromImageSourcePropType} from '@/utils/getAspectRatioFromImageSourcePropType'

export const ImageViewer = ({aspectRatio, ...imageProps}: ImageProps) => {
  const {width, height} = useDeviceContext()
  const [imageLayout, setImageLayout] = useState({width: 0, height: 0})
  const {gestures, animatedStyle} = useImageViewerGestures(imageLayout)
  const [sourceAspectRatio, setSourceAspectRatio] = useState<
    number | ImageAspectRatio | undefined
  >(aspectRatio)

  const styles = useThemable(createStyles(width, height, sourceAspectRatio))

  useEffect(() => {
    if (!imageProps.source) {
      return
    }

    void getAspectRatioFromImageSourcePropType(imageProps.source).then(
      setSourceAspectRatio,
    )
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
          style={[styles.image, animatedStyle]}
        />
      </View>
    </GestureDetector>
  )
}

const createStyles =
  (
    width: number,
    height: number,
    imageAspectRatio: number | ImageAspectRatio = 'wide',
  ) =>
  (theme: Theme) => {
    const aspectRatioValue =
      typeof imageAspectRatio === 'number'
        ? imageAspectRatio
        : theme.media.aspectRatio[imageAspectRatio]
    const deviceAspectRatio = width / height
    const isImageWiderThanDevice = aspectRatioValue > deviceAspectRatio

    if (isImageWiderThanDevice) {
      height = width / aspectRatioValue
    } else {
      width = height * aspectRatioValue
    }

    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.color.imageBackground.dark.background,
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        backgroundColor: theme.color.imageBackground.dark.background,
        aspectRatio: aspectRatioValue,
        width,
        height,
      },
    })
  }
