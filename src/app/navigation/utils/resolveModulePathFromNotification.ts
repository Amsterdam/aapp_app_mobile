import type {PushNotification} from '@/types/notification'
import {clientModules} from '@/modules/modules'

export const resolveModulePathFromNotification = (
  pushNotification: PushNotification,
  isPushNotification: boolean,
) =>
  clientModules
    .find(module => module.slug === pushNotification?.data?.module_slug)
    ?.resolvePathFromNotification?.(pushNotification, isPushNotification)
