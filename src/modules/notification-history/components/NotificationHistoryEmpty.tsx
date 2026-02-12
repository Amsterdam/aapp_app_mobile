import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Center} from '@/components/ui/layout/Center'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'

export const NotificationHistoryEmpty = () => (
  <Center grow>
    <SingleSelectable>
      <Column
        gutter="sm"
        halign="center">
        <Title
          level="h4"
          testID="NotificationHistoryEmptyTitle"
          text="Geen meldingen"
        />
        <Phrase testID="NotificationHistoryEmptyPhrase">
          In de afgelopen 30 dagen
        </Phrase>
      </Column>
    </SingleSelectable>
  </Center>
)
