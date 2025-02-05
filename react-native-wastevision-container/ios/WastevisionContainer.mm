#import "WastevisionContainer.h"
#import "react_native_wastevision_container-Swift.h"

@implementation WastevisionContainer
RCT_EXPORT_MODULE()

- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(a * b);

    return result;
}


- (void)init:(NSString *)servicePrincipalName servicePrincipalSecret:(NSString *)servicePrincipalSecret organisationId:(NSString *)organisationId {
    SwiftCalculator* calculator = [SwiftCalculator new];
    NSInteger value = [calculator addWithA:3 b:5];
    NSNumber* r = @(3+5);
}

- (void)startScan{
}

- (void)stopScan{
}

- (void)dispose{
}

- (void)autoUnlock:(NSString *)cardNumber{
}

- (void)checkBluetoothPermission:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject { 
    
}


- (void)connect:(JS::NativeWastevisionContainer::BluetoothContainerDevice &)bluetoothContainerDevice { 
    
}


- (void)disconnect:(JS::NativeWastevisionContainer::BluetoothContainerDevice &)bluetoothContainerDevice {
    
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeWastevisionContainerSpecJSI>(params);
}

@end
