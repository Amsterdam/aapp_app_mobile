import {ShareIconButton} from '@/components/features/ShareIconButton'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {Address} from '@/modules/address/types'
import {
  getAddressLine1,
  getAddressLine2,
} from '@/modules/address/utils/addDerivedAddressFields'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

const WASTE_GUIDE_BASE_URL = 'https://www.amsterdam.nl/afval/afvalinformatie/'

export const WasteGuideShareIconButton = () => {
  const {address, hasValidAddress} = useSelectedAddress(
    ModuleSlug['waste-guide'],
  )
  const url = buildWasteGuideUrl(address)

  if (!hasValidAddress) {
    return null
  }

  return (
    <ShareIconButton
      baseUrl={WASTE_GUIDE_BASE_URL}
      exceptionFileName="WasteGuideShare.tsx"
      testID="WasteGuideShareIconButton"
      url={url}
      urlTitle="Afvalinformatie"
    />
  )
}

const buildWasteGuideUrl = (address?: Address) => {
  if (!address) {
    return WASTE_GUIDE_BASE_URL
  }

  const addressLine1 = getAddressLine1(address)
  const addressLine2 = getAddressLine2(address)

  const addressString = `${addressLine1}, ${addressLine2}`
  const encoded = encodeURIComponent(addressString)

  return `${WASTE_GUIDE_BASE_URL}?adres=${encoded}`
}
