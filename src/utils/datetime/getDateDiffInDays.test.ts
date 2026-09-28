import dayjs from 'dayjs'
import {getDateDiffInDays} from '@/utils/datetime/getDateDiffInDays' // Replace with the actual path to your module

describe('getDateDiffInDays', () => {
  it('should return 0 for the same date', () => {
    const today = dayjs().format('YYYY-MM-DD')
    const result = getDateDiffInDays(today)

    expect(result).toBe(0)
  })

  it('should return a positive number for a future date', () => {
    const futureDate = dayjs().subtract(5, 'days').format('YYYY-MM-DD')
    const result = getDateDiffInDays(futureDate)

    expect(result).toBe(5)
  })

  it('should return a negative number for a past date', () => {
    const pastDate = dayjs().add(5, 'days').format('YYYY-MM-DD')
    const result = getDateDiffInDays(pastDate)

    expect(result).toBe(-4)
  })

  it('should handle date strings in different formats', () => {
    const date1 = '2023-09-12'
    const date2 = '09/12/2023'
    const result1 = getDateDiffInDays(date1)
    const result2 = getDateDiffInDays(date2)

    expect(result1).toBe(result2) // Both dates represent the same day
  })

  it('should handle invalid date strings', () => {
    const invalidDate = 'invalid-date'
    const result = getDateDiffInDays(invalidDate)

    expect(result).toBeNaN() // Invalid date should result in NaN
  })
})
