import {Platform} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {isVersionLower} from '@/utils/versionCompare'

const ANDROID_VERSION_BLUETOOTH_PERMISSION = '12'

export const isAndroidVersionBelow12 =
  Platform.OS === 'android' &&
  isVersionLower(
    DeviceInfo.getSystemVersion(),
    ANDROID_VERSION_BLUETOOTH_PERMISSION,
  )
