export const weekDayMapping: Record<
  | 'zondag'
  | 'maandag'
  | 'dinsdag'
  | 'woensdag'
  | 'donderdag'
  | 'vrijdag'
  | 'zaterdag',
  WeekdayNumber
> = {
  zondag: 0,
  maandag: 1,
  dinsdag: 2,
  woensdag: 3,
  donderdag: 4,
  vrijdag: 5,
  zaterdag: 6,
}

export const weekDayNumbers = [0, 1, 2, 3, 4, 5, 6] as WeekdayNumber[]

/**
 * Returns numbers from 0 (Sunday) to 6 (Saturday).
 */
export const weekdayToNumber = (day: string): WeekdayNumber | undefined => {
  const lowerCaseDay = day.toLowerCase()

  return weekDayMapping[lowerCaseDay as keyof typeof weekDayMapping]
}

export type WeekdayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6

export const weekdayNumberToString = (dayNumber: WeekdayNumber): string => {
  const daysOfWeek = [
    'zondag',
    'maandag',
    'dinsdag',
    'woensdag',
    'donderdag',
    'vrijdag',
    'zaterdag',
  ]

  return daysOfWeek[dayNumber]
}
