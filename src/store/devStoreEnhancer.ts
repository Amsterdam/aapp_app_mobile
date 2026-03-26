import {Platform} from 'react-native'
import {getDeviceNameSync} from 'react-native-device-info'
import type {ConfigureStoreOptions, StoreEnhancer} from '@reduxjs/toolkit'
import {SHA256EncryptedDeviceId} from '@/utils/encryption'

export const devStoreEnhancer: ConfigureStoreOptions['enhancers'] =
  enhancers => {
    if (__DEV__) {
      const devToolsEnhancer = (
        require('redux-devtools-expo-dev-plugin') as {
          default: (options: unknown) => StoreEnhancer
        }
      ).default

      return enhancers.concat(
        devToolsEnhancer({
          name: `${Platform.OS} ${Platform.Version} - ${getDeviceNameSync()} - ${SHA256EncryptedDeviceId}`,
        }),
      )
    }

    return enhancers
  }
