import {appPrefix} from '@/app/navigation/constants'

export const buildRedirectPathFromNotificationUrl = (
  externalRoute: string,
  title?: string,
  body?: string,
) => {
  try {
    const splitRoute = externalRoute.split(':')

    if (splitRoute.length < 2) {
      return
    }

    const protocol = `${splitRoute[0]}:`
    const isValid = protocol === 'https:' || protocol === 'http:'

    if (!isValid || splitRoute[1]?.length < 3) {
      return
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
    return
  }
}
