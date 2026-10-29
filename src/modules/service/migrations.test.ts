import {createMigrate} from 'redux-persist'
import {
  migrationManifest,
  type ServiceState0,
} from '@/modules/service/migrations'

describe('service state migration', () => {
  const migrate = createMigrate(migrationManifest)

  it.each(['legacy-point', 42, 0, undefined])(
    'clears legacy selection %p while preserving other persisted state',
    async selectedServicePointId => {
      const state = {
        selectedServicePointId,
        _persist: {version: 0, rehydrated: true},
        otherSetting: 'preserved',
      } satisfies ServiceState0 & {otherSetting: string}

      const migratedState = await migrate(state, 1)

      expect(migratedState).toEqual({
        ...state,
        selectedServicePointId: undefined,
      })
      expect(state.selectedServicePointId).toBe(selectedServicePointId)
      expect(migratedState).not.toBe(state)
    },
  )

  it('also migrates unversioned persisted state', async () => {
    const state: ServiceState0 = {
      selectedServicePointId: 'legacy-point',
      _persist: {version: -1, rehydrated: true},
    }

    await expect(migrate(state, 1)).resolves.toEqual({
      ...state,
      selectedServicePointId: undefined,
    })
  })

  it('leaves a fresh installation without persisted state unchanged', async () => {
    await expect(migrate(undefined, 1)).resolves.toBeUndefined()
    expect(migrationManifest[1](undefined)).toBeUndefined()
  })

  it('does not clear per-service selections already persisted at version 1', async () => {
    const state = {
      selectedServicePointId: {water: 'point', recycling: 0},
      _persist: {version: 1, rehydrated: true},
    }

    await expect(migrate(state, 1)).resolves.toBe(state)
  })
})
