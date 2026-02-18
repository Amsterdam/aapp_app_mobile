import {Alert} from 'react-native'
import type {ModuleSlug} from '@/modules/slugs'
import {useStore} from '@/hooks/redux/useStore'
import {useIsLoggedIn} from '@/modules/generated/useIsLoggedIn.generated'
import {clientModules} from '@/modules/modules'

export const useLogoutWithAlert = (slug: ModuleSlug, title: string) => {
  const store = useStore()
  const isLoggedIn = useIsLoggedIn[slug as keyof typeof useIsLoggedIn]?.()

  const waitForLogout = () =>
    new Promise<void>((resolve, reject) => {
      const module = clientModules.find(m => m.slug === slug)

      if (!module?.logout) {
        resolve()

        return
      }

      module
        .logout(store.dispatch, store.getState())
        .then(() => resolve())
        .catch(() => reject(new Error('Logout failed')))
    })

  return () =>
    new Promise<void>((resolve, reject) => {
      if (!isLoggedIn) {
        resolve()

        return
      }

      Alert.alert(
        ` ${title} uitzetten`,
        'Als u dit uitzet, logt u uit. Log opnieuw in om het weer te gebruiken.',
        [
          {
            text: 'Annuleren',
            style: 'cancel',
            onPress: () => reject(new Error('User cancelled logout')),
          },
          {
            text: 'Uitzetten',
            style: 'destructive',
            onPress: () => {
              void waitForLogout().then(resolve)
            },
          },
        ],
        {
          cancelable: true,
          onDismiss: () => reject(new Error('User dismissed logout')),
        },
      )
    })
}
