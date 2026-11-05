import {TextInputProps} from 'react-native'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {TestProps} from '@/components/ui/types'
import {VehicleInformation} from '@/modules/parking/components/license-plates/VehicleInformation'

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
  <Column gutter="md">
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
    <VehicleInformation />
  </Column>
)
