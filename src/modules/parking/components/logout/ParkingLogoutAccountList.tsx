import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {type ParkingAccount, ParkingPermitScope} from '@/modules/parking/types'
import {ModuleSlug} from '@/modules/slugs'

type ParkingLogoutAccountListProps = {
  accounts: ParkingAccount[]
  scope: ParkingPermitScope
}

export const ParkingLogoutAccountList = ({
  accounts,
  scope,
}: ParkingLogoutAccountListProps) => {
  const {navigate} = useNavigation()
  const isPermitHolder = scope === ParkingPermitScope.permitHolder
  const isVisitor = scope === ParkingPermitScope.visitor

  return (
    <Column gutter="md">
      <Title
        level="h2"
        text={isPermitHolder ? 'Eigen account' : 'Bezoekersaccount'}
      />
      {accounts.map(account => {
        const permit = account.permits?.[0]

        if (!permit) {
          return null
        }

        return (
          <Row
            align="between"
            gutter="md"
            key={account.reportCode}
            valign="start">
            {!!isPermitHolder && (
              <Phrase
                testID={`ParkingLogoutAccounts-${account.reportCode}Phrase`}>
                {permit.permit_name}
              </Phrase>
            )}
            {!!isVisitor && (
              <Column shrink={1}>
                <Phrase
                  testID={`ParkingLogoutAccounts-${account.reportCode}Phrase`}>
                  {`Op bezoek ${permit.permit_zone?.name}`}
                </Phrase>
                <Phrase color="secondary">{permit.report_code}</Phrase>
              </Column>
            )}
            <Button
              alignSelf="center"
              flexShrink={0}
              label="Uitloggen"
              onPress={() => {
                navigate(ModuleSlug.parking, {
                  screen: ParkingRouteName.logout,
                  params: {reportCode: account.reportCode},
                })
              }}
              testID={`ParkingLogoutAccounts-${account.reportCode}LogoutButton`}
              variant="secondary"
            />
          </Row>
        )
      })}
    </Column>
  )
}
