import {useEffect, useRef} from 'react'
import {AppState} from 'react-native'
import {
  PiwikAction,
  useTrackEvents,
  PiwikDimension,
} from '@/processes/logging/hooks/useTrackEvents'
import {LogTarget} from '@/processes/logging/utils/getTrackEvents'

export const AppStateListener = () => {
  const {ready, trackCustomEvent} = useTrackEvents()
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    if (!ready) {
      return
    }

    const subscription = AppState.addEventListener('change', nextAppState => {
      trackCustomEvent(
        'appStateChange',
        PiwikAction.appStateChange,
        {
          [PiwikDimension.newState]: [appState.current, nextAppState].join(
            ' -> ',
          ),
        },
        undefined,
        undefined,
        LogTarget.appInsights,
      )
      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [ready, trackCustomEvent])

  return null
}
