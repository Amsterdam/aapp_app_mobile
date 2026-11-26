import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {PersonalDetailsBottomSheetVariant} from '@/modules/user/components/bottomsheet/bottomsheetVariants'

export const PersonalDetailsEmailButton = () => {
  const {open} = useBottomSheet()
  //TODO: set/get secure storage value

  return (
    <NavigationButton
      chevronColor="secondary"
      chevronSize="ml"
      description="Vul e-mailadres in"
      icon={{name: 'mail'}}
      insetVertical="sm"
      isDescriptionBelowIcon={false}
      onPress={() => open(PersonalDetailsBottomSheetVariant.email)}
      testID="PersonalDetailsEmailButton"
      title="E-mailadres"
    />
  )
}
