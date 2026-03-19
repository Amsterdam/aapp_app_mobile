import {months, type Dayjs} from 'dayjs'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {WasteGuideCalendarWeek} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarWeek'
import {capitalizeString} from '@/utils/transform/capitalizeString'

export const WasteGuideCalendarMonth = ({
  month,
  weeks,
}: {
  month: string
  weeks: Record<number, Array<Dayjs | null>>
}) => (
  <Column gutter="sm">
    <Title
      level="h5"
      text={capitalizeString(months()[Number(month)])}
    />

    <Column>
      {Object.entries(weeks).map(([week, days], weekIndex) => (
        <WasteGuideCalendarWeek
          days={days}
          isFirstOfMonth={weekIndex === 0}
          isLastRow={weekIndex === Object.values(weeks).length - 1}
          key={week}
        />
      ))}
    </Column>
  </Column>
)
