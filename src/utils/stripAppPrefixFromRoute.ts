import {appPrefix} from '@/app/navigation/constants'

export const stripAppPrefixFromRoute = (route: string | undefined | null) => {
  if (typeof route !== 'string') {
    return undefined
  }

  if (route.startsWith(appPrefix)) {
    return `/${route.slice(appPrefix.length)}`
  }

  if (!route.startsWith('/')) {
    return `/${route}`
  }

  return route
}
