import {useEffect, useMemo, useState} from 'react'
import {
  View,
  Image,
  StyleSheet,
  Modal,
  ImageProps,
  DimensionValue,
  Platform,
} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Pressable, PressableProps} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {ScreenHeaderTitle} from '@/components/ui/text/ScreenHeaderTitle'
import {devLog} from '@/processes/development'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {saveFile} from '@/utils/saveFile'

type Props = {
  fileName: string
  headerTitle?: string
  imageSource: ImageProps['source']
  thumbnailSize: DimensionValue
} & Omit<PressableProps, 'children' | 'testID'>

export const ThumbnailViewer = ({
  accessibilityLabel = 'Afbeelding, miniatuurweergave.',
  fileName = 'afbeelding.jpg',
  imageSource,
  thumbnailSize,
  headerTitle,
  ...pressableProps
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [aspectRatio, setAspectRatio] = useState<number>()
  const insets = useSafeAreaInsets()

  const toggleVisibility = () => {
    setIsModalVisible(!isModalVisible)
  }

  const uri = useMemo((): string | undefined => {
    if (typeof imageSource === 'number') {
      return undefined
    } else if (
      imageSource &&
      typeof imageSource === 'object' &&
      'uri' in imageSource
    ) {
      return imageSource.uri
    } else {
      return undefined
    }
  }, [imageSource])

  useEffect(() => {
    Image.getSize(
      uri ?? '',
      (w, h) => setAspectRatio(w / h),
      (error: unknown) => devLog(error),
    )
  }, [uri])

  const styles = useThemable(theme =>
    createStyles(theme, thumbnailSize, insets, aspectRatio),
  )
  const isLocalFile = uri?.startsWith('file://')

  return (
    <View>
      <Pressable
        {...pressableProps}
        accessibilityLabel={accessibilityLabel}
        onPress={toggleVisibility}
        testID="ThumbnailViewerThumbnailButton">
        <Image
          source={imageSource}
          style={styles.thumbnail}
          testID="ThumbnailViewerThumbnailImage"
        />
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={toggleVisibility}
        supportedOrientations={['portrait', 'landscape']}
        testID="ThumbnailViewerModal"
        transparent
        visible={isModalVisible}>
        <View style={styles.overlay}>
          <Box>
            <Row align="between">
              <IconButton
                accessibilityLabel="Terug"
                icon={
                  <Icon
                    color="link"
                    name="chevron-left"
                    size="lg"
                    testID="ThumbnailViewerCloseIcon"
                  />
                }
                onPress={toggleVisibility}
                testID="ThumbnailViewerCloseButton"
              />
              {!!headerTitle && <ScreenHeaderTitle text={headerTitle} />}
              <IconButton
                accessibilityLabel="Download de afbeelding."
                icon={
                  <Icon
                    color="link"
                    name="download"
                    size="lg"
                    testID="ThumbnailViewerDownloadIcon"
                  />
                }
                onPress={() =>
                  saveFile({
                    localUri: isLocalFile ? uri : undefined,
                    downloadUri: isLocalFile ? undefined : uri,
                    fileName,
                  })
                }
                testID="ThumbnailViewerDownloadButton"
              />
            </Row>
          </Box>
          <Image
            accessibilityLabel="Afbeelding"
            accessible
            resizeMode="contain"
            source={imageSource}
            style={styles.fullImage}
            testID="ThumbnailViewerFullImage"
          />
        </View>
      </Modal>
    </View>
  )
}

const createStyles = (
  {color, size, z}: Theme,
  thumbnailSize: DimensionValue,
  insets: EdgeInsets,
  aspectRatio?: number,
) =>
  StyleSheet.create({
    thumbnail: {
      width: thumbnailSize,
      height: thumbnailSize,
    },
    overlay: {
      flex: 1,
      backgroundColor: color.box.background.distinct,
      justifyContent: 'center',
      zIndex: z.overlay,
      paddingTop: Platform.OS === 'android' ? 0 : insets.top,
      paddingRight: insets.right,
      paddingBottom: size.spacing.md + insets.bottom,
      paddingLeft: insets.left,
    },
    fullImage: {
      aspectRatio,
      alignSelf: 'center',
      maxWidth: '100%',
      maxHeight: '100%',
      flex: 1,
    },
  })
