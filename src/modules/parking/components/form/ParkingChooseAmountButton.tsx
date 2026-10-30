import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import type {ParkingIncreaseBalanceFormValues} from '@/modules/parking/screens/ParkingIncreaseBalance.screen'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingChooseAmountButton = () => (
  <SelectButtonControlled<ParkingIncreaseBalanceFormValues, 'amount'>
    bottomSheetVariant="amount"
    icon={{name: 'euro-coins', size: 'lgx'}}
    name="amount"
    rules={{
      required: 'Kies een bedrag',
    }}
    testID="ParkingChooseAmountButton"
    text={amount => (amount ? '+ ' + formatNumber(amount, 'EUR') : undefined)}
    title={amount => (amount ? 'Bedrag' : 'Kies een bedrag')}
  />
)
