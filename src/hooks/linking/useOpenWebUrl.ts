import {useCallback} from 'react'
import {Alert, Linking} from 'react-native'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {addAppParamsToUrl} from '@/utils/addAppParamsToUrl'
import {getCurrentModuleSlugFromNavigationRootState} from '@/utils/getCurrentModuleSlugFromNavigationRootState'

export type OpenWebUrl = (url: string, addAppParams?: boolean) => void

export const useOpenWebUrl = (): OpenWebUrl => {
  const trackException = useTrackException()
  const {trackOutlink} = useTrackEvents()

  return useCallback(
    (url: string, addAppParams = true) => {
      const fullUrl = addAppParams
        ? addAppParamsToUrl(url, getCurrentModuleSlugFromNavigationRootState())
        : url

      trackOutlink(fullUrl)

      Linking.openURL(fullUrl).catch(() => {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
        trackException(ExceptionLogKey.openWebUrl, 'useOpenWebUrl.ts', {
          url,
        })
      })
    },
    [trackException, trackOutlink],
  )
}
