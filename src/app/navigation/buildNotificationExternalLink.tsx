import {appPrefix} from '@/app/navigation/constants'

export const buildNotificationExternalLink = (
  externalRoute: string,
  title?: string,
  body?: string,
) => {
  try {
    const protocol = externalRoute.split(':')[0]
    const isValid = protocol === 'https' || protocol === 'http'

    if (!isValid || externalRoute.split(':')[1]?.length < 3) {
      return null
    }

    const params = new URLSearchParams({url: externalRoute})

    if (title) {
      params.append('title', title)
    }

    if (body) {
      params.append('body', body)
    }

    return `${appPrefix}notification-redirect?${params.toString()}`
  } catch {
    return null
  }
}
