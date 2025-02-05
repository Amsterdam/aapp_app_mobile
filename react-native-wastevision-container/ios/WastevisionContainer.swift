import WasteVisionSDK

@objc public class BluetoothContainerDevice: NSObject {
    @objc public let address: String
    @objc public let name: String?
    @objc public let rssi: NSNumber?

    @objc public init(address: String, name: String?, rssi: NSNumber?) {
        self.address = address
        self.name = name
        self.rssi = rssi
    }
}

@objc public protocol WasteVisionContainerDelegate {
    func onBluetoothStateChanged(bluetoothState: String)
    func onScanStarted()
    func onScanStopped()
    func onBluetoothContainerDeviceDiscovered(bluetoothContainerDevice: BluetoothContainerDevice)
    func onBluetoothContainerDeviceConnected(bluetoothContainerDevice: BluetoothContainerDevice)
    func onBluetoothContainerDeviceConnectionFailed(bluetoothContainerDevice: BluetoothContainerDevice)
    func onBluetoothContainerDeviceDisconnected(bluetoothContainerDevice: BluetoothContainerDevice)
    func onUnlockFinished(bluetoothContainerDevice: BluetoothContainerDevice)
    func onUnlockError(bluetoothContainerDevice: BluetoothContainerDevice, error: String?)
}

@objc
public class WasteVisionContainer: NSObject, BluetoothConnectionDelegate {
    
    public weak var delegate: WasteVisionContainerDelegate?
    var discoveredDevices: [WasteVisionSDK.BluetoothContainerDevice] = []
    
    private var bluetoothConnectionManager: BluetoothConnectionManager
    @objc
    public init(servicePrincipalName: String, servicePrincipalSecret: String, organisationId: String, delegate: WasteVisionContainerDelegate) {
        self.bluetoothConnectionManager = BluetoothConnectionManager()
        super.init()
        self.bluetoothConnectionManager.setBluetoothConnectionDelegate(bluetoothConnectionDelegate: self)
        let config = SDKConfiguration(
            organisationId: organisationId,
            servicePrincipalName: servicePrincipalName,
            servicePrincipalSecret: servicePrincipalSecret,
            environment: .production
        )
        self.bluetoothConnectionManager.setup(sdkConfiguration: config)
        self.delegate = delegate
    }
    @objc
    public func startScan() -> Void {
        self.bluetoothConnectionManager.startScan()
    }
    @objc
    public func stopScan() -> Void {
        self.bluetoothConnectionManager.stopScan()
    }
    @objc
    public func autoUnlock(cardId: String) -> Void {
        self.bluetoothConnectionManager.autoUnlock(cardId: cardId)
    }
    @objc
    public func connect(bluetoothContainerDevice: BluetoothContainerDevice) -> Void {
        let device = self.findBluetoothContainerDeviceDevice(bluetoothContainerDevice: bluetoothContainerDevice)
        if (device != nil) {
            self.bluetoothConnectionManager.connect(bluetoothContainerDevice: device!)
        }
    }
    @objc
    public func disconnect(bluetoothContainerDevice: BluetoothContainerDevice) -> Void {
        let device = self.findBluetoothContainerDeviceDevice(bluetoothContainerDevice: bluetoothContainerDevice)
        if (device != nil) {
            self.bluetoothConnectionManager.disconnect(bluetoothContainerDevice: device!)
        }
    }
    @objc
    public func unlock(bluetoothContainerDevice: BluetoothContainerDevice, cardId: String) -> Void {
        let device = self.findBluetoothContainerDeviceDevice(bluetoothContainerDevice: bluetoothContainerDevice)
        if (device != nil) {
            self.bluetoothConnectionManager.unlock(bluetoothContainerDevice: device!, cardId: cardId)
        }
    }
    
    public func onBluetoothStateChanged(bluetoothState: WasteVisionSDK.BluetoothState) {
        self.delegate?.onBluetoothStateChanged(bluetoothState: bluetoothState.rawValue)
    }
    
    public func onScanStarted() {
//        DispatchQueue.main.async {
//            WastevisionContainer.sharedInstance.onScanStarted()
//        }
        self.delegate?.onScanStarted()
    }
    
    public func onScanStopped() {
        self.delegate?.onScanStopped()
    }
    
    func findBluetoothContainerDeviceDevice(bluetoothContainerDevice: BluetoothContainerDevice) -> WasteVisionSDK.BluetoothContainerDevice? {
        return discoveredDevices.first { $0.uuid.uuidString == bluetoothContainerDevice.address }
    }
    
    public func onBluetoothContainerDeviceDiscovered(bluetoothContainerDevice: WasteVisionSDK.BluetoothContainerDevice) {
        if !discoveredDevices.contains(where: { $0.uuid == bluetoothContainerDevice.uuid }) {
            discoveredDevices.append(bluetoothContainerDevice)
        }
        self.delegate?.onBluetoothContainerDeviceDiscovered(bluetoothContainerDevice: BluetoothContainerDevice(address: bluetoothContainerDevice.uuid.uuidString, name: bluetoothContainerDevice.name, rssi: bluetoothContainerDevice.RSSI))
        
    }
    
    public func onBluetoothContainerDeviceConnected(bluetoothContainerDevice: WasteVisionSDK.BluetoothContainerDevice) {
        self.delegate?.onBluetoothContainerDeviceConnected(bluetoothContainerDevice: BluetoothContainerDevice(address: bluetoothContainerDevice.uuid.uuidString, name: bluetoothContainerDevice.name, rssi: bluetoothContainerDevice.RSSI))
        
    }
    
    public func onBluetoothContainerDeviceConnectionFailed(bluetoothContainerDevice: WasteVisionSDK.BluetoothContainerDevice) {
        self.delegate?.onBluetoothContainerDeviceConnectionFailed(bluetoothContainerDevice: BluetoothContainerDevice(address: bluetoothContainerDevice.uuid.uuidString, name: bluetoothContainerDevice.name, rssi: bluetoothContainerDevice.RSSI))
        
    }
    
    public func onBluetoothContainerDeviceDisconnected(bluetoothContainerDevice: WasteVisionSDK.BluetoothContainerDevice) {
        self.delegate?.onBluetoothContainerDeviceDisconnected(bluetoothContainerDevice: BluetoothContainerDevice(address: bluetoothContainerDevice.uuid.uuidString, name: bluetoothContainerDevice.name, rssi: bluetoothContainerDevice.RSSI))
        
    }
    
    public func onUnlockFinished(bluetoothContainerDevice: WasteVisionSDK.BluetoothContainerDevice) {
        self.delegate?.onUnlockFinished(bluetoothContainerDevice: BluetoothContainerDevice(address: bluetoothContainerDevice.uuid.uuidString, name: bluetoothContainerDevice.name, rssi: bluetoothContainerDevice.RSSI))
        
    }
    
    public func onUnlockError(bluetoothContainerDevice: WasteVisionSDK.BluetoothContainerDevice, error: String?) {
        self.delegate?.onUnlockError(bluetoothContainerDevice: BluetoothContainerDevice(address: bluetoothContainerDevice.uuid.uuidString, name: bluetoothContainerDevice.name, rssi: bluetoothContainerDevice.RSSI), error: error)
        
    }
}
