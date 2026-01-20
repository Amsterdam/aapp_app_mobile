import type {PushNotification} from '@/types/notification'
import {getRouteFromNotification} from '@/app/navigation/getRouteFromNotification'
import {ModuleSlug} from '@/modules/slugs'

describe('getRouteFromNotification', () => {
  it('should return a module based route when no external url is provided', () => {
    const mockNotificationBG: Partial<PushNotification> = {
      data: {
        module_slug: ModuleSlug['burning-guide'],
        linkSourceid: '1234',
      },
      body: 'testBody',
      title: 'testTitle',
    }

    const mockNotificationWG: PushNotification = {
      data: {
        module_slug: ModuleSlug['waste-guide'],
        linkSourceid: '1234',
      },
      body: 'testBody',
      title: 'testTitle',
    }

    const mockNotificationMyAms: PushNotification = {
      data: {
        module_slug: ModuleSlug['mijn-amsterdam'],
        linkSourceid: '1234',
      },
      body: 'testBody',
      title: 'testTitle',
    }

    expect(getRouteFromNotification(mockNotificationBG)).toBe(
      'amsterdam://burning-guide',
    )
    expect(getRouteFromNotification(mockNotificationWG)).toBe(
      'amsterdam://afval/afvalinformatie/',
    )
    expect(getRouteFromNotification(mockNotificationMyAms)).toBeNull()
  })

  it('should return an external route when an external url is provided', () => {
    const mockNotification: PushNotification = {
      data: {
        url: 'https://amsterdam.nl',
        module_slug: ModuleSlug['mijn-amsterdam'],
        linkSourceid: '1234',
      },
      body: 'testBody',
      title: 'testTitle',
    }

    expect(getRouteFromNotification(mockNotification)).toBe(
      'amsterdam://notification-external-link?url=https://amsterdam.nl',
    )
  })
})
