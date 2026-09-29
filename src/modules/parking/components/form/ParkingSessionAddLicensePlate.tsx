import {useEffect, useState} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {ParkingSessionAddLicensePlateName} from '@/modules/parking/components/form/ParkingSessionAddLicensePlateName'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'

export const ParkingSessionAddLicensePlate = () => {
  const {isOpen} = useBottomSheet()
  const [isVisitorNameVisible, setIsVisitorNameVisible] = useState(false)
  const {licensePlates, isLoading} = useGetLicensePlates()

  useEffect(() => {
    if (!isOpen) {
      setIsVisitorNameVisible(false)
    }
  }, [isOpen])

  if (isLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="ParkingSessionAddLicensePlatePleaseWait"
      />
    )
  }

  return (
    <Column gutter="md">
      <ParkingVehicleIdTextInput
        inputInstructions="Voer alleen letters en cijfers in."
        label="Uw kenteken"
        testID="ParkingAddLicensePlateFormLicensePlateInputField"
      />
      <Switch
        accessibilityLabel="Toevoegen aan Mijn kentekens"
        label={<Phrase>Toevoegen aan Mijn kentekens</Phrase>}
        onChange={() => setIsVisitorNameVisible(!isVisitorNameVisible)}
        testID="ParkingSessionAddLicensePlateSaveSwitch"
        value={isVisitorNameVisible}
      />
      {!!isVisitorNameVisible && (
        <ParkingSessionAddLicensePlateName licensePlates={licensePlates} />
      )}
    </Column>
  )
}
