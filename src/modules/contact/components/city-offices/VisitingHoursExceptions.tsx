import {Column} from '@/components/ui/layout/Column'
import {List} from '@/components/ui/text/list/List'
import {Title} from '@/components/ui/text/Title'
import {CityOffice} from '@/modules/contact/types'
import {getUpcomingExceptionDescriptions} from '@/modules/contact/utils/getUpcomingExceptionDescriptions'

type Props = {
  visitingHoursExceptions: CityOffice['visitingHours']['exceptions']
}

export const VisitingHoursExceptions = ({visitingHoursExceptions}: Props) => {
  const items = getUpcomingExceptionDescriptions(visitingHoursExceptions)
  const uniqueExceptions = items.filter((e, idx) => e && e !== items[idx - 1])

  if (!uniqueExceptions.length) {
    return null
  }

  return (
    <Column gutter="md">
      <Title
        level="h3"
        testID="ContactVisitingHoursExceptionTitle"
        text="Aangepaste openingstijden"
      />
      <List
        items={uniqueExceptions}
        testID="ContactVisitingHoursGroupedList"
      />
    </Column>
  )
}
