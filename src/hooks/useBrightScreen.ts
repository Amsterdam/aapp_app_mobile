import {getBrightnessAsync, setBrightnessAsync} from 'expo-brightness'
import {useEffect} from 'react'

export const useBrightScreen = (enabled = true) => {
  useEffect(() => {
    if (enabled) {
      const oldBrightness = getBrightnessAsync()

      void oldBrightness.then(() => {
        void setBrightnessAsync(1)
      })

      return () => {
        void oldBrightness.then(brightness => {
          void setBrightnessAsync(brightness)
        })
      }
    } else {
      return () => null
    }
  }, [enabled])
}
