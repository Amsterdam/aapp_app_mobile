import {
  BurningGuideCodeVariant,
  type BurningGuideApiResponse,
} from '@/modules/burning-guide/types'
import {getForecast} from '@/modules/burning-guide/utils/getForecast'
import {dayjs} from '@/utils/datetime/dayjs'

const validResponse: BurningGuideApiResponse = {
  advice_0: 0,
  advice_12: 2,
  advice_18: 0,
  advice_6: 1,
  definitive_0: true,
  definitive_12: true,
  definitive_18: false,
  definitive_6: false,
  model_runtime: '2026-07-27T00:00:00Z',
  postal_code: '1011AB',
}

describe('getForecast', () => {
  it('returns an empty array when data is undefined', () => {
    expect(getForecast(dayjs('2026-07-27T05:00:00'))).toEqual([])
  })

  it('returns an empty array when data is null', () => {
    expect(
      getForecast(
        dayjs('2026-07-27T05:00:00'),
        null as unknown as BurningGuideApiResponse,
      ),
    ).toEqual([])
  })

  it('does not read now when data is undefined', () => {
    expect(
      getForecast(undefined as unknown as Parameters<typeof getForecast>[0]),
    ).toEqual([])
  })

  it('throws when now is undefined and data is present', () => {
    expect(() =>
      getForecast(
        undefined as unknown as Parameters<typeof getForecast>[0],
        validResponse,
      ),
    ).toThrow()
  })

  it('maps a valid response into forecast items', () => {
    expect(getForecast(dayjs('2026-07-27T05:00:00'), validResponse)).toEqual([
      {
        id: '0',
        isFixed: true,
        timeWindow: 'Maandag 04.00 uur',
        variant: BurningGuideCodeVariant.yellow,
      },
      {
        id: '6',
        isFixed: false,
        timeWindow: 'Maandag 10.00 uur',
        variant: BurningGuideCodeVariant.orange,
      },
      {
        id: '12',
        isFixed: true,
        timeWindow: 'Maandag 16.00 uur',
        variant: BurningGuideCodeVariant.red,
      },
      {
        id: '18',
        isFixed: false,
        timeWindow: 'Maandag 22.00 uur',
        variant: BurningGuideCodeVariant.yellow,
      },
    ])
  })

  it.each([
    ['advice_0', '0'],
    ['advice_6', '6'],
    ['advice_12', '12'],
    ['advice_18', '18'],
  ] as const)(
    'falls back to yellow when %s is undefined',
    (adviceKey, itemId) => {
      const response = {
        ...validResponse,
        [adviceKey]: undefined,
      }

      expect(
        getForecast(dayjs('2026-07-27T05:00:00'), response).find(
          forecastItem => forecastItem.id === itemId,
        ),
      ).toMatchObject({variant: BurningGuideCodeVariant.yellow})
    },
  )

  it.each([
    ['advice_0', '0'],
    ['advice_6', '6'],
    ['advice_12', '12'],
    ['advice_18', '18'],
  ] as const)('falls back to yellow when %s is null', (adviceKey, itemId) => {
    const response = {
      ...validResponse,
      [adviceKey]: null,
    }

    expect(
      getForecast(dayjs('2026-07-27T05:00:00'), response).find(
        forecastItem => forecastItem.id === itemId,
      ),
    ).toMatchObject({variant: BurningGuideCodeVariant.yellow})
  })

  it.each([
    ['definitive_0', '0'],
    ['definitive_6', '6'],
    ['definitive_12', '12'],
    ['definitive_18', '18'],
  ] as const)(
    'passes through %s when it is undefined',
    (definitiveKey, itemId) => {
      const response = {
        ...validResponse,
        [definitiveKey]: undefined,
      }

      expect(
        getForecast(dayjs('2026-07-27T05:00:00'), response).find(
          forecastItem => forecastItem.id === itemId,
        ),
      ).toHaveProperty('isFixed', undefined)
    },
  )

  it.each([
    ['definitive_0', '0'],
    ['definitive_6', '6'],
    ['definitive_12', '12'],
    ['definitive_18', '18'],
  ] as const)('passes through %s when it is null', (definitiveKey, itemId) => {
    const response = {
      ...validResponse,
      [definitiveKey]: null,
    }

    expect(
      getForecast(dayjs('2026-07-27T05:00:00'), response).find(
        forecastItem => forecastItem.id === itemId,
      ),
    ).toMatchObject({isFixed: null})
  })
})
