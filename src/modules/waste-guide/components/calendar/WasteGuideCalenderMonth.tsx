import type {Dayjs} from 'dayjs'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {WasteGuideCalenderWeek} from '@/modules/waste-guide/components/calendar/WasteGuideCalenderWeek'
import {capitalizeString} from '@/utils/transform/capitalizeString'

export const WasteGuideCalenderMonth = ({
  month,
  weeks,
}: {
  month: string
  weeks: Record<number, Array<Dayjs | null>>
}) => (
  <Column gutter="sm">
    <Title
      level="h5"
      text={capitalizeString(month)}
    />

    <Column>
      {Object.entries(weeks).map(([week, days], weekIndex) => (
        <WasteGuideCalenderWeek
          days={days}
          isFirstOfMonth={weekIndex === 0}
          isLastRow={weekIndex === Object.values(weeks).length - 1}
          key={week}
        />
      ))}
    </Column>
  </Column>
)
