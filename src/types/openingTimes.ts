export type VisitingHour = {
  dayOfWeek: number
} & OpeningAndClosingTimes

export type ExceptionDate = {
  date: string
  description: string | null
} & Partial<OpeningAndClosingTimes>

export type OpeningAndClosingTimes = {
  closing: HoursAndMinutes
  opening: HoursAndMinutes
}

export type HoursAndMinutes = {
  hours: number
  minutes: number
}
