import {useEffect} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {clientModules} from '@/modules/modules'
import {
  PiwikAction,
  useTrackEvents,
} from '@/processes/logging/hooks/useTrackEvents'
import {LogTarget} from '@/processes/logging/utils/getTrackEvents'
import {CustomDimensions} from '@/processes/piwik/types'
import {selectDisabledModules} from '@/store/slices/modules'

export const useLogModuleAnalytics = () => {
  const {ready, trackCustomEvent} = useTrackEvents()
  const userDisabledModulesBySlug = useSelector(selectDisabledModules)

  useEffect(() => {
    if (!ready) {
      return
    }

    const dimensions = clientModules.reduce<CustomDimensions>((acc, module) => {
      if (!module.logDimension) {
        return acc
      }

      return {
        ...acc,
        [module.logDimension]: !userDisabledModulesBySlug.includes(module.slug)
          ? 'enabled'
          : 'disabled',
      }
    }, {})

    trackCustomEvent(
      'modules',
      PiwikAction.moduleChange,
      dimensions,
      undefined,
      undefined,
      LogTarget.appInsights,
    )
  }, [ready, trackCustomEvent, userDisabledModulesBySlug])
}
