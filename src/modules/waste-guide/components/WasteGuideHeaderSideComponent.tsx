import {FeatureFlag} from '@/components/features/FeatureFlag'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {MenuHeaderButton} from '@/components/ui/menus/MenuHeaderButton'
import {Features} from '@/constants/featureFlags'
import {useCalendarView} from '@/modules/waste-guide/slice'

export const WasteGuideHeaderSideComponent = () => {
  const {calendarView, toggleCalendarView} = useCalendarView()

  return (
    <Row gutter="md">
      <IconButton
        accessibilityLabel={`Toon ophaaldagen als ${calendarView !== 'list' ? 'lijst' : 'kalender'}`}
        icon={
          <Icon
            color="link"
            name={calendarView === 'list' ? 'grid' : 'list'}
            size="lg"
          />
        }
        onPress={toggleCalendarView}
        testID="WasteGuideToggleCalendarViewButton"
      />

      <FeatureFlag feature={Features.WasteGuideCalendarSubscribe}>
        <MenuHeaderButton testID="WasteGuideCalendarHeaderMenuButton" />
      </FeatureFlag>
    </Row>
  )
}
