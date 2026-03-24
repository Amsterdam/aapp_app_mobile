import {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import AmsterdamAndWeespFacadesImage from '@/assets/images/amsterdam-and-weesp-facades.svg'
import AmsterdamFacadesImage from '@/assets/images/amsterdam-facades.svg'
import {type TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {Theme} from '@/themes/themes'
import {IllustrationAspectRatio, ImageAspectRatio} from '@/themes/tokens/media'
import {useThemable} from '@/themes/useThemable'

type Props = {
  aspectRatio?: ImageAspectRatio
  backgroundImageHeightFraction?: number
  children?: ReactNode
  height?: number
  illustrationAspectRatio?: IllustrationAspectRatio
  withWeesp?: boolean
} & TestProps

const DEFAULT_BACKGROUND_IMAGE_HEIGHT_FRACTION = 3 / 4

/** Get a sensible height as a fraction of the available height */
const getHeight = (deviceHeight: number, isLandscape: boolean) =>
  Math.round(deviceHeight / (isLandscape ? 3 : 4))

export const FigureWithFacadesBackground = ({
  aspectRatio,
  backgroundImageHeightFraction,
  children,
  height,
  illustrationAspectRatio,
  testID,
  withWeesp = false,
}: Props) => {
  const {height: availableHeight, isLandscape} = useDeviceContext()
  const figureHeight = height ?? getHeight(availableHeight, isLandscape)

  const styles = useThemable(
    createStyles({
      aspectRatio,
      backgroundImageHeightFraction,
      height: figureHeight,
      illustrationAspectRatio,
    }),
  )

  const BackgroundImage = withWeesp
    ? AmsterdamAndWeespFacadesImage
    : AmsterdamFacadesImage

  return (
    <View
      style={styles.figure}
      testID={testID}>
      <View style={styles.backgroundImage}>
        <BackgroundImage />
      </View>
      <View style={styles.imageOuter}>
        <View style={styles.imageInner}>{children}</View>
      </View>
    </View>
  )
}

type StyleProps = Pick<
  Props,
  'aspectRatio' | 'backgroundImageHeightFraction' | 'illustrationAspectRatio'
> & {
  height: number
}

const createStyles =
  ({
    aspectRatio,
    backgroundImageHeightFraction = DEFAULT_BACKGROUND_IMAGE_HEIGHT_FRACTION,
    height,
    illustrationAspectRatio = 'landscape',
  }: StyleProps) =>
  ({media}: Theme) =>
    StyleSheet.create({
      figure: {
        aspectRatio: aspectRatio ? media.aspectRatio[aspectRatio] : undefined,
        height,
        overflow: 'hidden',
        position: 'relative',
      },
      backgroundImage: {
        alignSelf: 'center',
        aspectRatio: media.illustrationAspectRatio.facades,
        height: height * backgroundImageHeightFraction,
        position: 'absolute',
      },
      imageOuter: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      imageInner: {
        aspectRatio: media.illustrationAspectRatio[illustrationAspectRatio],
        height,
        maxWidth: '100%',
      },
    })
