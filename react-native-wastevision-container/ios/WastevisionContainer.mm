#import "WastevisionContainer.h"
#import "react_native_wastevision_container-Swift.h"

@interface WastevisionContainer () <WasteVisionContainerDelegate> {
  bool hasListeners;
}

@end
@implementation WastevisionContainer
RCT_EXPORT_MODULE()

WasteVisionContainer* wasteVisionContainer;

- (void)init:(NSString *)servicePrincipalName servicePrincipalSecret:(NSString *)servicePrincipalSecret organisationId:(NSString *)organisationId {
    wasteVisionContainer = [[WasteVisionContainer alloc] initWithServicePrincipalName:servicePrincipalName servicePrincipalSecret:servicePrincipalSecret organisationId:organisationId delegate: self];
}

- (void)startScan{
    [wasteVisionContainer startScan];
}

- (void)stopScan{
    [wasteVisionContainer stopScan];
}

- (void)dispose{
}

- (void)autoUnlock:(NSString *)cardNumber{
    [wasteVisionContainer autoUnlockWithCardId:cardNumber];
}

- (void)checkBluetoothPermission:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject { 
    
}


- (void)connect:(JS::NativeWastevisionContainer::BluetoothContainerDevice &)bluetoothContainerDevice {
    [wasteVisionContainer connectWithBluetoothContainerDevice:[self parseJSBluetoothContainerDevice:bluetoothContainerDevice]];
}

- (void)disconnect:(JS::NativeWastevisionContainer::BluetoothContainerDevice &)bluetoothContainerDevice {
    [wasteVisionContainer disconnectWithBluetoothContainerDevice:[self parseJSBluetoothContainerDevice:bluetoothContainerDevice]];
}

- (void)unlock:(JS::NativeWastevisionContainer::BluetoothContainerDevice &)bluetoothContainerDevice cardId:(NSString *)cardId {
    [wasteVisionContainer unlockWithBluetoothContainerDevice:[self parseJSBluetoothContainerDevice:bluetoothContainerDevice] cardId:cardId];
}

- (BluetoothContainerDevice * _Nonnull)parseJSBluetoothContainerDevice:(JS::NativeWastevisionContainer::BluetoothContainerDevice &)bluetoothContainerDeviceDict {
    NSNumber *rssi = nil;
    
    // Check if rssi has a value
    if (bluetoothContainerDeviceDict.rssi()) {
        rssi = @(bluetoothContainerDeviceDict.rssi().value());  // Unwrap and convert to NSNumber
    }
    BluetoothContainerDevice *objcDevice = [[BluetoothContainerDevice alloc] initWithAddress:bluetoothContainerDeviceDict.address() name:bluetoothContainerDeviceDict.name() rssi: rssi];
    return objcDevice;
}


- (void)onScanStarted{
    [self emitOnScanStarted];
}

- (void)onScanStopped {
    [self emitOnScanStopped];
}

- (void)onBluetoothStateChangedWithBluetoothState:(NSString *)bluetoothState {
    [self emitOnBluetoothStateChanged:bluetoothState];
}

- (void)onBluetoothContainerDeviceDiscoveredWithBluetoothContainerDevice:(BluetoothContainerDevice * _Nonnull)bluetoothContainerDevice {
    [self emitOnBluetoothContainerDeviceDiscovered:[self convertBluetoothContainerDeviceToDictionary:bluetoothContainerDevice]];
}

- (void)onBluetoothContainerDeviceConnectedWithBluetoothContainerDevice:(BluetoothContainerDevice * _Nonnull)bluetoothContainerDevice {
    [self emitOnBluetoothContainerDeviceConnected:[self convertBluetoothContainerDeviceToDictionary:bluetoothContainerDevice]];
}


- (void)onBluetoothContainerDeviceConnectionFailedWithBluetoothContainerDevice:(BluetoothContainerDevice * _Nonnull)bluetoothContainerDevice {
    [self emitOnBluetoothContainerDeviceConnectionFailed:[self convertBluetoothContainerDeviceToDictionary:bluetoothContainerDevice]];
}

- (void)onBluetoothContainerDeviceDisconnectedWithBluetoothContainerDevice:(BluetoothContainerDevice * _Nonnull)bluetoothContainerDevice {
    [self emitOnBluetoothContainerDeviceDisconnected:[self convertBluetoothContainerDeviceToDictionary:bluetoothContainerDevice]];
}

- (void)onUnlockErrorWithBluetoothContainerDevice:(BluetoothContainerDevice * _Nonnull)bluetoothContainerDevice error:(NSString * _Nullable)error {
    [self emitOnUnlockError:error];
}

- (void)onUnlockFinishedWithBluetoothContainerDevice:(BluetoothContainerDevice * _Nonnull)bluetoothContainerDevice {
    [self emitOnUnlockFinished:[self convertBluetoothContainerDeviceToDictionary:bluetoothContainerDevice]];
}

- (NSMutableDictionary *)convertBluetoothContainerDeviceToDictionary:(BluetoothContainerDevice * _Nonnull)bluetoothContainerDevice {
    NSMutableDictionary *bluetoothContainerDeviceDict = [NSMutableDictionary dictionary];
    bluetoothContainerDeviceDict[@"name"] = [bluetoothContainerDevice name];
    bluetoothContainerDeviceDict[@"address"] = [bluetoothContainerDevice address];
    // Handle rssi as an optional NSNumber
    NSNumber *rssi = [bluetoothContainerDevice rssi];
    if (rssi != nil) {
        bluetoothContainerDeviceDict[@"rssi"] = rssi;
    } else {
        bluetoothContainerDeviceDict[@"rssi"] = [NSNull null];  // Use NSNull for nil rssi
    }
    return [bluetoothContainerDeviceDict copy];
}
    



- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeWastevisionContainerSpecJSI>(params);
}

@end
