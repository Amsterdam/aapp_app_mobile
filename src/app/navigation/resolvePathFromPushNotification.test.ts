import {resolvePathFromPushNotification} from '@/app/navigation/resolvePathFromPushNotification'
import {ModuleSlug} from '@/modules/slugs'

describe('resolvePathFromPushNotification', () => {
  it('should return an in-app module based route when no external url is provided', () => {
    const mockNotificationBG = {
      data: {
        module_slug: ModuleSlug['burning-guide'],
        linkSourceid: '1234',
      },
      body: 'testBody',
      title: 'testTitle',
    }

    const mockNotificationMyAms = {
      data: {
        module_slug: ModuleSlug['mijn-amsterdam'],
        linkSourceid: '1234',
      },
      body: 'testBody',
      title: 'testTitle',
    }

    expect(resolvePathFromPushNotification(mockNotificationBG)).toBe(
      'amsterdam://burning-guide',
    )
    expect(resolvePathFromPushNotification(mockNotificationMyAms)).toBe(
      'amsterdam://mijn-amsterdam',
    )
  })

  it('should return an in-app deeplink with external url as param when an external url is provided', () => {
    const mockNotification = {
      data: {
        url: 'https://amsterdam.nl',
        module_slug: ModuleSlug['mijn-amsterdam'],
        linkSourceid: '1234',
      },
      body: 'testBody',
      title: 'testTitle',
    }

    expect(resolvePathFromPushNotification(mockNotification)).toBe(
      'amsterdam://notification-redirect?url=https%3A%2F%2Famsterdam.nl&title=testTitle&body=testBody',
    )
  })
})
