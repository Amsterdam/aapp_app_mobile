import {useCallback} from 'react'
import {Alert, Linking} from 'react-native'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

export type OpenMailUrl = (emailAddress: string, subject?: string) => void

export const useOpenMailUrl = (): OpenMailUrl => {
  const trackException = useTrackException()
  const {trackOutlink} = useTrackEvents()

  return useCallback(
    (emailAddress: string, subject?: string) => {
      let mailUrl = `mailto:${emailAddress}`

      if (subject) {
        mailUrl += `?subject=${encodeURIComponent(subject)}`
      }

      trackOutlink(mailUrl)

      Linking.openURL(mailUrl).catch(() => {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
        trackException(ExceptionLogKey.openMailUrl, 'useOpenMailUrl.ts')
      })
    },
    [trackException, trackOutlink],
  )
}
