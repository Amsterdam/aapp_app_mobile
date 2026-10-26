import {useCallback} from 'react'
import {Alert} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useLicensePlateMutations} from '@/modules/parking/hooks/useLicensePlateMutations'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingLicensePlate} from '@/modules/parking/types'
import {useAlert} from '@/store/slices/alert'

type Props = {
  prefilledLicensePlate: ParkingLicensePlate
} & ReturnType<typeof useLicensePlateMutations>

export const LicensePlateFormDeleteButton = ({
  prefilledLicensePlate,
  deleteLicensePlate,
  isLoadingRemoveLicensePlate,
  isErrorRemoveLicensePlate,
  isLoadingEditLicensePlate,
}: Props) => {
  const navigation = useNavigation()
  const {setAlert} = useAlert()

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
    <Button
      icon={{name: 'trash-bin'}}
      isError={isErrorRemoveLicensePlate}
      isLoading={!!isLoadingRemoveLicensePlate && !isLoadingEditLicensePlate}
      label="Kenteken verwijderen"
      onPress={() => onPressDelete(prefilledLicensePlate)}
      testID="ParkingDeleteLicensePlateButton"
      variant="tertiaryDestructive"
    />
  )
}
