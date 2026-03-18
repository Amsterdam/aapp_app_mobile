import {
  WeekdayNumber,
  weekdayNumberToString,
} from '@/utils/datetime/weekdayToNumber'

export const formatWeekdayNumberToDisplay = (
  weekdayNumbers: Array<WeekdayNumber>,
): string => {
  if (weekdayNumbers.length === 0) {
    return ''
  }

  if (weekdayNumbers.length === 7) {
    return 'Elke dag'
  }

  if (
    weekdayNumbers.length === 2 &&
    weekdayNumbers.includes(0) &&
    weekdayNumbers.includes(6)
  ) {
    return 'zaterdag en zondag'
  }

  if (weekdayNumbers.length === 1) {
    return weekdayNumberToString(weekdayNumbers[0])
  }

  const sortedWeekdayNumbers = weekdayNumbers.sort((a, b) => a - b)

  if (
    sortedWeekdayNumbers.length >= 3 &&
    numbersAreConsecutive(sortedWeekdayNumbers)
  ) {
    return `${weekdayNumberToString(sortedWeekdayNumbers[0])} tot en met ${weekdayNumberToString(sortedWeekdayNumbers[sortedWeekdayNumbers.length - 1])}`
  }

  const lastDay = sortedWeekdayNumbers.pop() as WeekdayNumber

  return (
    sortedWeekdayNumbers
      .map(dayNumber => weekdayNumberToString(dayNumber))
      .join(', ') + ` en ${weekdayNumberToString(lastDay)}`
  )
}

const numbersAreConsecutive = (numbers: number[]) => {
  if (numbers.length < 2) {
    return true
  }

  // eslint-disable-next-line sonarjs/reduce-initial-value
  return ([...numbers].sort((a, b) => a - b) as Array<number | false>).reduce(
    (acc, num) => {
      if (acc === false) {
        return false
      }

      return num === acc + 1 ? num : false
    },
  )
}
