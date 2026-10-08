import {getStateFromPath} from '@react-navigation/native'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {resolvePathFromNotification} from '@/modules/mijn-amsterdam/notifications/resolvePathFromNotification'
import {UserRouteName} from '@/modules/user/routes'
import {moduleLinkings} from '@/modules/utils/moduleLinkings'

describe('resolvePathFromNotification', () => {
  it('returns undefined when notification type is missing', () => {
    expect(resolvePathFromNotification?.({}, false)).toBeUndefined()
  })

  it('returns undefined when notification type is unknown', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: {type: 'unknown-type'},
        },
        false,
      ),
    ).toBeUndefined()
  })

  it('returns the mijn-amsterdam logout path for logout notifications', () => {
    expect(
      resolvePathFromNotification?.(
        {
          data: {type: 'mijn-ams-logout'},
        },
        false,
      ),
    ).toBe('/mijn-amsterdam/logout')
  })

  it('resolves the logout path to the user accounts screen', () => {
    const path = resolvePathFromNotification?.(
      {
        data: {type: 'mijn-ams-logout'},
      },
      false,
    )

    expect(path).toBe('/mijn-amsterdam/logout')

    const state = getStateFromPath(path ?? '', {
      screens: moduleLinkings,
    })

    expect(state).toMatchObject({
      routes: [
        {
          name: ModuleSlug.user,
          state: {
            routes: [
              {
                name: UserRouteName.accounts,
              },
            ],
          },
        },
      ],
    })
  })
})
