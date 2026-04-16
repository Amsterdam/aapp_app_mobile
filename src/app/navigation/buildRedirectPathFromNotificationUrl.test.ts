import {buildRedirectPathFromNotificationUrl} from '@/app/navigation/buildRedirectPathFromNotificationUrl'
import {appPrefix} from '@/app/navigation/constants'

describe('buildRedirectPathFromNotificationUrl', () => {
  it('should return null when no valid external url is provided', () => {
    expect(buildRedirectPathFromNotificationUrl('')).toBeUndefined()

    expect(
      buildRedirectPathFromNotificationUrl(undefined as unknown as string),
    ).toBeUndefined()

    expect(
      buildRedirectPathFromNotificationUrl('randomScheme://test.com'),
    ).toBeUndefined()
    expect(buildRedirectPathFromNotificationUrl('https://')).toBeUndefined()
    expect(buildRedirectPathFromNotificationUrl('mailto://')).toBeUndefined()
  })

  it('should return in-app deeplink to notification module with external link as param if valid externalLink is provided', () => {
    const validLink = 'https://mijn.amsterdam.nl'
    const validLink2 = 'https://d'
    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    const validLink3 = 'http://amsterdam.nl'

    expect(buildRedirectPathFromNotificationUrl(validLink)).toMatch(
      /^amsterdam:\/\/notification-redirect\?url=/,
    )
    const url = new URL(
      buildRedirectPathFromNotificationUrl(validLink) as string,
    )

    expect(url.hostname).toBe('notification-redirect')
    expect(url.search).toBe(`?url=${encodeURIComponent(validLink)}`)
    expect(url.protocol).toBe(appPrefix.slice(0, -2))

    expect(buildRedirectPathFromNotificationUrl(validLink2)).not.toBeUndefined()
    expect(buildRedirectPathFromNotificationUrl(validLink3)).not.toBeUndefined()
  })
})
