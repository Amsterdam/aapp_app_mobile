import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useParkingAccount} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {formatDate} from '@/utils/datetime/formatDate'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

export const ParkingPermitBalanceTime = () => {
  const currentPermit = useCurrentParkingPermit()
  const parkingAccount = useParkingAccount()

  if (!currentPermit.time_balance_applicable) {
    return null
  }

  return (
    <SingleSelectable>
      <Column gutter="xs">
        <Row align="between">
          <Title
            accessible={false}
            level="h5"
            testID="ParkingPermitBalanceTimeTitlePhrase"
            text="Tijdsaldo"
          />
          <Title
            accessible={false}
            level="h5"
            testID="ParkingPermitBalanceTimeTitlePhrase"
            text={formatTimeDurationToDisplay(
              currentPermit.time_balance,
              'seconds',
              {format: 'short'},
            )}
          />
        </Row>
        {parkingAccount?.scope === ParkingPermitScope.permitHolder && (
          <Phrase
            accessible={false}
            testID="ParkingPermitBalanceTimeValidUntilPhrase">
            {`Geldig tot ${formatDate(currentPermit.time_valid_until)}`}
          </Phrase>
        )}
      </Column>
    </SingleSelectable>
  )
}
