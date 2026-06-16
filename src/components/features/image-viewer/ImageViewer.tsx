import {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {GestureDetector} from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import type {ImageProps} from '@/components/ui/media/Image'
import type {Theme} from '@/themes/themes'
import type {ImageAspectRatio} from '@/themes/tokens/media'
import {useImageViewerGestures} from '@/components/features/image-viewer/hooks/useImageViewerGestures'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useThemable} from '@/themes/useThemable'
import {getAspectRatioFromImageSourcePropType} from '@/utils/getAspectRatioFromImageSourcePropType'

export const ImageViewer = ({aspectRatio, ...imageProps}: ImageProps) => {
  const {width, height} = useDeviceContext()
  const navigation = useNavigation()
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
        accessibilityHint="Dubbel tik om terug te gaan"
        accessibilityRole="button"
        accessible
        onAccessibilityTap={() => navigation.goBack()}
        style={styles.container}>
        <Animated.Image
          accessibilityLabel={`Vergrote ${imageProps.accessibilityLabel ?? imageProps.alt ?? ''}`}
          accessibilityRole="image"
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
    deviceWidth: number,
    deviceHeight: number,
    imageAspectRatio: number | ImageAspectRatio = 'wide',
  ) =>
  (theme: Theme) => {
    const aspectRatioValue =
      typeof imageAspectRatio === 'number'
        ? imageAspectRatio
        : theme.media.aspectRatio[imageAspectRatio]
    const deviceAspectRatio = deviceWidth / deviceHeight
    const isImageWiderThanDevice = aspectRatioValue > deviceAspectRatio

    let width: number
    let height: number

    if (isImageWiderThanDevice) {
      height = deviceWidth / aspectRatioValue
      width = deviceWidth
    } else {
      height = deviceHeight
      width = deviceHeight * aspectRatioValue
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
