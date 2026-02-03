import * as ImagePicker from 'expo-image-picker'
import {useCallback, useState} from 'react'
import {Alert, StyleSheet, View} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import type {Theme} from '@/themes/themes'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Icon} from '@/components/ui/media/Icon'
import {Image} from '@/components/ui/media/Image'
import {Phrase} from '@/components/ui/text/Phrase'
import {usePermission} from '@/hooks/permissions/usePermission'
import {devError} from '@/processes/development'
import {useThemable} from '@/themes/useThemable'
import {Permissions} from '@/types/permissions'
import {dayjs} from '@/utils/datetime/dayjs'

export type ImageFormEntry = {
  name: string
  type: string
  uri: string
}
type ImageInputProps = {
  imageValue?: ImageFormEntry
  onChange?: (value?: ImageFormEntry) => void
  onError?: (error?: unknown) => void
} & TestProps

export const ImageInput = ({
  testID,
  imageValue,
  onChange,
  onError,
}: ImageInputProps) => {
  const styles = useThemable(createStyles)
  const [image, setImage] = useState<ImageFormEntry | undefined>(imageValue)

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = usePermission(Permissions.camera)

  const addImage = useCallback(async () => {
    if (!hasCameraPermission) {
      const permission = await requestCameraPermission()

      if (!permission) {
        Alert.alert(
          'Permission required',
          'Permission to access the media library is required.',
        )

        return
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsMultipleSelection: false,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      })

      if (!result.canceled) {
        const {fileName, uri, mimeType} = result.assets[0]

        if (!mimeType) {
          throw new Error('Invalid mime type')
        }

        const newImage: ImageFormEntry = {
          name: fileName || dayjs().toISOString(),
          type: mimeType,
          uri,
        }

        onChange?.(newImage)
        setImage(newImage)
      }
    } catch (error) {
      devError(error)
      onError?.(
        typeof error === 'string'
          ? error
          : 'Er ging iets fout, probeer het later opnieuw.',
      )
    }
  }, [requestCameraPermission, hasCameraPermission, onChange, onError])

  const deleteImage = useCallback(() => {
    onChange?.(undefined)
    setImage(undefined)
  }, [onChange])

  return (
    <Column gutter="sm">
      <View style={styles.imageContainer}>
        {image ? (
          <>
            <Image
              aspectRatio="wide"
              source={{uri: image.uri}}
            />
            <View style={styles.deleteButton}>
              <IconButton
                icon={
                  <Icon
                    color="warning"
                    name="trash-bin"
                    size="lg"
                  />
                }
                onPress={deleteImage}
                testID={`${testID}OpenCityDeleteImageIconButton`}
              />
            </View>
          </>
        ) : (
          <Pressable
            flex={1}
            onPress={addImage}
            testID={`${testID}OpenCityAddImageButton`}>
            <View style={styles.placeholder}>
              <Icon
                color="inverse"
                name="camera"
                size="xxl"
              />
              <Gutter height="sm" />
              <Phrase color="inverse">Voeg een afbeelding toe</Phrase>
            </View>
          </Pressable>
        )}
      </View>
    </Column>
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    imageContainer: {
      height: 200,
      width: '100%',
    },
    placeholder: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.color.skeleton.background,
    },
    deleteButton: {
      position: 'absolute',
      padding: theme.size.spacing.md,
    },
  })
