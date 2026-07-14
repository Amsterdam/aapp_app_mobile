import {
  mijnAmsterdamSlice,
  setCachedThemes,
} from '@/modules/mijn-amsterdam/slice'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleStatus, type ModuleServerConfig} from '@/modules/types'

const moduleServerConfig: ModuleServerConfig = {
  description: 'Theme description',
  icon: 'calendar',
  iconPath: 'icon-path',
  isMams: false,
  moduleAppReason: null,
  moduleButtonLabel: null,
  moduleFallbackUrl: null,
  moduleSlug: ModuleSlug.user,
  releaseAppReason: null,
  releaseButtonLabel: null,
  releaseFallbackUrl: null,
  status: ModuleStatus.active,
  title: 'Theme title',
  version: '1.0.0',
}

describe('mijnAmsterdamSlice', () => {
  it('marks cached themes as Mijn Amsterdam modules', () => {
    const nextState = mijnAmsterdamSlice.reducer(
      undefined,
      setCachedThemes([moduleServerConfig]),
    )

    expect(nextState.cachedThemes).toEqual([
      {
        ...moduleServerConfig,
        isMams: true,
      },
    ])
  })
})
