import {useController} from 'react-hook-form'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {formatNumber} from '@/utils/formatNumber'

const options = [2.5, 5.0, 10.0, 15.0, 20, 50, 100].map(value => ({
  label: '+ ' + formatNumber(value, 'EUR'),
  value,
}))

export const ParkingSessionAmountBottomSheetContent = () => {
  const {
    field: {value: amount, onChange},
  } = useController<{amount?: number}>({
    name: 'amount',
  })
  const {close} = useBottomSheet()

  return (
    <Box grow>
      <Column gutter="md">
        <Title
          level="h5"
          text="Kies een bedrag"
          textAlign="center"
        />
        <RadioGroup
          onChange={onChange}
          options={options}
          testID="ParkingSessionAmountBottomSheetContentRadioGroup"
          value={amount}
        />
        <Button
          label="Gereed"
          onPress={close}
          testID="ParkingSessionAmountBottomSheetContentDoneButton"
        />
      </Column>
    </Box>
  )
}
