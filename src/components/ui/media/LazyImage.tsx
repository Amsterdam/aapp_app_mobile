import {useCallback, useState, ReactElement, useMemo} from 'react'
import {
  type ImageErrorEventData,
  type ImageSourcePropType,
  type ImageStyle,
  type NativeSyntheticEvent,
  type StyleProp,
  StyleSheet,
  View,
} from 'react-native'
import {Skeleton} from '@/components/ui/feedback/Skeleton'
import {Image, type ImageProps} from '@/components/ui/media/Image'
import {ImageFallback} from '@/components/ui/media/ImageFallback'
import {type TestProps} from '@/components/ui/types'
import {type Theme} from '@/themes/themes'
import {type ImageAspectRatio} from '@/themes/tokens/media'
import {useTheme} from '@/themes/useTheme'

type Props = Omit<ImageProps, 'style'> & {
  fallbackInheritsAspectRatio?: boolean
  imageStyle?: StyleProp<ImageStyle>
  /**
   * If the source is undefined, show the missingSourceFallback when it exists
   */
  missingSourceFallback?: ReactElement
} & TestProps

const hasImageSource = (source?: ImageSourcePropType) => {
  if (!source) {
    return false
  }

  return !(Array.isArray(source) && source.length === 0)
}

export const LazyImage = ({
  aspectRatio = 'wide',
  fallbackInheritsAspectRatio = true,
  imageStyle,
  onError,
  onLoadEnd,
  missingSourceFallback,
  testID,
  source,
  ...rest
}: Props) => {
  const [failed, setFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()
  const styles = useMemo(
    () => createStyles(theme, aspectRatio),
    [theme, aspectRatio],
  )

  const handleError = useCallback(
    (error?: NativeSyntheticEvent<ImageErrorEventData>) => {
      setFailed(true)
      onError?.(error)
    },
    [onError],
  )

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false)
    onLoadEnd?.()
  }, [onLoadEnd])

  if (!hasImageSource(source)) {
    if (missingSourceFallback) {
      return (
        <View
          style={fallbackInheritsAspectRatio ? styles.aspectRatio : undefined}
          testID={testID}>
          {missingSourceFallback}
        </View>
      )
    }

    return (
      <View
        style={fallbackInheritsAspectRatio ? styles.aspectRatio : undefined}
        testID={testID}>
        <ImageFallback aspectRatio={aspectRatio} />
      </View>
    )
  }

  return (
    <Skeleton isLoading={isLoading}>
      <View
        style={styles.wrapper}
        testID={testID}>
        {failed ? (
          <ImageFallback aspectRatio={aspectRatio} />
        ) : (
          <Image
            {...rest}
            aspectRatio={aspectRatio}
            onError={handleError}
            onLoadEnd={handleLoadEnd}
            source={source}
            style={[styles.image, imageStyle]}
            testID={testID}
          />
        )}
      </View>
    </Skeleton>
  )
}

const createStyles = ({media}: Theme, aspectRatio: ImageAspectRatio) =>
  StyleSheet.create({
    aspectRatio: {
      aspectRatio: media.aspectRatio[aspectRatio],
    },
    image: {
      flex: 1,
    },
    wrapper: {
      position: 'relative',
      aspectRatio: media.aspectRatio[aspectRatio],
    },
  })
