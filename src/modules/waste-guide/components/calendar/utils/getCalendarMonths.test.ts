import {getCalendarMonths} from '@/modules/waste-guide/components/calendar/utils/getCalendarMonths'
import {dayjs} from '@/utils/datetime/dayjs'

const AMOUNT_OF_DAYS = 10

const months = getCalendarMonths(AMOUNT_OF_DAYS)
const [month, weeks] = Object.entries(months)[0]
const [week, days] = Object.entries(weeks)[0]

describe('getCalendarMonths', () => {
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
