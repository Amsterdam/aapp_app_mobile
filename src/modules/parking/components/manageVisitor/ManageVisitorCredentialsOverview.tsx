import {CopyButton} from '@/components/ui/buttons/CopyButton'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {ManageVisitorRemoveAccountButton} from '@/modules/parking/components/manageVisitor/ManageVisitorRemoveAccountButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'

export const ManageVisitorCredentialsOverview = () => {
  const currentPermit = useCurrentParkingPermit()

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <Column gutter="lg">
      <Title text="Inloggegevens" />
      <Column gutter="no">
        <SingleSelectable>
          <Row
            align="between"
            flex={1}>
            <Phrase>Meldcode</Phrase>
            <Phrase
              emphasis="strong"
              testID="ManageVisitorCredentialsOverviewReportCodePhrase">
              {currentPermit.visitor_account.report_code}
            </Phrase>
          </Row>
        </SingleSelectable>
        <SingleSelectable>
          <Row
            align="between"
            flex={1}>
            <Phrase>Pincode</Phrase>
            <Phrase
              emphasis="strong"
              testID="ManageVisitorCredentialsOverviewPinPhrase">
              {currentPermit.visitor_account.pin}
            </Phrase>
          </Row>
        </SingleSelectable>
      </Column>
      <CopyButton
        label="Inloggegevens kopiëren"
        testID="ParkingManageVisitorCopyCredentialsButton"
        textToCopy={`Meldcode: ${currentPermit.visitor_account.report_code}, Pincode: ${currentPermit.visitor_account.pin}`}
      />
      <ManageVisitorRemoveAccountButton />
    </Column>
  )
}
