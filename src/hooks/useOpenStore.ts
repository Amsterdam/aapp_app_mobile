import {useCallback} from 'react'
import {Alert, Linking, Platform} from 'react-native'
import {useTrackEvents} from '@/processes/logging/hooks/useTrackEvents'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'
import {STORE_LINK} from '@/utils/storeLink'

export const useOpenStore = () => {
  const trackException = useTrackException()
  const {trackOutlink} = useTrackEvents()

  return useCallback(() => {
    const log = (error: unknown) =>
      trackException(ExceptionLogKey.openStore, 'useOpenStore.ts', {
        error,
      })

    Linking.canOpenURL(STORE_LINK)
      .then(supported => {
        trackOutlink(STORE_LINK)

        if (!supported) {
          trackException(
            ExceptionLogKey.notSupportedStoredUrl,
            'useOpenStore.ts',
          )
        }

        Linking.openURL(STORE_LINK).catch(() =>
          Alert.alert(
            `${Platform.OS === 'ios' ? 'App' : 'Google Play'} Store openen is niet mogelijk.`,
            `Ga naar de ${Platform.OS === 'ios' ? 'App' : 'Google Play'} Store om de app handmatig te updaten.`,
            [
              {
                text: 'Sluiten',
                style: 'cancel',
              },
            ],
            {
              cancelable: true,
            },
          ),
        )
      })
      .catch(log)
  }, [trackException, trackOutlink])
}
