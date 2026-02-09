import {SelectButtonControlled} from '@/components/ui/forms/SelectButtonControlled'
import {ParkingSessionBottomSheetVariant} from '@/modules/parking/constants'
import {formatNumber} from '@/utils/formatNumber'

export const ParkingChooseAmountButton = () => (
  <SelectButtonControlled<{amount?: number}, 'amount'>
    bottomSheetVariant={ParkingSessionBottomSheetVariant.amount}
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
