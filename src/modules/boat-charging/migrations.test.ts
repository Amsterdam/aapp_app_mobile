import {createMigrate} from 'redux-persist'
import {migrationManifest} from '@/modules/boat-charging/migrations'

describe('boat charging migrations', () => {
  const persistedState = {
    _persist: {version: 0, rehydrated: true},
    selectedBoatChargingPointId: 'charging-point-1',
    openIdConnectConfig: {
      client_id: 'client-1',
      issuer: 'issuer',
      scopes: ['openid'],
      user_pool_id: 'pool-1',
    },
    lastApprovedTermsVersionWhileLoggedIn: 2,
  }
  const migrate = createMigrate(migrationManifest)

  it('migrates the last guest session ID and removes the lastGuestSessionId field', async () => {
    const state = {
      ...persistedState,
      lastGuestSessionId: 'session-1',
    }

    const migratedState = await migrate(state, 1)

    expect(migratedState).toStrictEqual({
      ...persistedState,
      guestSessionIds: ['session-1'],
    })

    //@ts-expect-error
    expect(migratedState.lastGuestSessionId).toBeUndefined()

    expect(state).toStrictEqual({
      ...persistedState,
      lastGuestSessionId: 'session-1',
    })
  })

  it('skips migrating the ID to the new guestSessionIds array when there is no last guest session ID', async () => {
    await expect(migrate(persistedState, 1)).resolves.toStrictEqual({
      ...persistedState,
      guestSessionIds: undefined,
    })
  })

  it('removes an explicitly undefined last guest session ID', async () => {
    const state = {...persistedState, lastGuestSessionId: undefined}

    await expect(migrate(state, 1)).resolves.toStrictEqual({
      ...persistedState,
      guestSessionIds: undefined,
    })
  })

  it('preserves existing guest session IDs when adding the last ID', async () => {
    const state = {
      ...persistedState,
      guestSessionIds: ['session-1'],
      lastGuestSessionId: 'session-2',
    }

    await expect(migrate(state, 1)).resolves.toStrictEqual({
      ...persistedState,
      guestSessionIds: ['session-1', 'session-2'],
    })
    expect(state.guestSessionIds).toStrictEqual(['session-1'])
  })

  it('does not duplicate the last ID if it is already in the array', async () => {
    const state = {
      ...persistedState,
      guestSessionIds: ['session-1'],
      lastGuestSessionId: 'session-1',
    }

    await expect(migrate(state, 1)).resolves.toStrictEqual({
      ...persistedState,
      guestSessionIds: ['session-1'],
    })
  })

  it('preserves existing guest session IDs without a last ID', async () => {
    const state = {...persistedState, guestSessionIds: ['session-1']}

    await expect(migrate(state, 1)).resolves.toStrictEqual(state)
  })

  it('leaves absent persisted state undefined', async () => {
    await expect(migrate(undefined, 1)).resolves.toBeUndefined()
    expect(migrationManifest[1](undefined)).toBeUndefined()
  })

  it('does not migrate state that is already at version 1', async () => {
    const state = {
      ...persistedState,
      _persist: {version: 1, rehydrated: true},
      guestSessionIds: ['session-1', 'session-2'],
    }

    await expect(migrate(state, 1)).resolves.toBe(state)
  })
})
