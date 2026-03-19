import {getFormattedCalendar} from '@/modules/waste-guide/components/calendar/utils/getFormattedCalendar'
import {dayjs} from '@/utils/datetime/dayjs'

const AMOUNT_OF_DAYS = 42

describe('getFormattedCalendar', () => {
  const years = getFormattedCalendar(AMOUNT_OF_DAYS)
  const [year, months] = Object.entries(years)[0]
  const [month, weeks] = Object.entries(months)[0]
  const [week, days] = Object.entries(weeks)[0]

  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns an object with first year and its first month to be current year and current month', () => {
    const currentMonth = dayjs().month()
    const currentYear = dayjs().year()

    expect(Number(year)).toBe(currentYear)
    expect(Number(month)).toBe(currentMonth)
  })

  it('returns an object that have year, month and week names as number keys', () => {
    expect(year).not.toBeNaN()
    expect(month).not.toBeNaN()
    expect(week).not.toBeNaN()
  })

  it('returns nested objects that contain weeks with an array of 7 days of type Dayjs or null', () => {
    expect(days.some(day => day?.date())).toBeTruthy()
    expect(days.length).toBe(7)
  })

  it('should return the months and weeks in the right order', () => {
    jest.setSystemTime(new Date('2025-12-18T12:00:00.000Z'))

    const changeOfYearCalendar = getFormattedCalendar(AMOUNT_OF_DAYS * 2)
    const yearEntries = Object.entries(changeOfYearCalendar)
    const [firstYear, firstYearMonths] = yearEntries[0]
    const [secondYear, secondYearMonths] = yearEntries[1]

    const secondYearWeeks = Object.values(secondYearMonths).flatMap(w =>
      Object.keys(w),
    )

    expect(firstYear).toBe('2025')
    expect(secondYear).toBe('2026')
    expect(Object.keys(firstYearMonths)).toEqual(['11'])
    expect(Object.keys(secondYearMonths)).toEqual(['0', '1', '2'])
    expect(secondYearWeeks).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '5', // transition to new month within same week
      '6',
      '7',
      '8',
      '9',
      '9', // transition to new month within same week
      '10',
      '11',
    ])
  })
})
