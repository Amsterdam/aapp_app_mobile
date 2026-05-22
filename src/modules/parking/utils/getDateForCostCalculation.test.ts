import {getDateForCostCalculation} from '@/modules/parking/utils/getDateForCostCalculation'
import {dayjs} from '@/utils/datetime/dayjs'

const END_TIME = dayjs('2025-11-13T12:00:00.000Z')
const START_TIME = dayjs('2025-11-13T11:00:00.000Z')

describe('getDateForCostCalculation', () => {
  it('returns endTime and startTime unchanged if no originalEndTime', () => {
    const result = getDateForCostCalculation({
      endTime: END_TIME,
      startTime: START_TIME,
    })

    expect(result.calculatedEndTime?.toISOString()).toBe(
      '2025-11-13T12:00:00.000Z',
    )
    expect(result.calculatedStartTime?.toISOString()).toBe(
      '2025-11-13T11:00:00.000Z',
    )
    expect(result.isEndTimeBeforeOriginal).toBe(false)
  })

  it('returns correct values if endTime > originalEndTime', () => {
    const endTime = dayjs('2025-11-13T13:00:00.000Z')
    const originalEndTime = END_TIME
    const result = getDateForCostCalculation({
      endTime,
      originalEndTime,
      startTime: START_TIME,
    })

    expect(result.isEndTimeBeforeOriginal).toBe(false)
    expect(result.calculatedStartTime?.toISOString()).toBe(
      '2025-11-13T12:00:00.000Z',
    )
    expect(result.calculatedEndTime?.toISOString()).toBe(
      '2025-11-13T13:00:00.000Z',
    )
  })

  it('returns correct values if endTime < startTime', () => {
    const endTime = dayjs('2025-11-13T11:15:00.000Z')
    const originalEndTime = END_TIME
    const result = getDateForCostCalculation({
      endTime,
      originalEndTime,
      startTime: START_TIME,
    })

    expect(result.isEndTimeBeforeOriginal).toBe(true)
    expect(result.calculatedStartTime?.toISOString()).toBe(
      '2025-11-13T11:15:00.000Z',
    )
    expect(result.calculatedEndTime?.toISOString()).toBe(
      '2025-11-13T12:00:00.000Z',
    )
  })

  it('returns undefined if no endTime', () => {
    const result = getDateForCostCalculation({})

    expect(result.calculatedEndTime).toBeUndefined()
    expect(result.calculatedStartTime).toBeUndefined()
    expect(result.isEndTimeBeforeOriginal).toBe(false)
  })
})
