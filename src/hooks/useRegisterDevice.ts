import {getMessaging, getToken} from '@react-native-firebase/messaging'
import {useCallback} from 'react'
import {usePermission} from '@/hooks/permissions/usePermission'

import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {
  useRegisterDeviceMutation,
  useUnregisterDeviceMutation,
} from '@/services/deviceRegistration.service'
import {Permissions} from '@/types/permissions'

const messaging = getMessaging()

export const useRegisterDevice = () => {
  const [registerDeviceMutation] = useRegisterDeviceMutation()
  const [unregisterDevice] = useUnregisterDeviceMutation()
  const trackException = useTrackException()
  const {hasPermission, requestPermission} = usePermission(
    Permissions.notifications,
  )

  const registerDevice = useCallback(() => {
    getToken(messaging)
      .then(firebase_token => {
        void registerDeviceMutation({firebase_token})
      })
      .catch((error: unknown) => {
        trackException(ExceptionLogKey.registerDevice, 'useRegisterDevice.ts', {
          error,
        })
      })
  }, [registerDeviceMutation, trackException])

  const registerDeviceIfPermitted = useCallback(
    (requestNotificationPermission = false) =>
      new Promise<boolean>((resolve, _reject) => {
        if (requestNotificationPermission) {
          void requestPermission().then(granted => {
            granted && registerDevice()

            resolve(granted)
          })
        } else {
          hasPermission && registerDevice()

          resolve(hasPermission)
        }
      }),
    [requestPermission, registerDevice, hasPermission],
  )

  return {
    /**
     * Promise resolves to true if permission is granted, false otherwise
     */
    registerDeviceIfPermitted,
    unregisterDevice,
  }
}
