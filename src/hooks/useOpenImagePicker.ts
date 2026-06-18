import * as ImagePicker from 'expo-image-picker'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {useAlert} from '@/store/slices/alert'

const DEFAULT_OPTIONS: ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  base64: false,
  mediaTypes: 'images',
}

const PermissionErrors = new Set(['ERR_USER_REJECTED_PERMISSIONS'])

const getAddPhotoFeedback = (
  viaCamera = false,
  code?: ImagePicker.ImagePickerErrorResult['code'],
) => {
  if (code && PermissionErrors.has(code)) {
    return `Sorry, je kunt geen foto ${
      viaCamera ? 'maken' : 'toevoegen'
    }, omdat de app geen toestemming heeft om je ${
      viaCamera ? 'camera' : 'fotobibliotheek'
    } te gebruiken.`
  }

  return `Sorry, er is iets misgegaan. De app kan geen gebruik maken van je ${
    viaCamera ? 'camera' : 'fotobibliotheek'
  }.`
}

/**
 * Returns a function, which depending on the viaCamera param will open an image picker or the device camera. Any relevant errors are logged and communicated via an alert. Errors do not have to be handled further (you can use the `void` keyword).
 */
export const useOpenImagePicker = (
  options?: ImagePicker.ImagePickerOptions,
) => {
  const {setAlert} = useAlert()
  const trackException = useTrackException()

  return async (viaCamera = false) => {
    const method: keyof typeof ImagePicker = viaCamera
      ? 'launchCameraAsync'
      : 'launchImageLibraryAsync'

    try {
      const data = await ImagePicker[method]({
        ...DEFAULT_OPTIONS,
        ...options,
      })

      return data.assets
    } catch (error) {
      const {code} = error as ImagePicker.ImagePickerErrorResult

      setAlert({
        text: getAddPhotoFeedback(viaCamera, code),
        testID: 'OpenImagePicker',
        variant: AlertVariant.negative,
        hasIcon: false,
      })

      trackException(
        viaCamera
          ? ExceptionLogKey.takingPhotoFailed
          : ExceptionLogKey.pickingImageFailed,
        'useOpenImagePicker.ts',
        {error, code, viaCamera},
      )
    }
  }
}
