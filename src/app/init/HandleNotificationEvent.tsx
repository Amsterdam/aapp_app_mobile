import notifee from '@notifee/react-native'
import {useEffect, useRef} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useModules} from '@/hooks/useModules'
import {baseApi} from '@/services/baseApi'
import {store} from '@/store/store'

export const HandleNotificationEvent = () => {
  const {enabledModules} = useModules()
  const enabledModulesRef = useRef(enabledModules)
  const dispatch = useDispatch()

  // this ref trick is used to not trigger a new listener on the notifee background event and still have the latest information
  enabledModulesRef.current = enabledModules

  useEffect(() => {
    notifee.onBackgroundEvent(({type, detail}) => {
      enabledModulesRef.current
        ?.find(module => module.slug === detail.notification?.data?.module)
        ?.onNotificationEvent?.(type, detail, true, store.dispatch)

      dispatch(baseApi.util.invalidateTags(['Notifications']))

      return Promise.resolve()
    })
  }, [dispatch])

  return null
}
