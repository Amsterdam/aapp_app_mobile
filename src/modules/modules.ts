import type {ModuleClientConfig, CoreModuleConfig} from '@/modules/types'
import {clientModules as clientModulesGenerated} from '@/modules/generated/clientModules.generated'
import {coreModules as coreModulesGenerated} from '@/modules/generated/coreModules.generated'

/**
 * Core Modules don't have a server part and are always loaded.
 */
export const coreModules = coreModulesGenerated

/**
 * Client Modules have a server part and can be turned on/off per release.
 */
export const clientModules = clientModulesGenerated

export const allModules: Array<ModuleClientConfig | CoreModuleConfig> = [
  ...coreModules,
  ...clientModules,
]
