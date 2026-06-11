import {resolvePathFromNotification} from '@/modules/construction-work/notifications/resolvePathFromNotification'
import {ModuleSlug} from '@/modules/slugs'

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
  const mockNotificationArticleNew = {
    data: {
      type: 'construction-work:article-message',
      subtype: 'article',
      linkSourceid: '123',
      module_slug: ModuleSlug['construction-work'],
    },
    title: 'Title',
    body: 'Body',
  } as const
  const mockNotificationWarningNew = {
    data: {
      type: 'construction-work:article-message',
      subtype: 'warning',
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
          data: {},
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
    ).toBe('/construction-work/news/123//%20-%20Body/true')
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
    ).toBe('/construction-work/news/123/Title/Title%20-%20/false')
  })

  it('should return route with all params', () => {
    expect(resolvePathFromNotification?.(mockNotification, true)).toBe(
      '/construction-work/news/123/Title/Title%20-%20Body/true',
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
    ).toBe('/construction-work/news/123//%20-%20Body/false')
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
    ).toBe('/construction-work/news/123/Title/Title%20-%20/false')
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
    ).toBe(
      '/construction-work/news/123/Test%20title/Test%20title%20-%20Test%2Fbody/true',
    )
  })

  it('should return warning route with url encode title and body', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: mockNotificationWarningNew.data,
          title: 'Test title',
          body: 'Test/body',
        },
        true,
      ),
    ).toBe(
      '/construction-work/warning/123/Test%20title/Test%20title%20-%20Test%2Fbody/true',
    )
  })
  it('should return news route with url encode title and body', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: mockNotificationArticleNew.data,
          title: 'Test title',
          body: 'Test/body',
        },
        true,
      ),
    ).toBe(
      '/construction-work/news/123/Test%20title/Test%20title%20-%20Test%2Fbody/true',
    )
  })
})
