import {useEffect, useMemo} from 'react'
import {useFormContext} from 'react-hook-form'
import type {
  LicensePlatesEndpointResponse,
  ParkingLicensePlate,
} from '@/modules/parking/types'
import {Notice} from '@/components/ui/feedback/Notice'
import {AlertBase} from '@/components/ui/feedback/alert/AlertBase'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Gutter} from '@/components/ui/layout/Gutter'
import {alerts} from '@/modules/parking/alerts'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'

type Props = {
  licensePlates: LicensePlatesEndpointResponse | undefined
}

export const ParkingSessionAddLicensePlateName = ({
  licensePlates = [],
}: Props) => {
  const {setValue, watch} = useFormContext<ParkingLicensePlate>()
  const licensePlateId = watch('vehicle_id')

  const savedLicensePlate = useMemo(
    () =>
      licensePlates?.find(
        licensePlate => licensePlate.vehicle_id === licensePlateId,
      ),
    [licensePlateId, licensePlates],
  )

  useEffect(() => {
    if (savedLicensePlate) {
      setValue('visitor_name', savedLicensePlate?.visitor_name)
    }

    return () => {
      setValue('visitor_name', '')
    }
  }, [setValue, savedLicensePlate])

  if (licensePlates.length >= MAX_LICENSE_PLATES) {
    return (
      <>
        <Gutter />
        <AlertBase
          {...alerts.maxLicensePlatesWarning}
          hasCloseIcon={false}
        />
      </>
    )
  }

  return (
    <>
      <TextInputField
        hasClearButton={false}
        label="Naam"
        name="visitor_name"
        rules={{required: 'Vul een naam in'}}
        testID="ParkingAddLicensePlateFormNameInputField"
      />
      {!!savedLicensePlate && (
        <Notice
          text="Dit kenteken staat al in Mijn kentekens. U kunt de naam aanpassen."
          variant="information"
        />
      )}
    </>
  )
}
