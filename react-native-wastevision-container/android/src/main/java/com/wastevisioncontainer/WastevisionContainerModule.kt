package com.wastevisioncontainer

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.wastevision.waste_vision_android_sdk.BluetoothConnectionDelegate
import com.wastevision.waste_vision_android_sdk.BluetoothConnectionManager
import com.wastevision.waste_vision_android_sdk.network.Config
import com.wastevision.waste_vision_android_sdk.network.types.WasteVisionEnvironment
import com.wastevision.waste_vision_android_sdk.bluetooth.types.BluetoothState
import com.wastevision.waste_vision_android_sdk.bluetooth.entities.BluetoothContainerDevice

@ReactModule(name = WastevisionContainerModule.NAME)
class WastevisionContainerModule(reactContext: ReactApplicationContext) :
  NativeWastevisionContainerSpec(reactContext), BluetoothConnectionDelegate {

  private lateinit var bluetoothConnectionManager: BluetoothConnectionManager

  override fun getName(): String {
    return NAME
  }

  override fun init(servicePrincipalName: String, servicePrincipalSecret: String, organisationId: String) {
    val config = Config(
//      context = this,
      environment = WasteVisionEnvironment.PRODUCTION,
      servicePrincipalName = servicePrincipalName,
      servicePrincipalSecret = servicePrincipalSecret,
      organisationId = organisationId
    )
    bluetoothConnectionManager = BluetoothConnectionManager(
      context = this.reactApplicationContext
    )
    bluetoothConnectionManager.setup(config)
  }

  override fun startScan() {
    bluetoothConnectionManager.startScan()
  }

  override fun stopScan() {
    bluetoothConnectionManager.stopScan()
  }

  override fun dispose() {
    bluetoothConnectionManager.dispose()
  }

  override fun connect(bluetoothContainerDevice: ReadableMap) {
    val name = bluetoothContainerDevice.getString("name")
    val address = bluetoothContainerDevice.getString("address")
    val rssi = bluetoothContainerDevice.getInt("rssi")
    if (name.isNullOrEmpty() || address.isNullOrEmpty()) {
      return
    }
    val device: BluetoothContainerDevice = BluetoothContainerDevice(
      bluetoothConnectionManager = bluetoothConnectionManager,
      name = name,
      address = address,
      rssi = rssi,
    )
    bluetoothConnectionManager.connect(device)
  }

  override fun disconnect(bluetoothContainerDevice: ReadableMap) {
    val name = bluetoothContainerDevice.getString("name")
    val address = bluetoothContainerDevice.getString("address")
    val rssi = bluetoothContainerDevice.getInt("rssi")
    if (name.isNullOrEmpty() || address.isNullOrEmpty()) {
      return
    }
    val device: BluetoothContainerDevice = BluetoothContainerDevice(
      bluetoothConnectionManager = bluetoothConnectionManager,
      name = name,
      address = address,
      rssi = rssi,
    )
    bluetoothConnectionManager.connect(device)
  }

  override fun autoUnlock(cardNumber: String) {
    val cardNumberByteArray: ByteArray = cardNumber.encodeToByteArray()
    bluetoothConnectionManager.autoUnlock(cardNumberByteArray)
  }

  companion object {
    const val NAME = "WastevisionContainer"
  }

  private fun convertBluetoothContainerDevice(bluetoothContainerDevice: BluetoothContainerDevice): ReadableMap {
    return Arguments.createMap().apply {
      putString("address", bluetoothContainerDevice.address)
      putString("name", bluetoothContainerDevice.name)
      bluetoothContainerDevice.rssi?.let { putInt("entryId", it) }
    }
  }

  override fun onBluetoothContainerDeviceConnected(bluetoothContainerDevice: BluetoothContainerDevice) {
    emitOnBluetoothContainerDeviceConnected(convertBluetoothContainerDevice(bluetoothContainerDevice))
  }

  override fun onBluetoothContainerDeviceConnectionFailed(bluetoothContainerDevice: BluetoothContainerDevice) {
    emitOnBluetoothContainerDeviceConnectionFailed(convertBluetoothContainerDevice(bluetoothContainerDevice))
  }

  override fun onBluetoothContainerDeviceDisconnected(bluetoothContainerDevice: BluetoothContainerDevice) {
    emitOnBluetoothContainerDeviceDisconnected(convertBluetoothContainerDevice(bluetoothContainerDevice))
  }

  override fun onBluetoothContainerDeviceDiscovered(bluetoothContainerDevice: BluetoothContainerDevice) {
    emitOnBluetoothContainerDeviceDiscovered(convertBluetoothContainerDevice(bluetoothContainerDevice))
  }

  override fun onBluetoothStateChanged(bluetoothState: BluetoothState) {
    emitOnBluetoothStateChanged(bluetoothState.name)
  }

  override fun onScanStarted() {
    emitOnScanStarted()
  }

  override fun onScanStopped() {
    emitOnScanStopped()
  }

  override fun onUnlockError(bluetoothContainerDevice: BluetoothContainerDevice, error: String?) {
    emitOnUnlockError(error)
  }

  override fun onUnlockFinished(bluetoothContainerDevice: BluetoothContainerDevice) {
    emitOnBluetoothContainerDeviceConnectionFailed(convertBluetoothContainerDevice(bluetoothContainerDevice))
  }
}
