import type {CoreModuleConfig, ModuleClientConfig} from '@/modules/types'
import {type SvgIconVariantConfig} from '@/components/ui/media/svgIcons'

export const createClientModule = <
  PushNotificationData extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  Icons extends SvgIconVariantConfig | void = void,
>(
  module: ModuleClientConfig<PushNotificationData, Icons>,
) => module

export const createCoreModule = (module: CoreModuleConfig) => module
