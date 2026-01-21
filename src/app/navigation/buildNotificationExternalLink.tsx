import {appPrefix} from '@/app/navigation/constants'

export const buildNotificationExternalLink = (externalRoute: string) => {
  const isValid =
    !!externalRoute &&
    typeof externalRoute === 'string' &&
    /^https?:\/\//.test(externalRoute)

  if (!isValid) {
    return null
  }

  const url = new URL(`${appPrefix}notification-redirect`)

  url.searchParams.append('url', externalRoute)

  return url.toString()
}
