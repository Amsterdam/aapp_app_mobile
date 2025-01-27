import WastevisionContainer, {
  BluetoothContainerDevice,
} from './NativeWastevisionContainer'

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
