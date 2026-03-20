import {Phrase} from '@/components/ui/text/Phrase'
import {WasteGuideCalendarCell} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarCell'
import {WasteGuideCalendarDaysRow} from '@/modules/waste-guide/components/calendar/WasteGuideCalendarDaysRow'
import {getWeekdaysStartingFrom} from '@/utils/datetime/getWeekdaysStartingFrom'
import {capitalizeString} from '@/utils/transform/capitalizeString'

const dayNames = getWeekdaysStartingFrom(1, true)
const dayNamesLong = getWeekdaysStartingFrom(1, false)

export const WasteGuideCalendarWeekdays = () => (
  <WasteGuideCalendarDaysRow>
    {dayNames.map((name, index) => (
      <WasteGuideCalendarCell
        accessibilityLabel={dayNamesLong[index]}
        key={name}
        size="md">
        <Phrase
          accessible={false}
          color={
            index === dayNames.length - 1 || index === dayNames.length - 2
              ? 'secondary'
              : undefined
          }>
          {capitalizeString(name)}
        </Phrase>
      </WasteGuideCalendarCell>
    ))}
  </WasteGuideCalendarDaysRow>
)
