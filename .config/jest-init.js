/* eslint-disable @typescript-eslint/no-empty-function */
// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup'

import {NativeModules} from 'react-native'

import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'

jest.mock('react-native-device-info', () => mockRNDeviceInfo)

jest.mock('react-native-nitro-modules', () => ({}))

jest.mock('@react-native-firebase/messaging', () => ({}))
jest.mock('redux-devtools-expo-dev-plugin', () => ({
  default:
    () =>
    createStore =>
    (...args) =>
      createStore(...args),
}))

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn().mockResolvedValueOnce(),
  getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}))

jest.mock('react-native-keyboard-controller', () => {
  const KeyboardAwareScrollView = ({children}) => children

  return {KeyboardAwareScrollView}
})

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock')

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {}

  return Reanimated
})

jest.mock('react-native-image-crop-picker', () => ({}))

jest.mock('@notifee/react-native', () =>
  require('@notifee/react-native/jest-mock'),
)

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
)

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectionMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
}

jest.mock('expo-screen-orientation', () => ({}))
jest.mock('expo-secure-store', () => ({}))
jest.mock('expo-local-authentication', () => ({}))

jest.mock('react-native-applifecycle/dist/AppLifecycle', () =>
  require('react-native-applifecycle/jest/AppLifecycleMock'),
)

jest.mock('react-native-barcode-creator', () => ({
  getConstants: jest.fn(),
}))
jest.mock('react-native-salesforce-messaging-in-app', () => ({}))
jest.mock('react-native-wastevision-container', () => ({}))
jest.mock(
  'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp.ts',
  () => require('react-native-salesforce-messaging-in-app/src/jestMock.ts'),
)
jest.mock('expo-document-picker', () => ({}))
jest.mock('expo-image-picker', () => ({}))
jest.mock('expo-file-system', () => ({}))
jest.mock('expo-sharing', () => ({}))
jest.mock('expo-clipboard', () => ({}))
jest.mock('expo-brightness', () => ({}))
jest.mock('expo-haptics', () => ({}))
jest.mock('react-native-block-screenshot', () => ({}))
jest.mock('react-native-webview', () => ({}))
jest.mock('react-native-maps', () => ({}))

jest.mock('react-native-geolocation-service', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}))
