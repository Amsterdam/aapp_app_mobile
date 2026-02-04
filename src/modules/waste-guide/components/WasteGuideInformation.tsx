import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

export const WasteGuideInformation = () => (
  <>
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
    <ExternalLinkButton
      label="Lees meer over afval"
      redirectKey={RedirectKey.waste}
      testID="WasteGuideInformationButton"
      variant="secondary"
    />
  </>
)
