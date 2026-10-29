import {useCallback} from 'react'
import {usePermission} from '@/hooks/permissions/usePermission'
import {Permissions} from '@/types/permissions'
import {isAndroidVersionBelow12} from '@/utils/isAndroidVersionBelow12'

export const useRequestBluetoothPermission = () => {
  const {requestPermission: requestBluetoothPermission} = usePermission(
    Permissions.bluetooth,
  )
  const {requestPermission: requestBluetoothConnectPermission} = usePermission(
    Permissions.bluetoothConnect,
  )

  return useCallback(async () => {
    if (isAndroidVersionBelow12) {
      return true
    }

    try {
      const bluetoothScanPermission = await requestBluetoothPermission()
      const bluetoothConnectPermission =
        await requestBluetoothConnectPermission()

      return bluetoothScanPermission && bluetoothConnectPermission
    } catch {
      return false
    }
  }, [requestBluetoothConnectPermission, requestBluetoothPermission])
}
