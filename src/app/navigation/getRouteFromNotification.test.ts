jest.mock('@/store/store', () => ({
  store: {
    dispatch: jest.fn(),
  },
}))

import {getRouteFromNotification} from '@/app/navigation/getRouteFromNotification'
import {ModuleSlug} from '@/modules/slugs'

describe('getRouteFromNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return an in-app module based route when no external url is provided', () => {
    const mockNotificationBG = {
      data: {
        module_slug: ModuleSlug['burning-guide'],
        linkSourceid: '1234',
      },
      body: 'testBody',
      title: 'testTitle',
    }

    const mockNotificationWG = {
      data: {
        module_slug: ModuleSlug['waste-guide'],
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

    expect(getRouteFromNotification(mockNotificationBG)).toBe(
      'amsterdam://burning-guide',
    )
    expect(getRouteFromNotification(mockNotificationWG)).toBe(
      'amsterdam://afval/afvalinformatie/',
    )
    expect(getRouteFromNotification(mockNotificationMyAms)).toBe(
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

    expect(getRouteFromNotification(mockNotification)).toBe(
      'amsterdam://notification-redirect?url=https%3A%2F%2Famsterdam.nl&title=testTitle&body=testBody',
    )
  })
})
