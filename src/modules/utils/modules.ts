import {ModuleSlug} from '@/modules/slugs'
import {Module, ModuleClientConfig, ModuleServerConfig} from '@/modules/types'

export const mergeModulesConfig = (
  clientConfig: ModuleClientConfig[],
  serverConfig: ModuleServerConfig[],
) => {
  const modules: Module[] = []

  serverConfig.forEach(serverModule => {
    const clientModule = clientConfig.find(
      ({slug}) => slug === serverModule.moduleSlug,
    )

    if (!clientModule) {
      return
    }

    modules.push({...clientModule, ...serverModule})
  })

  return modules
}

export const postProcessModules = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clientModuleConfigs: ModuleClientConfig<any, any>[],
  userDisabledModulesBySlug: string[],
  authorizedModulesBySlug: string[],
  serverModuleConfigs: ModuleServerConfig[],
) => {
  const mergedModules = mergeModulesConfig(
    clientModuleConfigs,
    serverModuleConfigs,
  )

  const modules = mergedModules.filter(
    ({requiresAuthorization, slug}) =>
      !requiresAuthorization || authorizedModulesBySlug.includes(slug),
  )

  const enabledModules: Module[] = []
  const toggleableModules: Module[] = []
  const enabledModulesBySlug: ModuleSlug[] = []

  modules.forEach(module => {
    const {alwaysEnabled, slug} = module

    // only modules that are not "alwaysEnabled" may be toggled by the user
    if (!alwaysEnabled && !module.excludeFromHome) {
      toggleableModules.push(module)
    }

    // a module is enabled if it has the property `alwaysEnabled` or if it is enabled by the user
    if (alwaysEnabled || !userDisabledModulesBySlug?.includes(slug)) {
      enabledModules.push(module)
      enabledModulesBySlug.push(slug)
    }
  })

  return {
    /** All modules, disregarding authentication. Be careful when using this prop. You probably want to consider authorized or selected modules instead. */
    allModulesDangerous: mergedModules,
    /** Modules that a user has not disabled in the settings or that are always enabled. They may be not active (remotely disabled). */
    enabledModules,
    /** Modules that a user has not disabled in the settings or that are always enabled, by slug.  They may be not active (remotely disabled). */
    enabledModulesBySlug,
    /** Modules that a user may enable/disable in the settings. They may be not active (remotely disabled). */
    toggleableModules,
  }
}
