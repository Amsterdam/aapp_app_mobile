import {Button} from '@/components/ui/buttons/Button'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingLogoutButton} from '@/modules/parking/components/logout/ParkingLogoutButton'
import {
  useParkingAccounts,
  useParkingAccount,
  useParkingAccountIsLoggingOut,
} from '@/modules/parking/slice'

type Props = {
  routeReportCode?: string
}

export const ParkingLogout = ({routeReportCode}: Props) => {
  const navigation = useNavigation()
  const isLoggingOut = useParkingAccountIsLoggingOut()

  const accounts = useParkingAccounts()
  const parkingAccountFromParams = routeReportCode && accounts[routeReportCode]
  const parkingAccount = useParkingAccount()
  const account = parkingAccountFromParams || parkingAccount

  if (isLoggingOut) {
    return <PleaseWait testID="ParkingLogoutPleaseWait" />
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
      {account?.permits?.length ? (
        <Column gutter="sm">
          <Paragraph testID="ParkingLogoutScreenLogoutParagraph">
            Deze vergunningen worden uitgelogd:
          </Paragraph>
          <List
            items={account.permits.map(permit => permit.permit_name)}
            testID="ParkingLogoutScreenPermitList"
          />
        </Column>
      ) : null}
      <Column gutter="md">
        <ParkingLogoutButton
          accountReportCode={account?.reportCode}
          hasMoreAccounts={Object.keys(accounts).length > 1}
          routeReportCode={routeReportCode}
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
