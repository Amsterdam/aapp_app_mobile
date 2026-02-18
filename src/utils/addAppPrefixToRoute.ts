import {appPrefix} from '@/app/navigation/constants'

export const addAppPrefixToRoute = (route: string | undefined | null) => {
  if (typeof route !== 'string') {
    return null
  }

  if (route.startsWith(appPrefix)) {
    return route
  }

  if (!route.startsWith('/')) {
    return `${appPrefix}${route}`
  }

  return `${appPrefix}${route.slice(1)}`
}
