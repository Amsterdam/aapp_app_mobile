import {useEffect} from 'react'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {
  PiwikAction,
  PiwikSessionDimension,
  useTrackEvents,
} from '@/processes/logging/hooks/useTrackEvents'
import {LogTarget} from '@/processes/logging/utils/getTrackEvents'

export const useLogDeviceInfoAnalytics = () => {
  const {ready, trackCustomEvent} = useTrackEvents()
  const {fontScale, isLandscape, isPortrait, isTablet} = useDeviceContext()

  useEffect(() => {
    if (!ready) {
      return
    }

    trackCustomEvent(
      'device',
      PiwikAction.deviceInfoChange,
      {
        [PiwikSessionDimension.fontScale]: fontScale.toString(),
        [PiwikSessionDimension.isLandscape]: isLandscape.toString(),
        [PiwikSessionDimension.isPortrait]: isPortrait.toString(),
        [PiwikSessionDimension.isTablet]: isTablet.toString(),
      },
      undefined,
      undefined,
      LogTarget.appInsights,
    )
  }, [fontScale, isLandscape, isPortrait, isTablet, ready, trackCustomEvent])
}
