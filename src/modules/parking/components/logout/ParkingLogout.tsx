import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingLogoutButton} from '@/modules/parking/components/logout/ParkingLogoutButton'
import {useParkingAccounts, useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'

type Props = {
  routeReportCode?: string
}

export const ParkingLogout = ({routeReportCode}: Props) => {
  const navigation = useNavigation()

  const accounts = useParkingAccounts()
  const parkingAccountFromParams = routeReportCode && accounts[routeReportCode]
  const parkingAccount = useParkingAccount()
  const account = parkingAccountFromParams || parkingAccount
  const isVisitor = account?.scope === ParkingPermitScope.visitor

  if (!account) {
    return <SomethingWentWrong testID="ParkingLogoutSomethingWentWrong" />
  }

  return (
    <Column gutter="xl">
      <Column gutter="sm">
        <Title text="Wilt u uitloggen?" />
        <Paragraph variant="intro">
          Als u uitlogt, is dit account niet meer actief in de app. U kunt later
          altijd weer inloggen.
        </Paragraph>
      </Column>
      {account.permits?.length ? (
        <Column gutter="sm">
          <Title
            level="h4"
            testID="ParkingLogoutScreenSubtitle"
            text="Deze vergunningen worden uitgelogd:"
          />
          {account.permits.map(permit => (
            <Box key={permit.report_code}>
              <Row gutter="md">
                <Icon
                  name={isVisitor ? 'person' : 'document-check-mark'}
                  size="lg"
                  testID="ParkingLogoutScreenPermitIcon"
                />
                <Phrase
                  testID={`ParkingLogoutScreenPermit-${permit.report_code}Phrase`}>
                  {permit.permit_name}
                </Phrase>
              </Row>
            </Box>
          ))}
        </Column>
      ) : null}
      <Column gutter="md">
        <ParkingLogoutButton
          accountReportCode={account.reportCode}
          hasMoreAccounts={Object.keys(accounts).length > 1}
        />
        <Button
          label="Annuleren"
          onPress={navigation.goBack}
          testID="ParkingLogoutScreenCancelButton"
          variant="secondary"
        />
      </Column>
    </Column>
  )
}
