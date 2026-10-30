import {useCallback} from 'react'
import {Alert, Linking, Platform} from 'react-native'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

export type OpenPhoneUrl = (phoneNumber: string) => void

export const useOpenPhoneUrl = (): OpenPhoneUrl => {
  const trackException = useTrackException()
  const {trackOutlink} = useTrackEvents()

  return useCallback(
    (phoneNumber: string) => {
      let phoneUrl = ''

      if (Platform.OS === 'ios') {
        phoneUrl = `telprompt:${phoneNumber}`
      } else {
        phoneUrl = `tel:${phoneNumber}`
      }

      trackOutlink(phoneUrl)

      Linking.openURL(phoneUrl).catch(() => {
        Alert.alert('Sorry, deze functie is niet beschikbaar.')
        trackException(ExceptionLogKey.openPhoneUrl, 'useOpenPhoneUrl.ts')
      })
    },
    [trackException, trackOutlink],
  )
}
