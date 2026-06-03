/* eslint-disable @typescript-eslint/no-require-imports */
import {Platform} from 'react-native'
import {getDeviceNameSync} from 'react-native-device-info'
import type {StoreEnhancer} from '@reduxjs/toolkit'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'

const isBundleLoadedFromServer = () => {
  try {
    const getDevServer =
      require('react-native/Libraries/Core/Devtools/getDevServer') as {
        default: () => {bundleLoadedFromServer: boolean}
      }

    return getDevServer.default().bundleLoadedFromServer
  } catch {
    return false
  }
}

export const getDevStoreEnhancer = (): StoreEnhancer | undefined => {
  if (__DEV__ && isBundleLoadedFromServer()) {
    const devToolsEnhancer = (
      require('redux-devtools-expo-dev-plugin') as {
        default: (options: unknown) => StoreEnhancer
      }
    ).default

    return devToolsEnhancer({
      name: `${Platform.OS} ${Platform.Version} - ${getDeviceNameSync()} - ${SHA256EncryptedDeviceId}`,
    })
  }

  return undefined
}
