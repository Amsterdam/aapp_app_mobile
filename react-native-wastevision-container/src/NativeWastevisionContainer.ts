import {TurboModuleRegistry} from 'react-native'
import type {TurboModule} from 'react-native'
import type {EventEmitter} from 'react-native/Libraries/Types/CodegenTypes'

export interface Spec extends TurboModule {
  autoUnlock(cardId: CardId): void
  connect(bluetoothContainerDevice: BluetoothContainerDevice): void
  disconnect(bluetoothContainerDevice: BluetoothContainerDevice): void
  //getBluetoothState(): BluetoothState
  dispose(): void
  init(
    servicePrincipalName: string,
    servicePrincipalSecret: string,
    organisationId: string,
  ): void
  readonly onBluetoothContainerDeviceConnected: EventEmitter<BluetoothContainerDevice>
  readonly onBluetoothContainerDeviceConnectionFailed: EventEmitter<BluetoothContainerDevice>
  readonly onBluetoothContainerDeviceDisconnected: EventEmitter<BluetoothContainerDevice>
  readonly onBluetoothContainerDeviceDiscovered: EventEmitter<BluetoothContainerDevice>
  readonly onBluetoothStateChanged: EventEmitter<string>
  readonly onScanStarted: EventEmitter<void>
  readonly onScanStopped: EventEmitter<void>
  readonly onUnlockError: EventEmitter<string>
  readonly onUnlockFinished: EventEmitter<BluetoothContainerDevice>
  // setBluetoothConnectionDelegate(
  //   bluetoothContainerDevice: BluetoothContainerDevice,
  // ): void
  startScan(): void
  stopScan(): void
  // unlock(
  //   bluetoothContainerDevice: BluetoothContainerDevice,
  //   cardId: CardId,
  // ): void
}

export type BluetoothContainerDevice = {
  /**
   * The Bluetooth address of the container device.
   * Android address
   * iOS uuid
   */
  address: string
  /**
   * The name of the container device.
   * @example "Waste Vision 1072215"
   */
  name?: string
  /**
   * The RSSI of the container. This indicates the strength of the Bluetooth signal.
   */
  rssi?: number
}

export type CardId = string // cardId is bij android type [UInt8]

export enum BluetoothState {
  off = 'off',
  on = 'on',
  /**
   * Android only
   */
  turningOff = 'turningOff',
  /**
   * Android only
   */
  turningOn = 'turningOn',
  /**
   * iOS only
   */
  unauthorized = 'unauthorized',
  unknown = 'unknown',
  /**
   * iOS only
   */
  unsupported = 'unsupported',
}

export enum BluetoothPermission {
  denied = 'denied',
  granted = 'granted',
  unknown = 'unknown',
}

// eslint-disable-next-line import-x/no-default-export
export default TurboModuleRegistry.getEnforcing<Spec>('WastevisionContainer')
