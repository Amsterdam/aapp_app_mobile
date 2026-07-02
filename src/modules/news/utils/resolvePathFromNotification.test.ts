import {resolvePathFromNotification} from '@/modules/news/utils/resolvePathFromNotification'

describe('resolvePathFromNotification', () => {
  it('returns undefined when notification is undefined or null', () => {
    // @ts-expect-error Testing undefined and null notifications
    expect(resolvePathFromNotification(undefined, false)).toBeUndefined()
    // @ts-expect-error Testing undefined and null notifications
    expect(resolvePathFromNotification(null, false)).toBeUndefined()
  })

  it('returns undefined when notification data is undefined or null', () => {
    expect(resolvePathFromNotification({}, false)).toBeUndefined()
    expect(
      resolvePathFromNotification({data: undefined}, false),
    ).toBeUndefined()
    expect(
      // @ts-expect-error Testing null notification data
      resolvePathFromNotification({data: null}, false),
    ).toBeUndefined()
  })

  it('returns undefined when type is undefined or null', () => {
    expect(
      resolvePathFromNotification(
        {
          data: {linkSourceid: '123', type: undefined},
        },
        true,
      ),
    ).toBeUndefined()

    expect(
      resolvePathFromNotification(
        {
          // @ts-expect-error Testing null type
          data: {linkSourceid: '123', type: null},
        },
        true,
      ),
    ).toBeUndefined()
  })

  it('returns undefined when linkSourceid is undefined or null', () => {
    expect(
      resolvePathFromNotification(
        {
          data: {linkSourceid: undefined, type: 'news:new-liveblog'},
        },
        true,
      ),
    ).toBeUndefined()

    expect(
      resolvePathFromNotification(
        {
          // @ts-expect-error Testing null linkSourceid
          data: {linkSourceid: null, type: 'news:new-liveblog'},
        },
        true,
      ),
    ).toBeUndefined()
  })

  it.each([
    ['news:new-liveblog', '/news/liveblog/123'],
    ['news:liveblog-update', '/news/liveblog/123'],
  ] as const)(
    'returns the liveblog path for %s notifications',
    (type, expectedPath) => {
      expect(
        resolvePathFromNotification(
          {
            data: {linkSourceid: '123', type},
          },
          true,
        ),
      ).toBe(expectedPath)
    },
  )

  it('returns undefined for unsupported notification types', () => {
    expect(
      resolvePathFromNotification(
        {
          // @ts-expect-error Testing unsupported type
          data: {linkSourceid: '123', type: 'news:other'},
        },
        true,
      ),
    ).toBeUndefined()
  })
})
