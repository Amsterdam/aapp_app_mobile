import WasteContainer, {
  BluetoothPermission,
  BluetoothContainerDevice,
} from './NativeWasteContainer'
import type {EventSubscription} from 'react-native'

export const init = (
  servicePrincipalName: string,
  servicePrincipalSecret: string,
  organisationId: string,
): void => {
  WasteContainer.init(
    servicePrincipalName,
    servicePrincipalSecret,
    organisationId,
  )
}

export const startScan = (): void => {
  WasteContainer.startScan()
}

export const autoUnlock = (cardNumber: string): void => {
  WasteContainer.autoUnlock(cardNumber)
}

export const checkBluetoothPermission = (): Promise<
  Record<string, BluetoothPermission>
> => WasteContainer.checkBluetoothPermission()

export const connect = (
  bluetoothContainerDevice: BluetoothContainerDevice,
): void => {
  WasteContainer.connect(bluetoothContainerDevice)
}

export const disconnect = (
  bluetoothContainerDevice: BluetoothContainerDevice,
): void => {
  WasteContainer.disconnect(bluetoothContainerDevice)
}

export const stopScan = (): void => {
  WasteContainer.stopScan()
}

export const unlock = (
  bluetoothContainerDevice: BluetoothContainerDevice,
  cardId: string,
): void => {
  WasteContainer.unlock(bluetoothContainerDevice, cardId)
}

export const dispose = (): void => {
  WasteContainer.dispose()
}

export const onBluetoothContainerDeviceConnected = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription =>
  WasteContainer.onBluetoothContainerDeviceConnected(callback)

export const onBluetoothContainerDeviceConnectionFailed = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription =>
  WasteContainer.onBluetoothContainerDeviceConnectionFailed(callback)

export const onBluetoothContainerDeviceDisconnected = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription =>
  WasteContainer.onBluetoothContainerDeviceDisconnected(callback)

export const onBluetoothContainerDeviceDiscovered = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription =>
  WasteContainer.onBluetoothContainerDeviceDiscovered(callback)

export const onBluetoothStateChanged = (
  callback: (bluetoothState: string) => void,
): EventSubscription => WasteContainer.onBluetoothStateChanged(callback)

export const onScanStarted = (callback: () => void): EventSubscription =>
  WasteContainer.onScanStarted(callback)

export const onScanStopped = (callback: () => void): EventSubscription =>
  WasteContainer.onScanStopped(callback)

export const onUnlockError = (
  callback: (error: string) => void,
): EventSubscription => WasteContainer.onUnlockError(callback)

export const onUnlockFinished = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription => WasteContainer.onUnlockFinished(callback)
