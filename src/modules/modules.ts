import type {ModuleClientConfig, CoreModuleConfig} from '@/modules/types'
import {accessCodeModule} from '@/modules/access-code'
import {addressModule} from '@/modules/address'
import {clientModules as clientModulesGenerated} from '@/modules/generated/clientModules.generated'
import {homeModule} from '@/modules/home'
import {onboardingModule} from '@/modules/onboarding'
import {userModule} from '@/modules/user'

/**
 * Core Modules don't have a server part and are always loaded.
 */
export const coreModules = [
  accessCodeModule,
  addressModule,
  homeModule,
  onboardingModule,
  userModule,
]

/**
 * Client Modules have a server part and can be turned on/off per release.
 */
export const clientModules = clientModulesGenerated

export const allModules: Array<ModuleClientConfig | CoreModuleConfig> = [
  ...coreModules,
  ...clientModules,
]
