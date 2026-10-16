import {TextInputField} from '@/components/ui/forms/input/TextInputField'

export const BoatChargingVignetNumberFormInput = () => (
  <TextInputField
    autoCapitalize="characters"
    autoComplete="off"
    autoCorrect={false}
    hasClearButton={false}
    inputInstructions="Bijvoorbeeld: AMS123456"
    label="Vignetnummer"
    name="vignetNumber"
    required
    rules={{
      required: 'Vul een vignetnummer in.',
      pattern: {
        value: /^[a-zA-Z0-9]*$/,
        message: 'Alleen cijfers en letters zijn toegestaan',
      },
      maxLength: {
        value: 10,
        message: 'Vul een vignetnummer in van maximaal 10 tekens.',
      },
    }}
    testID="BoatChargingVignetNumberFormInputField"
  />
)
