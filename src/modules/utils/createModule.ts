import type {ModuleSlug} from '@/modules/slugs'
import type {CoreModuleConfig, ModuleClientConfig} from '@/modules/types'
import {type SvgIconVariantConfig} from '@/components/ui/media/svgIcons'

export const createClientModule = <
  PushNotificationData extends Record<string, unknown> = Record<
    string,
    unknown
  >,
  Icons extends SvgIconVariantConfig | void = void,
  Slug extends ModuleSlug = ModuleSlug,
>(
  module: ModuleClientConfig<PushNotificationData, Icons, Slug>,
) => module

export const createCoreModule = (module: CoreModuleConfig) => module
