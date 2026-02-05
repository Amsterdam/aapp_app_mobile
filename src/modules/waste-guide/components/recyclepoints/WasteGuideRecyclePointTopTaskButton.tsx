import type {WasteGuideRecyclePoint} from '@/modules/waste-guide/types'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {
  getAddressLine1,
  getAddressLine2,
} from '@/modules/address/utils/addDerivedAddressFields'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  recyclePoint: WasteGuideRecyclePoint
}

export const WasteGuideRecyclePointTopTaskButton = ({recyclePoint}: Props) => {
  const {open: openBottomSheet} = useBottomSheet()
  const {address, commercialWaste, name} = recyclePoint

  return (
    <TopTaskButton
      accessibilityHint="Tik om een ander recyclepunt te selecteren."
      accessibilityLabel={accessibleText(
        `${address.cityDistrict ?? ''}${commercialWaste ? '' : ', geen bedrijfsafval'}, ${getAddressLine1(address)} ${getAddressLine2(address.postcode, address.city)}`,
      )}
      icon={{name: 'recycle'}}
      insetHorizontal="no"
      onPress={() => openBottomSheet()}
      testID="RecyclePointTopTaskButton"
      text={
        <Column gutter="no">
          {!!address.cityDistrict && (
            <Phrase>
              {address.cityDistrict}
              {commercialWaste ? '' : ' (geen bedrijfsafval)'}
            </Phrase>
          )}
          <Phrase>{getAddressLine1(address)}</Phrase>
          <Phrase>{getAddressLine2(address.postcode, address.city)}</Phrase>
        </Column>
      }
      title={name}
      titleIconName="chevron-down"
    />
  )
}
