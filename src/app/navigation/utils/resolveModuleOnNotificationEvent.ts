import type {ReduxDispatch} from '@/hooks/redux/types'
import {clientModules} from '@/modules/modules'
import type {PushNotification} from '@/types/notification'

/**
 * Resolves to a notification event handler if provided by the module it is sent from.
 * The handler takes care of side-effects.
 */
export const resolveModuleOnNotificationEvent = (
  pushNotification: PushNotification,
  dispatch: ReduxDispatch,
) =>
  clientModules
    .find(module => module.slug === pushNotification.data?.module_slug)
    ?.onNotificationEvent?.(pushNotification, dispatch)
