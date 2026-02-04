import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Track} from '@/components/ui/layout/Track'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

export const ReportMapSection = () => (
  <Column gutter="md">
    <Title
      level="h2"
      testID="ReportMapSectionTitle"
      text="Meldingenkaart"
    />
    <Track gutter="lg">
      <Column
        flex={2}
        gutter="md">
        <Paragraph>
          Bekijk eerst de meldingenkaart om te zien welke meldingen al bekend
          zijn bij de gemeente.
        </Paragraph>
      </Column>
      <Column
        flex={1}
        gutter="md">
        <Row
          gutter="md"
          wrap>
          <Column grow={1}>
            <ExternalLinkButton
              label="Meldingenkaart"
              redirectKey={RedirectKey.reported_problems_map}
              testID="ReportMapSectionExternalLinkButton"
              variant="secondary"
            />
          </Column>
        </Row>
      </Column>
    </Track>
  </Column>
)
