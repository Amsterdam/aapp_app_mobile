import {SectionList} from 'react-native'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {WasteGuideCalendarEvent} from '@/modules/waste-guide/types'
import {getWasteCalendarListSections} from '@/modules/waste-guide/utils/getWasteCalendarListSections'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  calendar: WasteGuideCalendarEvent[]
}

export const WasteGuideCalendarListView = ({calendar}: Props) => {
  const {sectionList, eventsToday} = getWasteCalendarListSections(calendar)
  const {navigate} = useNavigation()

  return (
    <SectionList
      keyExtractor={item => item.date}
      ListHeaderComponent={
        eventsToday.length === 0 ? (
          <Box
            insetBottom="md"
            insetHorizontal="md">
            <Phrase>Er wordt vandaag geen afval opgehaald.</Phrase>
          </Box>
        ) : null
      }
      renderItem={({item}) => (
        <Box
          insetBottom="md"
          insetHorizontal="md">
          <Column gutter="md">
            <Phrase emphasis="strong">
              {capitalizeString(item.eventDate.format('dddd D MMMM'))}
              {item.isToday ? ' (vandaag)' : ''}
            </Phrase>
            <Column gutter="lg">
              {item.events.map(event => (
                <NavigationButton
                  chevronColor="secondary"
                  chevronSize="md"
                  color="default"
                  emphasis="default"
                  Icon={<WasteFractionIcon fractionCode={event.code} />}
                  insetHorizontal="no"
                  key={event.code}
                  onPress={() => {
                    navigate(WasteGuideRouteName.wasteGuideFraction, {
                      fractionCode: event.code,
                    })
                  }}
                  testID={`WasteGuideList${item.eventDate.format('YYYY-MM-DD')}${event.code}FractionButton`}
                  title={event.label}
                />
              ))}
            </Column>
          </Column>
        </Box>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Box
          insetHorizontal="md"
          insetVertical="no">
          <Title
            accessibilityLabel={`Ophaaldagen voor ${title}`}
            level="h2"
            text={title.charAt(0).toUpperCase() + title.slice(1)}
          />
        </Box>
      )}
      sections={sectionList}
      SectionSeparatorComponent={SectionSeparatorComponent}
      stickySectionHeadersEnabled={false}
    />
  )
}

const SectionSeparatorComponent = () => <Gutter height="lg" />
