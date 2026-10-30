import {TextInputField} from '@/components/ui/forms/input/TextInputField'

const lengthValidation = {
  value: 8,
  message: 'Vul een vignetnummer in van 8 tekens.',
}

export const BoatChargingVignetNumberFormInput = () => (
  <TextInputField
    autoCapitalize="characters"
    autoComplete="off"
    autoCorrect={false}
    hasClearButton={false}
    inputInstructions="Bijvoorbeeld: AM123456"
    label="Vignetnummer"
    name="vignetNumber"
    required
    rules={{
      required: 'Vul een vignetnummer in.',
      pattern: {
        value: /^[a-zA-Z0-9]*$/,
        message: 'Alleen cijfers en letters zijn toegestaan',
      },
      maxLength: lengthValidation,
      minLength: lengthValidation,
    }}
    testID="BoatChargingVignetNumberFormInputField"
  />
)
