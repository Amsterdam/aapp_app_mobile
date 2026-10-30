import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {useLicensePlateMutations} from '@/modules/parking/hooks/useLicensePlateMutations'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {useAlert} from '@/store/slices/alert'

type Props = ReturnType<typeof useLicensePlateMutations> & {
  prefilledLicensePlate?: ParkingLicensePlate
}

export const LicensePlateFormSubmitButton = ({
  prefilledLicensePlate,
  editLicensePlate,
  saveLicensePlate,
  isLoadingAddLicensePlate,
  isErrorAddLicensePlate,
  isLoadingEditLicensePlate,
  isErrorEditLicensePlate,
}: Props) => {
  const navigation = useNavigation()
  const {licensePlates} = useGetLicensePlates()
  const {handleSubmit, formState} = useFormContext<ParkingLicensePlate>()
  const {setAlert} = useAlert()

  const onSave = useCallback(
    async (vehicle_id: string, visitor_name: string) => {
      try {
        if (prefilledLicensePlate) {
          await editLicensePlate({
            vehicle_id,
            visitor_name,
            id: prefilledLicensePlate.id,
          })
        } else {
          await saveLicensePlate({
            vehicle_id,
            visitor_name,
          })
        }

        navigation.popTo(ParkingRouteName.myLicensePlates)
      } catch (error: unknown) {
        const errorType = (error as {message: 'save' | 'delete'}).message

        const alert =
          errorType === 'save'
            ? alerts.licensePlateMutationInstructionsFailed
            : {
                ...alerts.licensePlateMutationFailed,
                text: `Er ging iets fout met het ${prefilledLicensePlate ? 'aanpassen' : 'opslaan'} van het kenteken.`,
              }

        setAlert(alert)
      }
    },
    [
      editLicensePlate,
      navigation,
      prefilledLicensePlate,
      saveLicensePlate,
      setAlert,
    ],
  )

  const onSubmit = ({vehicle_id, visitor_name = ''}: ParkingLicensePlate) => {
    if (
      vehicle_id === prefilledLicensePlate?.vehicle_id &&
      visitor_name === prefilledLicensePlate.visitor_name
    ) {
      navigation.popTo(ParkingRouteName.myLicensePlates)

      return
    }

    const duplicateLicensePlate = licensePlates?.find(
      licensePlate => licensePlate.vehicle_id === vehicle_id,
    )

    if (duplicateLicensePlate?.id && !prefilledLicensePlate) {
      setAlert({
        ...alerts.saveLicensePlateDuplicateWarning,
        navigateTo: {
          label: 'Ga naar kenteken',
          type: 'replace',
          params: [
            ParkingRouteName.editLicensePlate,
            {licensePlateId: duplicateLicensePlate.id},
          ],
        },
      })

      return
    }

    // check if vehicle_id has no digits in string
    if (!/\d/.test(vehicle_id)) {
      Alert.alert(
        'Weet u zeker dat dit een geldig kenteken is?',
        `Kenteken: ${vehicle_id}`,
        [
          {text: 'Terug'},
          {
            isPreferred: true,
            text: 'Opslaan',
            onPress: () => onSave(vehicle_id, visitor_name),
          },
        ],
      )
    } else {
      return onSave(vehicle_id, visitor_name)
    }
  }

  return (
    <Button
      isError={isErrorAddLicensePlate || isErrorEditLicensePlate}
      isLoading={
        formState.isSubmitting ||
        isLoadingAddLicensePlate ||
        isLoadingEditLicensePlate
      }
      label="Opslaan"
      onPress={handleSubmit(onSubmit)}
      testID="ParkingLicensePlateFormSubmitButton"
    />
  )
}
