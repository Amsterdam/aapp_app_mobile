import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Track} from '@/components/ui/layout/Track'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenRedirect} from '@/hooks/linking/useOpenRedirect'
import {devLog} from '@/processes/development'

export const MyReportsSection = () => {
  const {redirectUrls} = useOpenRedirect()

  devLog(redirectUrls)

  return (
    <Column gutter="md">
      <Title
        level="h2"
        testID="MyReportsSectionTitle"
        text="Melding volgen"
      />
      <Track gutter="lg">
        <Column
          flex={2}
          gutter="md">
          <Paragraph>U kunt uw melding volgen via Mijn meldingen.</Paragraph>
        </Column>
        <Column
          flex={1}
          gutter="md">
          <Row
            gutter="md"
            wrap>
            <Column grow={1}>
              <ExternalLinkButton
                label="Mijn meldingen"
                onPress={() => devLog('TODO: link naar mijn meldingen')}
                testID="MyReportsSectionExternalLinkButton"
                variant="secondary"
              />
            </Column>
          </Row>
        </Column>
      </Track>
    </Column>
  )
}
