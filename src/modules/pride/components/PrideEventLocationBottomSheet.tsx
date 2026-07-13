import simplur from 'simplur'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {ContentButton} from '@/components/ui/buttons/ContentButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePrideEvents} from '@/modules/pride/hooks/usePrideEvents'
import {PrideRouteName} from '@/modules/pride/routes'
import {formatMeta} from '@/modules/pride/utils/formatMeta'

export const PrideEventLocationBottomSheet = () => {
  const {params} = useBottomSheet()
  const {getEventsOnLocation} = usePrideEvents()
  const {navigate} = useNavigation()

  const {id} = params as {id: number}

  if (!id || typeof id !== 'number') {
    return (
      <SomethingWentWrong testID="PrideEventsBottomSheetSomethingWentWrong" />
    )
  }

  const events = getEventsOnLocation(id)

  const title = [
    'Op deze locatie',
    simplur`[is|zijn]${[events.length]}`,
    events.length,
    simplur`[evenement|evenementen]${[events.length]}`,
    'te bezoeken:',
  ].join(' ')

  return (
    <Column gutter="md">
      <Box>
        <Title
          level="h5"
          text={title}
        />
      </Box>
      {events.map(event => (
        <ContentButton
          icon={{name: 'calendar', color: 'cityPass'}}
          imageBackgroundColor="pride"
          key={event.id}
          meta={formatMeta(event)}
          onPress={() => navigate(PrideRouteName.eventDetails, {id: event.id})}
          testID={`PrideEvent${event.id}Button`}
          title={event.title}
          titleColor="cityPass"
        />
      ))}
    </Column>
  )
}
