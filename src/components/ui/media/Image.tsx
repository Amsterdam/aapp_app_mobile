import {useCallback, useEffect, useMemo, useState} from 'react'
import {
  ImageErrorEventData,
  Image as ImageRN,
  ImageProps as ImageRNProps,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import {NavigateToImageViewer} from '@/components/ui/media/NavigateToImageViewer'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

// onError function that can be shared between FastImage and Image, since this prop has a different signature for each component
type OnError = (error?: NativeSyntheticEvent<ImageErrorEventData>) => void

// resize modes that are supported by both FastImage and Image
type ImageResizeMode = 'cover' | 'contain' | 'stretch'

// Props supported by both Image and FastImage
type SupportedImageRNProps = Omit<
  ImageRNProps,
  'defaultSource' | 'onError' | 'onLoad' | 'resizeMode' | 'src' | 'srcSet'
> & {
  onError?: OnError
  resizeMode?: ImageResizeMode
}

export type ImageProps = {
  aspectRatio?: ImageAspectRatio
  openInImageViewer?: boolean
} & SupportedImageRNProps

export const Image = ({
  aspectRatio = 'wide',
  onLayout,
  source,
  style,
  openInImageViewer = false,
  ...imageProps
}: ImageProps) => {
  const {height: windowHeight, width: windowWidth} = useWindowDimensions()
  const [width, setWidth] = useState<number | undefined>(undefined)

  const createdStyles = useMemo(
    () => createStyles(aspectRatio, width),
    [aspectRatio, width],
  )
  const styles = useThemable(createdStyles)

  useEffect(() => {
    // reset saved width on every window size change, so the image is allowed to grow bigger
    setWidth(undefined)
  }, [windowHeight, windowWidth])

  const onLayoutChange = useCallback(
    (event: LayoutChangeEvent) => {
      setWidth(event.nativeEvent.layout.width)
      onLayout?.(event)
    },
    [onLayout, setWidth],
  )

  return (
    <NavigateToImageViewer
      imageProps={{...imageProps, source, aspectRatio}}
      shouldNavigate={openInImageViewer}>
      <ImageRN
        accessibilityIgnoresInvertColors
        accessibilityLanguage="nl-NL"
        accessible={false}
        onLayout={onLayoutChange}
        source={source}
        style={[styles.image, style]}
        {...imageProps}
      />
    </NavigateToImageViewer>
  )
}

const createStyles =
  (aspectRatio: ImageAspectRatio, width?: number) =>
  ({media}: Theme) => {
    const aspectRatioValue = media.aspectRatio[aspectRatio]

    return StyleSheet.create({
      image: {
        width: undefined,
        maxWidth: '100%',
        height:
          Platform.OS === 'android' && width && aspectRatioValue > 0
            ? width / aspectRatioValue
            : undefined,
        flex: 1,
        aspectRatio: aspectRatioValue,
      },
    })
  }
