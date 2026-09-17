package nl.amsterdam.app
import expo.modules.ReactActivityDelegateWrapper
import com.swmansion.rnscreens.fragment.restoration.RNScreensFragmentFactory

// Needed by react-navigation:
import android.os.Bundle

// Required for splashscreen
import com.zoontek.rnbootsplash.RNBootSplash

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

// Needed for certificate pinning
import com.facebook.react.modules.network.OkHttpClientProvider

class MainActivity : ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "AmsterdamApp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))

  // Needed by react-navigation:
  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.BootTheme); // initialize the splashscreen
    supportFragmentManager.fragmentFactory = RNScreensFragmentFactory()
    super.onCreate(savedInstanceState)

    OkHttpClientProvider.setOkHttpClientFactory(OkHttpClientWithCertificatePinningFactory());
  }
}