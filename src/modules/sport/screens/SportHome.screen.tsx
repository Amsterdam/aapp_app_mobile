import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {SportsCategoriesGrid} from '@/modules/sport/components/SportsCategoriesGrid'

export const SportHomeScreen = () => (
  <Screen testID="SportHomeScreen">
    <Box
      insetHorizontal="sm"
      insetVertical="md">
      <Column gutter="xl">
        <Box insetHorizontal="sm">
          <Paragraph variant="intro">
            Door de hele stad vindt u sportverenigingen, sportparken, zwembaden
            en sporthallen. Veel van deze sportlocaties kunt u ook huren.
            Daarnaast zijn er voorzieningen voor aangepast sporten. Zo kan
            iedereen meedoen.
          </Paragraph>
        </Box>
        <SportsCategoriesGrid />
      </Column>
    </Box>
  </Screen>
)
