import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useIsPermissionFeatureAvailableOnDevice} from '@/hooks/permissions/useIsPermissionFeatureAvailableOnDevice'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {AddWasteCardButton} from '@/modules/waste-guide/components/waste-card/AddWasteCardButton'
import {ShowWasteCardButton} from '@/modules/waste-guide/components/waste-card/ShowWasteCardButton'
import {useGetCachedServerModule} from '@/store/slices/modules'
import {Permissions} from '@/types/permissions'
import {SecureItemKey} from '@/utils/secureStorage'

type Props = {
  showAddOnly?: boolean
}

export const WasteCardButton = ({showAddOnly}: Props) => {
  const isBluetoothAvailable = useIsPermissionFeatureAvailableOnDevice(
    Permissions.bluetooth,
  )
  const {cachedServerModule, isInactive} = useGetCachedServerModule(
    ModuleSlug['waste-container'],
  )

  const {item: secureWasteCardNumber, isLoading} = useGetSecureItem(
    SecureItemKey.wasteCardNumber,
  )

  if (!cachedServerModule || isInactive || !isBluetoothAvailable) {
    return null
  }

  if (isLoading) {
    return <PleaseWait testID="WasteCardButtonPleaseWait" />
  }

  if (!!secureWasteCardNumber && !showAddOnly) {
    return <ShowWasteCardButton />
  }

  if (!secureWasteCardNumber) {
    return <AddWasteCardButton />
  }

  return null
}
