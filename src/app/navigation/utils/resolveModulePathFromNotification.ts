import {clientModules} from '@/modules/modules'
import type {PushNotification} from '@/types/notification'

export const resolveModulePathFromNotification = (
  pushNotification: PushNotification,
  isPushNotification: boolean,
) =>
  clientModules
    .find(module => module.slug === pushNotification?.data?.module_slug)
    ?.resolvePathFromNotification?.(pushNotification, isPushNotification)
