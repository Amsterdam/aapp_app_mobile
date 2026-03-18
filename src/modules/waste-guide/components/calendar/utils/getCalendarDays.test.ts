import dayjs from '@/utils/datetime/dayjs'
import {getCalendarDays} from '@/modules/waste-guide/components/calendar/utils/getCalendarDays'

describe('getCalendarDays', () => {
  const FIXED_DATE = new Date('2023-01-15T12:00:00.000Z')

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(FIXED_DATE)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it.each([
    {days: 999, expectedLength: 999},
    {days: 10, expectedLength: 10},
    {days: 1, expectedLength: 1},
    {days: 0, expectedLength: 1},
    {days: undefined, expectedLength: 1},
    {days: -10, expectedLength: 1},
  ])(
    'should return the correct amount of days based on the number provided ($days), with a minimum of 1',
    ({days, expectedLength}) => {
      expect(getCalendarDays(days).length).toBe(expectedLength)
    },
  )

  it.each([10, 100, 1])(
    'should return the days from today until %i days in the future',
    days => {
      const now = dayjs()

      const lastDayDifference = getCalendarDays(days)
        [days - 1].add(1, 'day') // in order to include last day in count
        .diff(now.subtract(1, 'day'), 'day') // in order to include today in count

      expect(lastDayDifference).toBe(days)
    },
  )

  it('should return an array of Dayjs days', () => {
    getCalendarDays(10).forEach(day => {
      expect(day).not.toBeNull()
      expect(day.date()).not.toBeNaN()
    })
  })
})
