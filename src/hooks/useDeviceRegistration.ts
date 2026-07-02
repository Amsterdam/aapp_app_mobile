import {useCallback, useEffect} from 'react'
import {useAppState} from '@/hooks/useAppState'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'

/**
 * Register the device for push notifications on mount and when the app returns to the foreground.
 */
export const useDeviceRegistration = () => {
  const {registerDeviceIfPermitted} = useRegisterDevice()

  const handleDeviceRegistration = useCallback(() => {
    // Because tokens refresh regularly, we need to re-register regularly
    void registerDeviceIfPermitted()
  }, [registerDeviceIfPermitted])

  useEffect(handleDeviceRegistration, [handleDeviceRegistration])

  useAppState({onForeground: handleDeviceRegistration})
}
