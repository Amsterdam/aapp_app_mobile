import {useContext} from 'react'
import {useController} from 'react-hook-form'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

type Props = {
  isNegative?: boolean
}

type Option = {
  label: string
  value: number
}

const getOptions = (
  timeBalance: number,
  secondsRemaining: number,
  isNegative?: boolean,
) => {
  const optionsArray = [2, 4, 8, 12]
  let options: Option[] = []

  if (isNegative) {
    options = optionsArray
      .filter(n => n < secondsRemaining / 3600)
      .map(value => ({
        label: '- ' + value + ' uur',
        value: value * 3600,
      }))
    options.push({
      label:
        '- ' +
        formatTimeDurationToDisplay(secondsRemaining, 'seconds', {short: true}),
      value: secondsRemaining,
    })
  } else {
    options = optionsArray
      .filter(n => n < timeBalance / 3600)
      .map(value => ({
        label: '+ ' + value + ' uur',
        value: value * 3600,
      }))
  }

  if (optionsArray[0] && timeBalance < optionsArray[0] * 3600) {
    options.push({
      label:
        '+ ' +
        formatTimeDurationToDisplay(timeBalance, 'seconds', {short: true}),
      value: timeBalance,
    })
  }

  return options
}

export const ManageVisitorTimeAddOnBottomSheet = ({isNegative}: Props) => {
  const currentPermit = useCurrentParkingPermit()
  const {
    field: {value: time, onChange},
  } = useController<{time?: number}>({
    name: 'time',
  })
  const {close} = useContext(BottomSheetContext)

  if (!currentPermit.visitor_account) {
    return null
  }

  return (
    <BottomSheet testID="ManageVisitorTimeAddOnBottomSheet">
      <Box grow>
        <Column gutter="md">
          <Phrase>
            Beschikbare tijd:{' '}
            {formatTimeDurationToDisplay(
              isNegative
                ? currentPermit.visitor_account.seconds_remaining
                : currentPermit.time_balance,
              'seconds',
              {short: true},
            )}
          </Phrase>
          <RadioGroup
            onChange={onChange}
            options={getOptions(
              currentPermit.time_balance,
              currentPermit.visitor_account.seconds_remaining,
              isNegative,
            )}
            testID="ParkingSessionAmountBottomSheetContentRadioGroup"
            value={time}
          />
          <Button
            label="Gereed"
            onPress={close}
            testID="ParkingSessionAmountBottomSheetContentDoneButton"
          />
        </Column>
      </Box>
    </BottomSheet>
  )
}
