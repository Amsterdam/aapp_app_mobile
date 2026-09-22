import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {ExceptionDate, VisitingHour} from '@/modules/contact/types'
import {getNextOpening} from '@/modules/contact/utils/getNextOpening'
import {getVisitingHoursTodayStatus} from '@/modules/contact/utils/getVisitingHoursTodayStatus'

type Props = {
  visitingHours: VisitingHour[]
  visitingHoursExceptions: ExceptionDate[]
}

export const VisitingHoursToday = ({
  visitingHours,
  visitingHoursExceptions,
}: Props) => {
  const {closingTime, status} = getVisitingHoursTodayStatus(
    visitingHours,
    visitingHoursExceptions,
  )

  if (status === 'closed') {
    const next = getNextOpening(visitingHours, visitingHoursExceptions)

    return (
      <Column>
        <Phrase
          color="negative"
          emphasis="strong"
          testID="ContactVisitingHoursTodayClosedLabel">
          Gesloten
        </Phrase>
        {!!next && (
          <Phrase color="default">
            {`(We zijn open vanaf ${next.dayLabel} ${next.timeLabel} uur)`}
          </Phrase>
        )}
      </Column>
    )
  }

  return (
    <Column>
      <Phrase
        color="confirm"
        emphasis="strong"
        testID="ContactVisitingHoursTodayOpenLabel">
        Open tot {closingTime} uur
      </Phrase>
      {status === 'open-exception' && (
        <Paragraph>(aangepaste openingstijden)</Paragraph>
      )}
    </Column>
  )
}
