import {useEffect} from 'react'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {type ScreenOutsideNavigationName} from '@/processes/piwik/types'

export {ScreenOutsideNavigationName} from '@/processes/piwik/types'

export const useTrackScreenOutsideNavigation = (
  name: ScreenOutsideNavigationName,
  shouldTrack = true,
) => {
  const {trackScreen} = useTrackEvents()

  useEffect(() => {
    if (!shouldTrack) {
      return
    }

    trackScreen(name)
  }, [name, shouldTrack, trackScreen])
}
