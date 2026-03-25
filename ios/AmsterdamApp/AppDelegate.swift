internal import Expo
import Firebase  // added for Firebase
import GoogleMaps
import RNBootSplash  // Added for react-native-bootsplash
import React
import ReactAppDependencyProvider
import React_RCTAppDelegate
import TrustKit  // added for certificate pinning
import UIKit

@main
class AppDelegate: ExpoAppDelegate {
    var window: UIWindow?

    var reactNativeDelegate: ReactNativeDelegate?
    var reactNativeFactory: RCTReactNativeFactory?

    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        if let apiKey = Bundle.main.object(forInfoDictionaryKey: "GOOGLE_MAPS_API_KEY") as? String {
            GMSServices.provideAPIKey(apiKey)
        }

        //Added for Firebase
        FirebaseApp.configure()

        // added for certificate pinning
        let trustKitConfig =
            [
                kTSKSwizzleNetworkDelegates: true,
                kTSKPinnedDomains: [
                    "ontw.app.amsterdam.nl": [
                        kTSKPublicKeyHashes: [
                            "Gy75+d3BkwDslWfDE8gxDA71rPZ/ooQNdy9cJxuELhM=",  // ontw.app.amsterdam.nl
                            "lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=",  // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1
                            "i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=",  // DigiCert Global Root G2
                        ],
                        kTSKEnforcePinning: true,
                        kTSKIncludeSubdomains: false,
                        kTSKDisableDefaultReportUri: true,
                    ],
                    "test.app.amsterdam.nl": [
                        kTSKPublicKeyHashes: [
                            "phZEpdzfo4JocyH23+aQrL0QBSuoWBeJ/PfR5c5n2kE=",  // test.app.amsterdam.nl
                            "lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=",  // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1
                            "i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=",  // DigiCert Global Root G2
                        ],
                        kTSKEnforcePinning: true,
                        kTSKIncludeSubdomains: false,
                        kTSKDisableDefaultReportUri: true,
                    ],
                    "acc.app.amsterdam.nl": [
                        kTSKPublicKeyHashes: [
                            "6fXqTLHGGwijHIfl1WGZUElGgmdQ4dZqVug9l6caJm4=",  // acc.app.amsterdam.nl
                            "lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=",  // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1
                            "i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=",  // DigiCert Global Root G2
                        ],
                        kTSKEnforcePinning: true,
                        kTSKIncludeSubdomains: false,
                        kTSKDisableDefaultReportUri: true,
                    ],
                    "app.amsterdam.nl": [
                        kTSKPublicKeyHashes: [
                            "aWo/H7b6jYpKas1mQinYbeyZptbXpKOKROf2FOQEV3s=",  // app.amsterdam.nl
                            "lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=",  // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1
                            "i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=",  // DigiCert Global Root G2
                        ],
                        kTSKEnforcePinning: true,
                        kTSKIncludeSubdomains: false,
                        kTSKDisableDefaultReportUri: true,
                    ],
                ],
            ] as [String: Any]
        TrustKit.initSharedInstance(withConfiguration: trustKitConfig)

        let delegate = ReactNativeDelegate()
        let factory = ExpoReactNativeFactory(delegate: delegate)
        delegate.dependencyProvider = RCTAppDependencyProvider()

        reactNativeDelegate = delegate
        reactNativeFactory = factory

        #if os(iOS) || os(tvOS)
            window = UIWindow(frame: UIScreen.main.bounds)
            factory.startReactNative(
                withModuleName: "main",
                in: window,
                launchOptions: launchOptions)
        #endif

        // set default accessibilityLanguage
        application.accessibilityLanguage = "nl-NL"

        factory.startReactNative(
            withModuleName: "AmsterdamApp",
            in: window,
            launchOptions: launchOptions
        )

        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }

    // Handle custom URL schemes (deep links)
    override func application(
        _ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]
    ) -> Bool {
        return super.application(app, open: url, options: options)
            || RCTLinkingManager.application(app, open: url, options: options)
    }

    // Handle Universal Links
    override func application(
        _ application: UIApplication,
        continue userActivity: NSUserActivity,
        restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
    ) -> Bool {
        let result = RCTLinkingManager.application(
            application, continue: userActivity, restorationHandler: restorationHandler)
        return super.application(
            application, continue: userActivity, restorationHandler: restorationHandler) || result
    }
}

class ReactNativeDelegate: ExpoReactNativeFactoryDelegate {
    override func sourceURL(for bridge: RCTBridge) -> URL? {
        bridge.bundleURL ?? bundleURL()
    }

    override func bundleURL() -> URL? {
        #if DEBUG
            return RCTBundleURLProvider.sharedSettings().jsBundleURL(
                forBundleRoot: ".expo/.virtual-metro-entry")
        #else
            return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
        #endif
    }

    // Added for react-native-bootsplash:
    override func customize(_ rootView: RCTRootView) {
        super.customize(rootView)
        RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView)  // ⬅️ initialize the splash screen
    }
}
