import {
  addGuestSessionId,
  boatChargingSlice,
  removeGuestSessionId,
} from '@/modules/boat-charging/slice'

describe('guest session IDs', () => {
  const {reducer} = boatChargingSlice

  it('adds multiple IDs without replacing existing sessions', () => {
    const firstState = reducer(undefined, addGuestSessionId('session-1'))
    const secondState = reducer(firstState, addGuestSessionId('session-2'))

    expect(secondState.guestSessionIds).toEqual(['session-1', 'session-2'])
    expect(firstState.guestSessionIds).toEqual(['session-1'])
  })

  it('ignores repeated payment callbacks without changing state', () => {
    const state = {guestSessionIds: ['session-1']}

    expect(reducer(state, addGuestSessionId('session-1'))).toBe(state)
  })

  it('removes only the requested session', () => {
    const state = {guestSessionIds: ['session-1', 'session-2']}

    expect(reducer(state, removeGuestSessionId('session-1'))).toEqual({
      guestSessionIds: ['session-2'],
    })
    expect(state.guestSessionIds).toEqual(['session-1', 'session-2'])
  })

  it('allows the last session to be removed', () => {
    expect(
      reducer(
        {guestSessionIds: ['session-1']},
        removeGuestSessionId('session-1'),
      ),
    ).toEqual({guestSessionIds: []})
  })

  it('does not change state when removing an unknown session', () => {
    const state = {guestSessionIds: ['session-1']}
    const emptyState = {}

    expect(reducer(state, removeGuestSessionId('session-2'))).toBe(state)
    expect(reducer(emptyState, removeGuestSessionId('session-2'))).toBe(
      emptyState,
    )
  })
})
