import {getCalendarMonths} from '@/modules/waste-guide/components/calendar/utils/getCalendarMonths'
import {dayjs} from '@/utils/datetime/dayjs'

const AMOUNT_OF_DAYS = 10

describe('getCalendarMonths', () => {
  const months = getCalendarMonths(AMOUNT_OF_DAYS)
  const [month, weeks] = Object.entries(months)[0]
  const [week, days] = Object.entries(weeks)[0]

  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-03-18T12:00:00.000Z'))
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns an object with month name as key', () => {
    const currentMonth = dayjs().format('MMMM')

    expect(month).toBe(currentMonth)
    expect(days.some(day => day?.date())).toBeTruthy()
  })

  it('returns an object that have month names as keys, with nested objects that have week numbers as keys', () => {
    expect(week).not.toBeNaN()
  })

  it('returns nested objects that contain weeks with an array of 7 days of type Dayjs or null', () => {
    expect(days.some(day => day?.date())).toBeTruthy()
    expect(days.length).toBe(7)
  })
})
