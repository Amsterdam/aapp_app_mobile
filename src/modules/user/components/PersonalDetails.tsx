import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {Column} from '@/components/ui/layout/Column'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {PersonalDetailsBottomSheetVariant} from '@/modules/user/components/bottomsheet/bottomsheetVariants'
import {PersonalDetailsAddressButton} from '@/modules/user/components/personal-details/PersonalDetailsAddressButton'
import {PersonalDetailsEmailButton} from '@/modules/user/components/personal-details/PersonalDetailsEmailButton'
import {PersonalDetailsPhoneButton} from '@/modules/user/components/personal-details/PersonalDetailsPhoneButton'

export const PersonalDetails = () => {
  const {open} = useBottomSheet()

  return (
    <Column gutter="md">
      <Column gutter="xxs">
        <PersonalDetailsAddressButton />
        <PersonalDetailsEmailButton />
        <PersonalDetailsPhoneButton />
      </Column>

      <InlineLink
        onPress={() => open(PersonalDetailsBottomSheetVariant.privacy)}
        phraseVariant="small"
        testID="UserUseOfPersonalDetailsLink">
        Zo gebruiken we uw gegevens
      </InlineLink>
    </Column>
  )
}
