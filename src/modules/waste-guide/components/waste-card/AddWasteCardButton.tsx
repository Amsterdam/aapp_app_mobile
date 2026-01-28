import {skipToken} from '@reduxjs/toolkit/query'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/slugs'
import {WasteContainerRouteName} from '@/modules/waste-container/routes'
import {useGetWasteCardQuery} from '@/modules/waste-container/service'

export const AddWasteCardButton = () => {
  const {navigate} = useNavigation()
  const {address} = useSelectedAddress(ModuleSlug['waste-guide'])

  const {data} = useGetWasteCardQuery(
    address?.postcode
      ? {
          postal_code: address?.postcode,
        }
      : skipToken,
  )

  return data?.has_container ? (
    <Button
      iconName="plus-circle_filled"
      label="Afvalpas toevoegen"
      onPress={() =>
        navigate(ModuleSlug['waste-container'], {
          screen: WasteContainerRouteName.addWasteCard,
        })
      }
      testID="WasteGuideAddWasteCardButton"
      variant="secondary"
    />
  ) : null
}
