import {appPrefix} from '@/app/navigation/constants'

export const buildNotificationExternalLink = (externalRoute: string) => {
  try {
    const urlCheck = new URL(externalRoute)
    const isValid =
      urlCheck.protocol === 'https:' || urlCheck.protocol === 'http:'

    if (!isValid) {
      return null
    }

    const url = new URL(`${appPrefix}notification-redirect`)

    url.searchParams.append('url', externalRoute)

    return url.toString()
  } catch {
    return null
  }
}
