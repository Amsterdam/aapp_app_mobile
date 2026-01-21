import {WasteType} from '@/modules/waste-guide/types'
import {FractionCode} from '@/modules/waste-guide/types'
import {getNextCollectionDate} from '@/modules/waste-guide/utils/getNextCollectionDate'
import {dayjs} from '@/utils/datetime/dayjs'

const baseFraction: WasteType = {
  alert: '',
  button_text: '',
  code: FractionCode.Rest,
  curb_rules: '',
  days_array: [],
  frequency: '',
  how: '',
  label: '',
  next_date: '',
  note: '',
  url: '',
  where: '',
  info_link: '',
}

describe('getNextCollectionDate', () => {
  it('returns "vandaag" when next_date is today', () => {
    const fraction = {...baseFraction, next_date: dayjs().format('YYYY-MM-DD')}

    expect(getNextCollectionDate(fraction).toLowerCase()).toBe('vandaag')
  })

  it('returns "morgen" when next_date is tomorrow', () => {
    const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD')
    const fraction = {...baseFraction, next_date: tomorrow}

    // For debugging: log the parsed dates
    // console.log('now:', dayjs().format(), 'tomorrow:', tomorrow, 'fraction:', fraction.next_date)
    expect(getNextCollectionDate(fraction).toLowerCase()).toBe('morgen')
  })

  it('returns formatted date for other days', () => {
    const fraction = {
      ...baseFraction,
      next_date: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    }
    const result = getNextCollectionDate(fraction)

    expect(result.toLowerCase()).not.toBe('vandaag')
    expect(result.toLowerCase()).not.toBe('morgen')
    expect(result).toMatch(/\d{1,2}/)
  })

  it('returns empty string if next_date is empty', () => {
    const fraction = {...baseFraction, next_date: ''}

    expect(getNextCollectionDate(fraction)).toBe('')
  })
})
