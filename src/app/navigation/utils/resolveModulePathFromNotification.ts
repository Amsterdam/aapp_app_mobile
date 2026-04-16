import type {PushNotification} from '@/types/notification'
import {clientModules} from '@/modules/modules'

export const resolveModulePathFromNotification = (
  pushNotification: PushNotification,
) =>
  clientModules
    .find(module => module.slug === pushNotification?.data?.module_slug)
    ?.resolvePathFromNotification?.(pushNotification, !!pushNotification)
