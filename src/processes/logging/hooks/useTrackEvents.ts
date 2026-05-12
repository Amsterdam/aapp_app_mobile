import {useContext, useMemo} from 'react'
import {navigationRef} from '@/app/navigation/navigationRef'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {getTrackEvents} from '@/processes/logging/utils/getTrackEvents'
import {useAppInsights} from '@/providers/appinsights.provider'
// eslint-disable-next-line no-restricted-imports
import {PiwikContext} from '@/providers/piwik.context'
import {getCurrentModuleSlugFromNavigationRootState} from '@/utils/getCurrentModuleSlugFromNavigationRootState'

export {
  PiwikAction,
  PiwikDimension,
  PiwikSessionDimension,
} from '@/processes/piwik/types'

export type Params = Record<string, unknown>

export const useTrackEvents = () => {
  const piwikInstance = useContext(PiwikContext)
  const route = navigationRef.isReady()
    ? navigationRef.getCurrentRoute()
    : undefined
  const suggestedCategory =
    getCurrentModuleSlugFromNavigationRootState() ?? 'general'

  const appInsights = useAppInsights()
  const trackException = useTrackException()

  return useMemo(
    () =>
      getTrackEvents(
        trackException,
        suggestedCategory,
        appInsights,
        piwikInstance,
        route?.name,
        route?.params ?? {},
      ),
    [
      piwikInstance,
      trackException,
      suggestedCategory,
      appInsights,
      route?.name,
      route?.params,
    ],
  )
}
