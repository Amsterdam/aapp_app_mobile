import {months, type Dayjs} from 'dayjs'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {WasteGuideCalendarWeek} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarWeek'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  month: string
  weeks: Record<string, Array<Dayjs | null>>
}
export const WasteGuideCalendarMonth = ({month, weeks}: Props) => (
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
