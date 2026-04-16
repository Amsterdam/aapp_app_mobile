import {
  resolvePathFromNotification,
  type PushNotificationType,
} from '@/modules/construction-work/notifications/resolvePathFromNotification'
import {ModuleSlug} from '@/modules/slugs'
import {PushNotification} from '@/types/notification'

describe('createRoute', () => {
  const mockNotification = {
    data: {
      type: 'NewsUpdatedByProjectManager',
      linkSourceid: '123',
      module_slug: ModuleSlug['construction-work'],
    },
    title: 'Title',
    body: 'Body',
  } as const

  it('should return undefined if data or notification is not provided', () => {
    expect(resolvePathFromNotification?.({}, false)).toBeUndefined()
  })

  it('should return undefined if data linkSourceid is missing', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: {} as PushNotification<{
            type: PushNotificationType
          }>['data'],
          title: mockNotification.title,
          body: mockNotification.body,
        },

        false,
      ),
    ).toBeUndefined()
  })

  it('should return route with only linkSourceid param, if notification title is missing', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: mockNotification.data,
          body: mockNotification.body,
        },

        true,
      ),
    ).toBe('/news/123//%20-%20Body/true')
  })

  it('should return route with linkSourceid param and title param, if body is missing', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: mockNotification.data,
          title: mockNotification.title,
        },
        false,
      ),
    ).toBe('/news/123/Title/Title%20-%20/false')
  })

  it('should return route with all params', () => {
    expect(resolvePathFromNotification?.(mockNotification, true)).toBe(
      '/news/123/Title/Title%20-%20Body/true',
    )
  })

  it('should return route with only linkSourceid param, if notification title is an empty string', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: mockNotification.data,
          body: mockNotification.body,
          title: '',
        },
        false,
      ),
    ).toBe('/news/123//%20-%20Body/false')
  })

  it('should return route with linkSourceid param and title param, if body is an empty string', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: mockNotification.data,
          title: mockNotification.title,
          body: '',
        },
        false,
      ),
    ).toBe('/news/123/Title/Title%20-%20/false')
  })

  it('should url encode title and body', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: mockNotification.data,
          title: 'Test title',
          body: 'Test/body',
        },
        true,
      ),
    ).toBe('/news/123/Test%20title/Test%20title%20-%20Test%2Fbody/true')
  })
})
