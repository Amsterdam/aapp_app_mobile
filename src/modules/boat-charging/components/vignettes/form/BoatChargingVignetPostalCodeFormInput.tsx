import {TextInputField} from '@/components/ui/forms/input/TextInputField'

export const BoatChargingVignetPostalCodeFormInput = () => (
  <TextInputField
    autoCapitalize="characters"
    autoComplete="off"
    autoCorrect={false}
    hasClearButton={false}
    inputInstructions="Vul de postcode in die bij het vignet hoort"
    label="Postcode"
    name="postalCode"
    required
    rules={{
      required: 'Vul een postcode in.',
      validate: (value: string) =>
        new RegExp(/^[1-9]\d{3}\s?[a-zA-Z]{2}$/).test(value) ||
        'Vul een geldige postcode in, bijvoorbeeld 1234AB.',
    }}
    testID="BoatChargingVignetPostalCodeFormInputField"
  />
)
