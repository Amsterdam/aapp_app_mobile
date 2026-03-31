package com.liveupdates

import com.facebook.react.bridge.ReactApplicationContext

class LiveUpdatesModule(reactContext: ReactApplicationContext) :
  NativeLiveUpdatesSpec(reactContext) {

  override fun startLiveUpdate(state: LiveUpdateState, config: LiveUpdateConfig?): Int? {
    // Implement your logic here
    return null
  }

  companion object {
    const val NAME = NativeLiveUpdatesSpec.NAME
  }
}
