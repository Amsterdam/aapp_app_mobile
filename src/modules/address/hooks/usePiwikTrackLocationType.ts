import {useCallback} from 'react'
import {LocationType} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {PiwikAction, PiwikDimension} from '@/processes/piwik/types'

/**
 * Hook to log the change of locationType to Piwik.
 */
export const usePiwikTrackLocationType = () => {
  const {trackCustomEvent} = useTrackEvents()

  return useCallback(
    (moduleSlug: ModuleSlug, newType: LocationType, oldType?: LocationType) => {
      if (oldType !== newType) {
        trackCustomEvent(
          'useSetLocationType',
          PiwikAction.locationOrAddressSelectionChange,
          {
            [PiwikDimension.newState]: `${moduleSlug}: ${newType}`,
          },
        )
      }
    },
    [trackCustomEvent],
  )
}
