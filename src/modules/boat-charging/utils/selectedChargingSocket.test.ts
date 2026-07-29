import {
  deserializeSelectedChargingSocket,
  serializeSelectedChargingSocket,
} from '@/modules/boat-charging/utils/selectedChargingSocket'

describe('selectedChargingSocket', () => {
  test('serializes and deserializes a station and socket combination', () => {
    const startValue = {
      stationId: 'station-1',
      socketNumber: '2',
    }
    const value = serializeSelectedChargingSocket(startValue)

    expect(deserializeSelectedChargingSocket(value)).toEqual(startValue)
  })

  test('returns undefined for incorrect values', () => {
    expect(deserializeSelectedChargingSocket('station-1')).toBeUndefined()
  })

  test('returns undefined for incomplete serialized values', () => {
    expect(
      deserializeSelectedChargingSocket(
        JSON.stringify({stationId: 'station-1'}),
      ),
    ).toBeUndefined()
  })
})
