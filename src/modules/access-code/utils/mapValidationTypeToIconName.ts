import {AuthenticationType} from 'expo-local-authentication'
import {Platform} from 'react-native'
import type {SvgIconName} from '@/components/ui/media/svgIcons'

export const mapBiometricsAuthenticationTypeToIconName = (
  types?: AuthenticationType[],
): Extract<SvgIconName, 'touch-id' | 'face-id' | 'biometrics'> | undefined => {
  if (!types || types.length === 0) {
    return
  }

  if (
    [
      AuthenticationType.FINGERPRINT,
      AuthenticationType.FACIAL_RECOGNITION,
    ].every(type => types.includes(type))
  ) {
    if (Platform.OS === 'android') {
      return 'touch-id' // Android always uses Touch ID icon
    }

    return 'biometrics'
  }

  if (types.includes(AuthenticationType.FINGERPRINT)) {
    return 'touch-id'
  }

  if (types.includes(AuthenticationType.FACIAL_RECOGNITION)) {
    if (Platform.OS === 'android') {
      return 'touch-id'
    }

    return 'face-id'
  }

  if (types.includes(AuthenticationType.IRIS)) {
    return 'biometrics' //fallback since iris is not covered by the icons
  }
}
