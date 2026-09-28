import {FractionCode, WasteGuideResponse} from '@/modules/waste-guide/types'
import {getWasteCalendarListSections} from '@/modules/waste-guide/utils/getWasteCalendarListSections'
import {dayjs} from '@/utils/datetime/dayjs'

describe('getWasteCalendarListSections', () => {
  const today = dayjs().startOf('day')
  const yesterday = today.subtract(1, 'day')
  const nextMonth = today.add(1, 'month')

  const calendar: WasteGuideResponse['calendar'] = [
    {
      alert: '',
      code: FractionCode.Rest,
      curb_rules_from: '',
      curb_rules_to: '',
      date: today.format('YYYY-MM-DD'),
      label: 'Restafval',
    },
    {
      alert: '',
      code: FractionCode.Papier,
      curb_rules_from: '',
      curb_rules_to: '',
      date: today.format('YYYY-MM-DD'),
      label: 'Papier',
    },
    {
      alert: '',
      code: FractionCode.GFT,
      curb_rules_from: '',
      curb_rules_to: '',
      date: nextMonth.format('YYYY-MM-DD'),
      label: 'GFT',
    },
    {
      alert: '',
      code: FractionCode.Glas,
      curb_rules_from: '',
      curb_rules_to: '',
      date: yesterday.format('YYYY-MM-DD'),
      label: 'Glas',
    },
  ]

  it('groups events by month and date', () => {
    const {sectionList} = getWasteCalendarListSections(calendar)

    expect(sectionList.length).toBeGreaterThan(0)
    // Should have at least two months (this and next)
    expect(
      sectionList.some(s =>
        s.data.some(d => d.date === today.format('YYYY-MM-DD')),
      ),
    ).toBe(true)
    expect(
      sectionList.some(s =>
        s.data.some(d => d.date === nextMonth.format('YYYY-MM-DD')),
      ),
    ).toBe(true)
  })

  it('groups multiple events on the same date', () => {
    const {sectionList} = getWasteCalendarListSections(calendar)
    const todaySection = sectionList.find(s =>
      s.data.some(d => d.date === today.format('YYYY-MM-DD')),
    )
    const todayData = todaySection?.data.find(
      d => d.date === today.format('YYYY-MM-DD'),
    )

    expect(todayData?.events.length).toBe(2)
  })

  it('returns eventsToday for today', () => {
    const {eventsToday} = getWasteCalendarListSections(calendar)

    expect(eventsToday).toHaveLength(2)
    expect(eventsToday[0].date).toBe(today.format('YYYY-MM-DD'))
  })

  it('returns empty eventsToday if no events today', () => {
    const calendarNoToday = calendar.filter(
      e => e.date !== today.format('YYYY-MM-DD'),
    )
    const {eventsToday} = getWasteCalendarListSections(calendarNoToday)

    expect(eventsToday).toHaveLength(0)
  })
})
