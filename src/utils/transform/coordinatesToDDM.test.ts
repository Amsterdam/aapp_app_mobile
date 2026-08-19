import {coordinatesToDDM} from '@/utils/transform/coordinatesToDDM'

describe('coordinatesToDDM', () => {
  test('formats positive latitude and longitude values as degrees decimal minutes', () => {
    expect(coordinatesToDDM({lat: 52.3676, lon: 4.9041})).toBe(
      "52° 22.056' N, 004° 54.246' E",
    )
  })

  test('formats a latitude that rounds up to sixty minutes', () => {
    expect(coordinatesToDDM({lat: 12.999999, lon: 4.9041})).toBe(
      "13° 0.000' N, 004° 54.246' E",
    )
  })

  test('formats zero coordinates with north and east hemispheres', () => {
    expect(coordinatesToDDM({lat: 0, lon: 0})).toBe(
      "00° 0.000' N, 000° 0.000' E",
    )
  })

  test('formats negative latitude and longitude values with south and west hemispheres', () => {
    expect(coordinatesToDDM({lat: -33.8688, lon: -151.2093})).toBe(
      "33° 52.128' S, 151° 12.558' W",
    )
  })

  test('pads longitude to three digits and latitude to two digits at valid boundaries', () => {
    expect(coordinatesToDDM({lat: 90, lon: 180})).toBe(
      "90° 0.000' N, 180° 0.000' E",
    )
  })

  test('returns undefined when latitude is null', () => {
    expect(
      coordinatesToDDM({
        lat: null as unknown as number,
        lon: 4.9041,
      }),
    ).toBeUndefined()
  })

  test('returns undefined when longitude is null', () => {
    expect(
      coordinatesToDDM({
        lat: 52.3676,
        lon: null as unknown as number,
      }),
    ).toBeUndefined()
  })

  test('returns undefined when latitude is undefined', () => {
    expect(
      coordinatesToDDM({
        lat: undefined as unknown as number,
        lon: 4.9041,
      }),
    ).toBeUndefined()
  })

  test('returns undefined when longitude is undefined', () => {
    expect(
      coordinatesToDDM({
        lat: 52.3676,
        lon: undefined as unknown as number,
      }),
    ).toBeUndefined()
  })

  test('returns undefined when coordinates are missing', () => {
    expect(coordinatesToDDM(undefined)).toBeUndefined()
    expect(coordinatesToDDM(null)).toBeUndefined()
  })
})
