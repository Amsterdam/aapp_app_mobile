import {Button} from '@/components/ui/buttons/Button'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

export const ManageVisitorTimeBalanceOverview = () => {
  const {navigate} = useNavigation()
  const currentPermit = useCurrentParkingPermit()

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <Column gutter="lg">
      <Title
        level="h2"
        text="Tijdsaldo bezoeker"
      />
      <SingleSelectable>
        <Column gutter="no">
          <Row
            align="between"
            flex={1}>
            <Phrase>Tijdsaldo</Phrase>
            <Phrase
              emphasis="strong"
              testID="ManageVisitorTimeBalanceOverviewAmountPhrase">
              {formatTimeDurationToDisplay(
                currentPermit.visitor_account?.seconds_remaining,
                'seconds',
                {short: true},
              )}
            </Phrase>
          </Row>
          <Phrase>
            Tot {formatDateToDisplay(currentPermit.time_valid_until, false)}
          </Phrase>
        </Column>
      </SingleSelectable>
      <Paragraph>
        Beheer de tijd van uw bezoekersaccount. De aangepaste tijd wordt
        verrekend met het saldo van uw bezoekersvergunning.
      </Paragraph>
      <Column gutter="md">
        <Button
          label="Tijd toevoegen"
          onPress={() =>
            navigate(ParkingRouteName.manageVisitorAdjustTimeBalance)
          }
          testID="ParkingManageVisitorIncreaseTimeBalanceButton"
        />
        <Button
          label="Tijd aftrekken"
          onPress={() =>
            navigate(ParkingRouteName.manageVisitorAdjustTimeBalance, {
              subtractTime: true,
            })
          }
          testID="ParkingManageVisitorDecreaseTimeBalanceButton"
          variant="secondary"
        />
      </Column>
    </Column>
  )
}
