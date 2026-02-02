import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'

export const BurningGuideTipsScreen = () => (
  <Screen testID="BurningGuideTipsScreen">
    <Column gutter="lg">
      <Box>
        <Column gutter="lg">
          <Title text="Tips slim stoken" />
          <List
            items={[
              'Wilt u toch stoken? Doe het dan zo schoon mogelijk. Stook alleen schoon, droog en gekloofd kachelhout. ',
              'Zorg voor genoeg luchttoevoer tijdens het stoken en het uitbranden.',
              'Stook niet bij windstil of mistig weer.',
              'Zorg voor voldoende frisse lucht in de ruimte waar gestookt wordt.',
              'Stop op tijd met stoken. Dovend vuur rookt nog lang na.',
              'Laat de schoorsteen elk jaar vegen.',
            ]}
            testID="BurningGuideTipsList"
          />
        </Column>
      </Box>
    </Column>
  </Screen>
)
