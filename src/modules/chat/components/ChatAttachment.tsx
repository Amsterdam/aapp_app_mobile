import {File, Paths} from 'expo-file-system'
import {launchCameraAsync, launchImageLibraryAsync} from 'expo-image-picker'
import {useCallback} from 'react'
import {Alert, StyleSheet} from 'react-native'
import Animated, {SlideInDown} from 'react-native-reanimated'
import {
  generateUUID,
  sendImage,
  sendPDF,
} from 'react-native-salesforce-messaging-in-app/src'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {usePermission} from '@/hooks/permissions/usePermission'
import {ChatAttachmentButton} from '@/modules/chat/components/ChatAttachmentButton'
import {devError, devLog} from '@/processes/development'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'
import {Duration} from '@/types/duration'
import {Permissions} from '@/types/permissions'

type Props = {
  minHeight?: number
  onSelect: () => void
}

const fileName = 'ChatAttachment.tsx'

export const ChatAttachment = ({onSelect, minHeight}: Props) => {
  const setAccessibilityFocus = useAccessibilityFocus(Duration.long)
  const styles = useThemable(createStyles)

  const trackException = useTrackException()

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = usePermission(Permissions.camera)

  const addPhotoFromLibrary = useCallback(() => {
    void launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: false,
      allowsEditing: false,
      base64: true,
    }).then(
      result => {
        if (result.assets?.[0].uri) {
          const file = result.assets?.[0]

          sendImage(file.base64!, file.fileName ?? 'image.png', file.uri).then(
            onSelect,
            error => {
              Alert.alert(
                'Sorry, opsturen van de afbeelding is mislukt. Probeer het later nog eens.',
              )

              trackException(
                ExceptionLogKey.chatSendImageFromLibrary,
                fileName,
                {
                  error,
                },
              )
            },
          )
        }
      },
      error => {
        Alert.alert(
          'Afbeelding kiezen is mislukt',
          'Sorry, kiezen van een afbeelding is mislukt. Probeer het later nog eens.',
        )

        trackException(ExceptionLogKey.chatPickImageFromLibrary, fileName, {
          error,
        })
      },
    )
  }, [onSelect, trackException])

  const addPhotoFromCamera = useCallback(async () => {
    if (!hasCameraPermission) {
      await requestCameraPermission()
    }

    void launchCameraAsync({
      mediaTypes: 'images',
      allowsMultipleSelection: false,
      allowsEditing: false,
      base64: true,
    }).then(
      result => {
        if (result.assets?.[0].uri) {
          const file = result.assets?.[0]

          sendImage(file.base64!, file.fileName ?? 'image.png', file.uri).then(
            onSelect,
            error => {
              Alert.alert(
                'Foto opsturen is niet gelukt',
                'Sorry, opsturen van de afbeelding is mislukt. Probeer het later nog eens.',
              )

              trackException(
                ExceptionLogKey.chatSendImageFromCamera,
                fileName,
                {
                  error,
                },
              )
            },
          )
        }
      },
      error => {
        Alert.alert(
          'Foto maken is niet gelukt',
          'Sorry, maken van een foto is mislukt. Probeer het later nog eens.',
        )

        trackException(ExceptionLogKey.chatTakeImageWithCamera, fileName, {
          error,
        })
      },
    )
  }, [hasCameraPermission, requestCameraPermission, onSelect, trackException])
  const addPDF = useCallback(() => {
    void File.pickFileAsync({mimeTypes: 'application/pdf'}).then(
      async ({result, canceled}) => {
        if (canceled || !result) {
          devLog('Upload pdf cancelled or no result.')

          return
        }

        const copiedFile = new File(Paths.cache, `${generateUUID()}.pdf`)

        await result.copy(copiedFile, {overwrite: true})

        try {
          await sendPDF(copiedFile.uri, result.name)
          onSelect()
        } catch (error) {
          devError(error)
          Alert.alert(
            'PDF opsturen is mislukt',
            'Sorry, opsturen van het PDF document is mislukt. Probeer het later nog eens.',
          )

          trackException(ExceptionLogKey.chatSendPDF, fileName, {
            error,
          })
        } finally {
          copiedFile.delete()
        }
      },
      error => {
        devError(error)
        Alert.alert(
          'PDF kiezen is mislukt',
          'Sorry, kiezen van een PDF document is mislukt. Probeer het later nog eens.',
        )

        trackException(ExceptionLogKey.chatPickPDF, fileName, {
          error,
        })
      },
    )
  }, [onSelect, trackException])

  return (
    <Animated.View
      entering={SlideInDown}
      style={[
        styles.attachments,
        {
          minHeight: Math.round(minHeight ?? 0),
        },
      ]}>
      <Box>
        <Row
          align="evenly"
          gutter="sm">
          <ChatAttachmentButton
            iconName="image"
            label="Foto"
            onPress={addPhotoFromLibrary}
            ref={setAccessibilityFocus}
            testID="ChatAttachmentLibraryButton"
          />
          <ChatAttachmentButton
            iconName="camera"
            label="Camera"
            onPress={addPhotoFromCamera}
            testID="ChatAttachmentCameraButton"
          />
          <ChatAttachmentButton
            iconName="document"
            label="PDF"
            onPress={addPDF}
            testID="ChatAttachmentPdfButton"
          />
        </Row>
      </Box>
    </Animated.View>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    attachments: {
      backgroundColor: color.chat.attachment.background,
    },
  })
