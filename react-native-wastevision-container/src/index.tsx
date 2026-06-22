import WastevisionContainer, {
  BluetoothPermission,
  BluetoothContainerDevice,
  CardId,
} from './NativeWastevisionContainer'
import type {EventSubscription} from 'react-native'

export const init = (
  servicePrincipalName: string,
  servicePrincipalSecret: string,
  organisationId: string,
): void => {
  WastevisionContainer.init(
    servicePrincipalName,
    servicePrincipalSecret,
    organisationId,
  )
}

export const startScan = (): void => {
  WastevisionContainer.startScan()
}

export const autoUnlock = (cardNumber: string): void => {
  WastevisionContainer.autoUnlock(cardNumber)
}

export const checkBluetoothPermission = (): Promise<
  Record<string, BluetoothPermission>
> => WastevisionContainer.checkBluetoothPermission()

export const connect = (
  bluetoothContainerDevice: BluetoothContainerDevice,
): void => {
  WastevisionContainer.connect(bluetoothContainerDevice)
}

export const disconnect = (
  bluetoothContainerDevice: BluetoothContainerDevice,
): void => {
  WastevisionContainer.disconnect(bluetoothContainerDevice)
}

export const stopScan = (): void => {
  WastevisionContainer.stopScan()
}

export const unlock = (
  bluetoothContainerDevice: BluetoothContainerDevice,
  cardId: CardId,
): void => {
  WastevisionContainer.unlock(bluetoothContainerDevice, cardId)
}

export const dispose = (): void => {
  WastevisionContainer.dispose()
}

export const onBluetoothContainerDeviceConnected = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription =>
  WastevisionContainer.onBluetoothContainerDeviceConnected(callback)

export const onBluetoothContainerDeviceConnectionFailed = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription =>
  WastevisionContainer.onBluetoothContainerDeviceConnectionFailed(callback)

export const onBluetoothContainerDeviceDisconnected = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription =>
  WastevisionContainer.onBluetoothContainerDeviceDisconnected(callback)

export const onBluetoothContainerDeviceDiscovered = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription =>
  WastevisionContainer.onBluetoothContainerDeviceDiscovered(callback)

export const onBluetoothStateChanged = (
  callback: (bluetoothState: string) => void,
): EventSubscription => WastevisionContainer.onBluetoothStateChanged(callback)

export const onScanStarted = (callback: () => void): EventSubscription =>
  WastevisionContainer.onScanStarted(callback)

export const onScanStopped = (callback: () => void): EventSubscription =>
  WastevisionContainer.onScanStopped(callback)

export const onUnlockError = (
  callback: (error: string) => void,
): EventSubscription => WastevisionContainer.onUnlockError(callback)

export const onUnlockFinished = (
  callback: (bluetoothContainerDevice: BluetoothContainerDevice) => void,
): EventSubscription => WastevisionContainer.onUnlockFinished(callback)
