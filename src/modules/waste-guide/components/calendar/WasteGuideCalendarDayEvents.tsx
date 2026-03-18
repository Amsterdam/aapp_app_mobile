import {IconButton} from '@/components/ui/buttons/IconButton'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'

type Props = {
  dayEvents: WasteGuideCalendarEvent[]
}

export const WasteGuideCalendarDayEvents = ({dayEvents}: Props) => {
  const {navigate} = useNavigation()

  return (
    <Column gutter="sm">
      {dayEvents?.map(({code}, idx) => (
        <IconButton
          icon={<WasteFractionIcon fractionCode={code} />}
          key={idx}
          onPress={() =>
            navigate(WasteGuideRouteName.wasteGuideFraction, {
              fractionCode: code,
            })
          }
          testID="WasteFractionIconCalendarButton"
        />
      ))}
    </Column>
  )
}

/**
 * This component can be used to force similar vertical sizing on empty days and rows. We can achieve this by rendering an empty Icon inside the IconButton
 */
export const EmptyWasteGuideCalendarDayEvents = () => (
  <IconButton
    accessible={false}
    disabled
    focusable={false}
    icon={
      <Icon
        path=""
        size="xl"
        testID="EmptyWasteGuideCalendarDayEventsIcon"
      />
    }
    testID="EmptyWasteGuideCalendarDayEventsButton"
  />
)
