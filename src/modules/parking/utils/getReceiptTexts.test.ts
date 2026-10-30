import {getReceiptTexts} from '@/modules/parking/utils/getReceiptTexts'

type ReceiptTextsInput = Parameters<typeof getReceiptTexts>[0]
type ReceiptTexts = ReturnType<typeof getReceiptTexts>

const validInput: ReceiptTextsInput = {
  isEndTimeBeforeOriginal: false,
  parking_cost: {
    currency: 'EUR',
    value: 12.5,
  },
  parking_time: 5400,
  costs: {
    currency: 'EUR',
    value: 12.5,
  },
  remainingTimeBalance: 7200,
  remainingWalletBalance: 8.75,
}

const nullablePropertyCases: Array<{
  expectedValue: string
  outputKey: keyof ReceiptTexts
  property: keyof ReceiptTextsInput
  value: null | undefined
}> = [
  {
    property: 'isEndTimeBeforeOriginal',
    value: null,
    outputKey: 'parkingTimeText',
    expectedValue: '1 uur en 30 min',
  },
  {
    property: 'isEndTimeBeforeOriginal',
    value: undefined,
    outputKey: 'parkingTimeText',
    expectedValue: '1 uur en 30 min',
  },
  {
    property: 'parking_cost',
    value: null,
    outputKey: 'parkingCostText',
    expectedValue: '-',
  },
  {
    property: 'parking_cost',
    value: undefined,
    outputKey: 'parkingCostText',
    expectedValue: '-',
  },
  {
    property: 'parking_time',
    value: null,
    outputKey: 'parkingTimeText',
    expectedValue: '-',
  },
  {
    property: 'parking_time',
    value: undefined,
    outputKey: 'parkingTimeText',
    expectedValue: '-',
  },
  {
    property: 'costs',
    value: null,
    outputKey: 'parkingCostText',
    expectedValue: '0',
  },
  {
    property: 'costs',
    value: undefined,
    outputKey: 'parkingCostText',
    expectedValue: '0',
  },
  {
    property: 'remainingTimeBalance',
    value: null,
    outputKey: 'remainingTimeBalanceText',
    expectedValue: '0 min',
  },
  {
    property: 'remainingTimeBalance',
    value: undefined,
    outputKey: 'remainingTimeBalanceText',
    expectedValue: '0 min',
  },
  {
    property: 'remainingWalletBalance',
    value: null,
    outputKey: 'remainingWalletBalanceText',
    expectedValue: 'Onbekend',
  },
  {
    property: 'remainingWalletBalance',
    value: undefined,
    outputKey: 'remainingWalletBalanceText',
    expectedValue: 'Onbekend',
  },
]

const getReceiptTextsWithNullableProperty = (
  property: keyof ReceiptTextsInput,
  value: null | undefined,
) =>
  getReceiptTexts(
    Object.assign({}, validInput, {
      [property]: value,
    }),
  )

describe('getReceiptTexts', () => {
  it.each(nullablePropertyCases)(
    'handles $property when $value',
    ({property, value, outputKey, expectedValue}) => {
      const receiptTexts = getReceiptTextsWithNullableProperty(property, value)

      expect(receiptTexts[outputKey]).toBe(expectedValue)
    },
  )

  it('formats valid receipt values', () => {
    expect(getReceiptTexts(validInput)).toEqual({
      remainingTimeBalanceText: '2 uur',
      remainingWalletBalanceText: '€\u00A08,75',
      parkingCostText: '€\u00A012,50',
      parkingTimeText: '1 uur en 30 min',
    })
  })

  it('prefixes parking time and cost when the end time is before the original', () => {
    expect(
      getReceiptTexts({
        ...validInput,
        isEndTimeBeforeOriginal: true,
      }),
    ).toEqual({
      remainingTimeBalanceText: '2 uur',
      remainingWalletBalanceText: '€\u00A08,75',
      parkingCostText: '-€\u00A012,50',
      parkingTimeText: '-1 uur en 30 min',
    })
  })

  it('handles zero durations and balances', () => {
    expect(
      getReceiptTexts({
        ...validInput,
        parking_time: 0,
        costs: {
          currency: 'EUR',
          value: 0,
        },
        remainingTimeBalance: 0,
        remainingWalletBalance: 0,
      }),
    ).toEqual({
      remainingTimeBalanceText: '0 min',
      remainingWalletBalanceText: '€\u00A00,00',
      parkingCostText: '€\u00A00,00',
      parkingTimeText: '-',
    })
  })
})
