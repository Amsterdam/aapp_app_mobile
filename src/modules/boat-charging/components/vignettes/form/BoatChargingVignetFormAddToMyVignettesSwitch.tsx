import {useFormContext} from 'react-hook-form'
import {SwitchField} from '@/components/ui/forms/SwitchField'
import {Phrase} from '@/components/ui/text/Phrase'
import type {BoatChargingVignetFormValues} from '@/modules/boat-charging/providers/BoatChargingVignetForm.provider'

export const BoatChargingVignetFormAddToMyVignettesSwitch = () => {
  const {watch} = useFormContext<BoatChargingVignetFormValues>()

  return (
    <SwitchField
      accessibilityLabel={`Opslaan in Mijn vignetten staat ${watch('saveToMyVignettes') ? 'aan' : 'uit'}`}
      label={<Phrase>Opslaan in Mijn vignetten</Phrase>}
      name="saveToMyVignettes"
      testID="BoatChargingVignetFormSwitchField"
    />
  )
}
