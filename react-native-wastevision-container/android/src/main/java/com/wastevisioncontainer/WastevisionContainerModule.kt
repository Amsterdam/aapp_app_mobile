package com.wastevisioncontainer

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import android.util.Log
import com.wastevision.mobile_container_android_sdk.BluetoothConnectionDelegate
import com.wastevision.mobile_container_android_sdk.BluetoothConnectionManager
import com.wastevision.mobile_container_android_sdk.bluetooth.entities.BluetoothContainerDevice
import com.wastevision.mobile_container_android_sdk.bluetooth.types.BluetoothState
import com.wastevision.mobile_container_android_sdk.network.Config
import com.wastevision.mobile_container_android_sdk.network.types.WasteVisionEnvironment
import com.wastevision.mobile_container_android_sdk.util.BluetoothUtil.Companion.checkBluetoothPermissions

@ReactModule(name = WastevisionContainerModule.NAME)
class WastevisionContainerModule(reactContext: ReactApplicationContext) :
  NativeWastevisionContainerSpec(reactContext), BluetoothConnectionDelegate {

  private lateinit var bluetoothConnectionManager: BluetoothConnectionManager
  private val tag = "WastevisionContainer"

  override fun getName(): String {
    return NAME
  }

  override fun init(
    servicePrincipalName: String,
    servicePrincipalSecret: String,
    organisationId: String,
  ) {
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
    bluetoothConnectionManager.setBluetoothConnectionDelegate(this)
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
    val device = parseBluetoothContainerDevice(bluetoothContainerDevice)
    if (device != null) {
      bluetoothConnectionManager.connect(device)
    }
  }

  override fun disconnect(bluetoothContainerDevice: ReadableMap) {
    val device = parseBluetoothContainerDevice(bluetoothContainerDevice)
    if (device != null) {
      bluetoothConnectionManager.disconnect(device)
    }
  }

  override fun unlock(bluetoothContainerDevice: ReadableMap, cardNumber: String) {
    val device = parseBluetoothContainerDevice(bluetoothContainerDevice)
    if (device != null) {
      bluetoothConnectionManager.unlock(device, cardNumber)
    }
  }

  override fun autoUnlock(cardNumber: String) {
    bluetoothConnectionManager.autoUnlock(cardNumber)
  }

  companion object {
    const val NAME = "WastevisionContainer"
  }

  private fun convertBluetoothContainerDevice(bluetoothContainerDevice: BluetoothContainerDevice): ReadableMap {
    return Arguments.createMap().apply {
      putString("address", bluetoothContainerDevice.address)
      putString("name", bluetoothContainerDevice.name)
      bluetoothContainerDevice.rssi?.let { putInt("rssi", it) }
    }
  }

  private fun toDeviceLog(bluetoothContainerDevice: BluetoothContainerDevice): String {
    return "address=${bluetoothContainerDevice.address}, name=${bluetoothContainerDevice.name}, rssi=${bluetoothContainerDevice.rssi}"
  }

  private fun parseBluetoothContainerDevice(bluetoothContainerDevice: ReadableMap): BluetoothContainerDevice? {
    val name = bluetoothContainerDevice.getString("name")
    val address = bluetoothContainerDevice.getString("address")
    val rssi = bluetoothContainerDevice.getInt("rssi")
    if (name.isNullOrEmpty() || address.isNullOrEmpty()) {
      return null
    }
    val device: BluetoothContainerDevice = BluetoothContainerDevice(
      bluetoothConnectionManager = bluetoothConnectionManager,
      name = name,
      address = address,
      rssi = rssi,
    )
    return device
  }

  override fun onBluetoothContainerDeviceConnected(bluetoothContainerDevice: BluetoothContainerDevice) {
    Log.d(tag, "onBluetoothContainerDeviceConnected: ${toDeviceLog(bluetoothContainerDevice)}")
    emitOnBluetoothContainerDeviceConnected(convertBluetoothContainerDevice(bluetoothContainerDevice))
  }

  override fun onBluetoothContainerDeviceConnectionFailed(bluetoothContainerDevice: BluetoothContainerDevice) {
    Log.d(tag, "onBluetoothContainerDeviceConnectionFailed: ${toDeviceLog(bluetoothContainerDevice)}")
    emitOnBluetoothContainerDeviceConnectionFailed(
      convertBluetoothContainerDevice(
        bluetoothContainerDevice
      )
    )
  }

  override fun onBluetoothContainerDeviceDisconnected(bluetoothContainerDevice: BluetoothContainerDevice) {
    Log.d(tag, "onBluetoothContainerDeviceDisconnected: ${toDeviceLog(bluetoothContainerDevice)}")
    emitOnBluetoothContainerDeviceDisconnected(
      convertBluetoothContainerDevice(
        bluetoothContainerDevice
      )
    )
  }

  override fun onBluetoothContainerDeviceDiscovered(bluetoothContainerDevice: BluetoothContainerDevice) {
    Log.d(tag, "onBluetoothContainerDeviceDiscovered: ${toDeviceLog(bluetoothContainerDevice)}")
    emitOnBluetoothContainerDeviceDiscovered(
      convertBluetoothContainerDevice(
        bluetoothContainerDevice
      )
    )
  }

  override fun onBluetoothStateChanged(bluetoothState: BluetoothState) {
    Log.d(tag, "onBluetoothStateChanged: state=${bluetoothState.name}")
    emitOnBluetoothStateChanged(bluetoothState.name)
  }

  override fun onScanStarted() {
    Log.d(tag, "onScanStarted")
    emitOnScanStarted()
  }

  override fun onScanStopped() {
    Log.d(tag, "onScanStopped")
    emitOnScanStopped()
  }

  override fun onUnlockError(bluetoothContainerDevice: BluetoothContainerDevice, error: String?) {
    Log.d(tag, "onUnlockError: ${toDeviceLog(bluetoothContainerDevice)}, error=$error")
    emitOnUnlockError(error)
  }

  override fun onUnlockFinished(bluetoothContainerDevice: BluetoothContainerDevice) {
    Log.d(tag, "onUnlockFinished: ${toDeviceLog(bluetoothContainerDevice)}")
    emitOnUnlockFinished(convertBluetoothContainerDevice(bluetoothContainerDevice))
  }

  private val currentReactContext: ReactApplicationContext = reactContext

  override fun checkBluetoothPermission(promise: Promise) {
    val result = checkBluetoothPermissions(currentReactContext)
    promise.resolve(true)
  }

  override fun onGetTransactionsSuccess(
    bluetoothContainerDevice: BluetoothContainerDevice,
    transactions: String
  ) {
    Log.d(tag, "onGetTransactionsSuccess: ${toDeviceLog(bluetoothContainerDevice)}, transactions=$transactions")
//    TODO("Not yet implemented")
  }

  override fun onGetTransactionsFailed(
    bluetoothContainerDevice: BluetoothContainerDevice,
    error: String
  ) {
    Log.d(tag, "onGetTransactionsFailed: ${toDeviceLog(bluetoothContainerDevice)}, error=$error")
//    TODO("Not yet implemented")
  }

  override fun onSetWhitelistFinished(
    bluetoothContainerDevice: BluetoothContainerDevice,
    whiteListResult: Int
  ) {
    Log.d(tag, "onSetWhitelistFinished: ${toDeviceLog(bluetoothContainerDevice)}, whiteListResult=$whiteListResult")
//    TODO("Not yet implemented")
  }

  override fun onSetWhitelistFailed(
    bluetoothContainerDevice: BluetoothContainerDevice,
    error: String
  ) {
    Log.d(tag, "onSetWhitelistFailed: ${toDeviceLog(bluetoothContainerDevice)}, error=$error")
//    TODO("Not yet implemented")
  }
}
