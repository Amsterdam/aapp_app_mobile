import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useMyAddress} from '@/modules/address/exports/hooks/useMyAddress'
import {getAddressLineWithCityIfNotAmsterdam} from '@/modules/address/exports/utils/getAddressLineWithCityIfNotAmsterdam'
import {AddressModalName} from '@/modules/address/routes'
import {PersonalDetailsBottomSheetVariant} from '@/modules/user/components/bottomsheet/bottomsheetVariants'

export const PersonalDetailsAddressButton = () => {
  const navigation = useNavigation()
  const address = useMyAddress()
  const {open} = useBottomSheet()

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="ml"
      description={
        address ? getAddressLineWithCityIfNotAmsterdam(address) : 'Vul adres in'
      }
      icon={{name: 'house'}}
      insetVertical="sm"
      isDescriptionBelowIcon={false}
      onPress={() =>
        address
          ? open(PersonalDetailsBottomSheetVariant.address)
          : navigation.navigate(AddressModalName.myAddressForm, {
              showAlertAfterSuccess: true,
            })
      }
      testID="PersonalDetailsMyAddressButton"
      title="Adres"
    />
  )
}
