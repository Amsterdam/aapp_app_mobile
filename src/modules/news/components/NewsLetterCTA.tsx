import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

export const NewsLetterCTA = () => (
  <Box
    inset="lg"
    variant="positive">
    <Column gutter="md">
      <Title
        color="inverse"
        text="Blijf op de hoogte!"
      />
      <Paragraph color="inverse">
        Schrijf u in voor de Nieuwsbrief Amsterdam en ontvang wekelijks nieuws
        uit de stad en uw stadsdeel.
      </Paragraph>

      <ExternalLinkButton
        label="Ik wil de nieuwsbrief"
        redirectKey={RedirectKey.newsLetter}
        testID="NewsLetterCTAButton"
        variant="positive"
      />
    </Column>
  </Box>
)
