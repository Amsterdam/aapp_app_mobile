import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const BurningGuideCodeInfoScreen = () => (
  <Screen testID="BurningGuideCodeInfoScreen">
    <Box>
      <Column gutter="lg">
        <Column gutter="md">
          <Title
            level="h2"
            text="Code rood"
          />
          <Paragraph>
            Bij code rood is er of te weinig wind of is de luchtkwaliteit te
            slecht. Dit betekent dat de rook blijft hangen en de lucht nog
            slechter wordt. Stook daarom geen hout.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            text="Code oranje"
          />
          <Paragraph>
            Bij code oranje is er genoeg wind om de rook weg te blazen, maar de
            luchtkwaliteit is matig. Als u hout stookt wordt de lucht voor u en
            de buren slechter. Stook daarom liever niet.
          </Paragraph>
        </Column>
        <Column gutter="md">
          <Title
            level="h2"
            text="Code geel"
          />
          <Paragraph>
            Bij code geel is er genoeg wind waardoor de rook niet blijft hangen.
            De luchtkwaliteit is nog voldoende. U kunt hout stoken, maar doe het
            slim.
          </Paragraph>
        </Column>
      </Column>
    </Box>
  </Screen>
)
