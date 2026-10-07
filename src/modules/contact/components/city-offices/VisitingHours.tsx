import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {List} from '@/components/ui/text/list/List'
import {Title} from '@/components/ui/text/Title'
import {CityOffice, VisitingHour} from '@/modules/contact/types'
import {getGroupedOpeningHours} from '@/modules/contact/utils/getGroupedOpeningHours'

type Props = {
  visitingHours: VisitingHour[]
  visitingHoursContent: CityOffice['visitingHoursContent']
}

export const VisitingHours = ({visitingHours, visitingHoursContent}: Props) => {
  if (visitingHoursContent) {
    return (
      <HtmlContent
        content={visitingHoursContent}
        testID="ContactVisitingHoursHtml"
      />
    )
  }

  const items = getGroupedOpeningHours(visitingHours)

  return (
    <Column gutter="md">
      <Title
        level="h3"
        testID="ContactVisitingHoursTitle"
        text="Openingstijden"
      />
      <List
        items={items}
        testID="ContactVisitingHoursGroupedList"
      />
    </Column>
  )
}
