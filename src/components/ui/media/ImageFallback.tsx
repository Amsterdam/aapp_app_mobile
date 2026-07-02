import {useMemo} from 'react'
import {StyleSheet, View} from 'react-native'
import ImageFallbackSvg from '@/assets/images/image-fallback.svg'
import {Theme} from '@/themes/themes'
import {ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = {
  aspectRatio?: ImageAspectRatio
}

export const ImageFallback = ({aspectRatio = 'wide'}: Props) => {
  const {fallback} = useThemable(
    useMemo(() => createStyles(aspectRatio), [aspectRatio]),
  )

  return (
    <View
      accessibilityLabel="Afbeelding niet gevonden"
      accessibilityLanguage="nl-NL"
      style={fallback}>
      <ImageFallbackSvg
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
      />
    </View>
  )
}

const createStyles =
  (aspectRatio: ImageAspectRatio) =>
  ({media}: Theme) =>
    StyleSheet.create({
      fallback: {
        alignItems: 'center',
        aspectRatio: media.aspectRatio[aspectRatio],
      },
    })
