import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PersonalDetailsBottomSheetVariant} from '@/modules/user/components/bottomsheet/bottomsheetVariants'

export const PersonalDetailsPhoneButton = () => {
  const {open} = useBottomSheet()
  //TODO: set/get secure storage value

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="ml"
      description="Vul telefoonnummer in"
      icon={{name: 'phone'}}
      insetVertical="sm"
      isDescriptionBelowIcon={false}
      onPress={() => open(PersonalDetailsBottomSheetVariant.phone)}
      testID="PersonalDetailsPhoneButton"
      title="Telefoonnummer"
    />
  )
}
