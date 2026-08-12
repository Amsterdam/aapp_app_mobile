import {useCallback} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {TextInputField} from '@/components/ui/forms/input/TextInputField'
import {Column} from '@/components/ui/layout/Column'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {ParkingVehicleIdTextInput} from '@/modules/parking/components/form/ParkingVehicleIdTextInput'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetLicensePlates} from '@/modules/parking/hooks/useGetLicensePlates'
import {useLicensePlateMutations} from '@/modules/parking/hooks/useLicensePlateMutations'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {useAlert} from '@/store/slices/alert'

export const LicensePlateForm = ({
  licensePlateId,
}: {
  licensePlateId?: ParkingLicensePlate['id']
}) => {
  const navigation = useNavigation()
  const {licensePlates} = useGetLicensePlates()

  const prefilledLicensePlate = licensePlates?.find(
    plate => plate.id === licensePlateId,
  )
  const form = useForm<ParkingLicensePlate>({
    defaultValues: prefilledLicensePlate,
  })
  const {handleSubmit, formState} = form
  const currentPermit = useCurrentParkingPermit()
  const {setAlert} = useAlert()

  const {
    editLicensePlate,
    saveLicensePlate,
    deleteLicensePlate,
    isLoadingAddLicensePlate,
    isErrorAddLicensePlate,
    isLoadingRemoveLicensePlate,
    isErrorRemoveLicensePlate,
    isLoadingEditLicensePlate,
    isErrorEditLicensePlate,
  } = useLicensePlateMutations()

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

  const onPressDelete = useCallback(
    (licensePlate: ParkingLicensePlate) => {
      const {id, vehicle_id, visitor_name} = licensePlate

      Alert.alert(
        'Weet u zeker dat u het kenteken wilt verwijderen?',
        `Kenteken: ${vehicle_id}${visitor_name ? '\nNaam: ' + visitor_name : ''}`,
        [
          {
            text: 'Annuleren',
            style: 'cancel',
            onPress: () => null,
          },
          {
            text: 'Verwijderen',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: async () => {
              try {
                await deleteLicensePlate({
                  vehicle_id,
                  id,
                })

                navigation.popTo(ParkingRouteName.myLicensePlates)
              } catch {
                setAlert({
                  ...alerts.licensePlateMutationFailed,
                  text: 'Er ging iets fout met het verwijderen van het kenteken',
                })
              }
            },
          },
        ],
        {cancelable: true},
      )
    },
    [deleteLicensePlate, navigation, setAlert],
  )

  return (
    <FormProvider {...form}>
      <Column gutter="xl">
        <Column gutter="lg">
          <ParkingVehicleIdTextInput
            inputInstructions="Voer alleen letters en cijfers in."
            label="Kenteken"
            testID="ParkingLicensePlateFormLicensePlateInputField"
          />
          <TextInputField
            hasClearButton={false}
            label="Naam"
            name="visitor_name"
            rules={{
              required: 'Vul een naam in',
              maxLength: {
                value: 50,
                message: 'De ingevoerde naam is te lang',
              },
            }}
            testID="ParkingLicensePlateFormNameInputField"
          />
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
        </Column>

        {!currentPermit.forced_license_plate_list &&
          !!prefilledLicensePlate && (
            <Button
              icon={{name: 'trash-bin'}}
              isError={isErrorRemoveLicensePlate}
              isLoading={
                !!isLoadingRemoveLicensePlate && !isLoadingEditLicensePlate
              }
              label="Kenteken verwijderen"
              onPress={() => onPressDelete(prefilledLicensePlate)}
              testID="ParkingDeleteLicensePlateButton"
              variant="tertiaryDestructive"
            />
          )}
      </Column>
    </FormProvider>
  )
}
