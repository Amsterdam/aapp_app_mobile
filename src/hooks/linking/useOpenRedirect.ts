import {useCallback} from 'react'
import {Alert} from 'react-native'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useGetRedirectUrlsQuery} from '@/modules/redirects/service'
import {RedirectKey} from '@/modules/redirects/types'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

export const useOpenRedirect = () => {
  const openWebUrl = useOpenWebUrl()
  const {
    data: redirectUrls,
    isLoading,
    isError,
    refetch,
  } = useGetRedirectUrlsQuery()
  const trackException = useTrackException()

  const openRedirect = useCallback(
    (redirectKey?: RedirectKey) => {
      if (!redirectUrls && !isLoading) {
        void refetch()
      }

      if (redirectKey && redirectUrls?.[redirectKey]) {
        openWebUrl(redirectUrls[redirectKey])
      } else {
        if (redirectUrls) {
          Alert.alert(`Sorry, deze functie is niet beschikbaar.`)
        } else {
          Alert.alert(
            `Sorry, deze functie is even niet beschikbaar.`,
            'Probeer het later opnieuw.',
          )
        }

        if (redirectUrls) {
          trackException(ExceptionLogKey.redirectNotFound, 'Redirects.tsx', {
            urlKey: redirectKey,
            redirectsAvailable: !!redirectUrls,
          })
        }
      }
    },
    [isLoading, openWebUrl, redirectUrls, refetch, trackException],
  )

  return {openRedirect, isLoading, isError, redirectUrls}
}
