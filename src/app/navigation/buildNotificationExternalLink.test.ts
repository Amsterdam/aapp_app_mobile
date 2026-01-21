import {buildNotificationExternalLink} from '@/app/navigation/buildNotificationExternalLink'
import {appPrefix} from '@/app/navigation/constants'

describe('buildNotificationExternalLink', () => {
  it('should return null when no valid external url is provided', () => {
    expect(buildNotificationExternalLink('')).toBeNull()

    expect(
      buildNotificationExternalLink(undefined as unknown as string),
    ).toBeNull()

    expect(buildNotificationExternalLink('randomScheme://test.com')).toBeNull()
  })

  it('should return in-app deeplink to notification module with external link as param if valid externalLink is provided', () => {
    const validLink = 'https://mijn.amsterdam.nl'

    // eslint-disable-next-line sonarjs/no-clear-text-protocols
    const validLink2 = 'http://mijn.amsterdam.nl'

    expect(buildNotificationExternalLink(validLink)).toMatch(
      /^amsterdam:\/\/notification-external-link\?url=/,
    )
    const url = new URL(buildNotificationExternalLink(validLink) as string)

    expect(url.hostname).toBe('notification-external-link')
    expect(url.search).toBe(`?url=${encodeURIComponent(validLink)}`)
    expect(url.protocol).toBe(appPrefix.slice(0, -2))

    expect(buildNotificationExternalLink(validLink2)).not.toBeNull()
  })
})
