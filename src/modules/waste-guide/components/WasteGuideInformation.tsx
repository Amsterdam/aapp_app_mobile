import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

export const WasteGuideInformation = () => (
  <HorizontalSafeArea flex={1}>
    <Box grow>
      <Column gutter="md">
        <Title
          level="h2"
          text="Alles over afval"
        />
        <Paragraph>
          In de app ziet u ophaaldagen en afvalinformatie. Op de website vindt u
          meer informatie, zoals afval voor ondernemers en rolcontainers
          aanvragen.
        </Paragraph>
      </Column>
      <Gutter height="lg" />
      <ExternalLinkButton
        label="Lees meer over afval"
        redirectKey={RedirectKey.waste}
        testID="WasteGuideInformationButton"
        variant="secondary"
      />
    </Box>
  </HorizontalSafeArea>
)
