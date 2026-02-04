import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Track} from '@/components/ui/layout/Track'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {myReportsExternalLinks} from '@/modules/report-problem/external-links'

export const MyReportsSection = () => {
  const openWebUrl = useOpenWebUrl()
  const reportProblemMapUrl = useUrlForEnv(myReportsExternalLinks)

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
                onPress={() => openWebUrl(reportProblemMapUrl)}
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
