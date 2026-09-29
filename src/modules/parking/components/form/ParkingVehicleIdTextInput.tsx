import {TextInputProps} from 'react-native'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {TestProps} from '@/components/ui/types'

type Props = {
  defaultValue?: string
  inputInstructions?: string
  label?: string
} & TextInputProps &
  TestProps

export const ParkingVehicleIdTextInput = ({
  defaultValue,
  label,
  inputInstructions,
  testID,
  ...textInputProps
}: Props) => (
  <TextInputField
    autoCapitalize="characters"
    autoComplete="off"
    autoCorrect={false}
    defaultValue={defaultValue}
    hasClearButton={false}
    inputInstructions={inputInstructions}
    label={label}
    name="vehicle_id"
    rules={{
      required: 'Vul een kenteken in',
      pattern: {
        value: /^[a-zA-Z0-9]*$/,
        message: 'Alleen cijfers en letters zijn toegestaan',
      },
    }}
    testID={testID}
    textTransform={text => text.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}
    {...textInputProps}
  />
)
