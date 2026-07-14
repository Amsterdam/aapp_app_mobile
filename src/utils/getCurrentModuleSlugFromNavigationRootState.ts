import {navigationRef} from '@/app/navigation/navigationRef'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

export const getCurrentModuleSlugFromNavigationRootState = ():
  | ModuleSlug
  | undefined => {
  if (navigationRef.isReady()) {
    const state = navigationRef.getRootState()
    const routes = state?.routes

    if (routes) {
      for (let i = routes.length - 1; i >= 0; i--) {
        const moduleSlug = ModuleSlug[routes[i].name as keyof typeof ModuleSlug]

        if (moduleSlug) {
          return moduleSlug
        }
      }
    }
  }

  return undefined
}
