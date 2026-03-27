import {useEffect, useState} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {Switch} from '@/components/ui/forms/Switch'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {useGetMaxLicensePlates} from '@/modules/parking/hooks/useGetMaxLicensePlates'
import {useMaxLicensePlatesAlert} from '@/modules/parking/hooks/useMaxLicensePlatesAlert'

export const ParkingSessionAddLicensePlate = () => {
  const {isOpen} = useBottomSheet()
  const [isVisitorNameVisible, setIsVisitorNameVisible] = useState(false)
  const {licensePlates, isLoading} = useGetLicensePlates()
  const maxLicensePlates = useGetMaxLicensePlates()
  const maxLicensePlatesAlert = useMaxLicensePlatesAlert()

  useEffect(() => {
    if (!isOpen) {
      setIsVisitorNameVisible(false)
    }
  }, [isOpen])

  if (isLoading) {
    return <PleaseWait testID="ParkingSessionAddLicensePlatePleaseWait" />
  }

  return (
    <Column gutter="md">
      <ParkingVehicleIdTextInput
        inputInstructions="Voer alleen letters en cijfers in."
        label="Kenteken"
        testID="ParkingAddLicensePlateFormLicensePlateInputField"
      />
      <Switch
        accessibilityLabel="Toevoegen aan Mijn kentekens"
        label={<Phrase>Toevoegen aan Mijn kentekens</Phrase>}
        onChange={() => setIsVisitorNameVisible(!isVisitorNameVisible)}
        testID="ParkingSessionAddLicensePlateSaveSwitch"
        value={isVisitorNameVisible}
      />
      {isVisitorNameVisible ? (
        (licensePlates?.length ?? 0) >= maxLicensePlates ? (
          <>
            <Gutter />
            <AlertBase
              {...maxLicensePlatesAlert}
              hasCloseIcon={false}
            />
          </>
        ) : (
          <TextInputField
            hasClearButton={false}
            label="Naam"
            name="visitor_name"
            rules={{required: 'Vul een naam in'}}
            testID="ParkingAddLicensePlateFormNameInputField"
          />
        )
      ) : null}
    </Column>
  )
}
