import {
  resetSelectedServicePointId,
  serviceSlice,
  setSelectedServicePointId,
} from '@/modules/service/slice'

describe('service selections', () => {
  it('stores selections independently per service', () => {
    const firstState = serviceSlice.reducer(
      undefined,
      setSelectedServicePointId({
        serviceId: 'water',
        servicePointId: 'first',
      }),
    )
    const secondState = serviceSlice.reducer(
      firstState,
      setSelectedServicePointId({
        serviceId: 'recycling',
        servicePointId: 0,
      }),
    )

    expect(secondState.selectedServicePointId).toEqual({
      water: 'first',
      recycling: 0,
    })

    const updatedState = serviceSlice.reducer(
      secondState,
      setSelectedServicePointId({
        serviceId: 'water',
        servicePointId: 'second',
      }),
    )

    expect(updatedState.selectedServicePointId).toEqual({
      water: 'second',
      recycling: 0,
    })
    expect(firstState.selectedServicePointId).toEqual({water: 'first'})
  })

  it('only clears the requested service selection', () => {
    const state = {
      selectedServicePointId: {water: 'first', recycling: 'second'},
    }

    expect(
      serviceSlice.reducer(state, resetSelectedServicePointId('water')),
    ).toEqual({selectedServicePointId: {recycling: 'second'}})
    expect(state.selectedServicePointId.water).toBe('first')
  })

  it('can reset a service with no selection', () => {
    expect(
      serviceSlice.reducer(undefined, resetSelectedServicePointId('water')),
    ).toEqual({})
  })
})
