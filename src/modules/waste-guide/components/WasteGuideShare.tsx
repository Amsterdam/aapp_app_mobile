import {Platform, Share} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {Address} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

const WASTE_GUIDE_BASE_URL = 'https://www.amsterdam.nl/afval/afvalinformatie/'

export const WasteGuideShare = () => {
  const trackException = useTrackException()
  const {address, hasValidAddress} = useSelectedAddress(
    ModuleSlug['waste-guide'],
  )
  const url = buildWasteGuideUrl(address)
  const onShare = async () => {
    try {
      await Share.share({
        message: url,
        title: 'Afvalinformatie',
      })
    } catch (error) {
      trackException(ExceptionLogKey.shareFailed, 'WasteGuideShare.tsx', {
        error,
        url: WASTE_GUIDE_BASE_URL,
      })
    }
  }

  if (!hasValidAddress) {
    return null
  }

  return (
    <IconButton
      icon={
        <Icon
          color="link"
          name={Platform.OS === 'ios' ? 'share-ios' : 'share-android'}
          size="lg"
          testID="WasteGuideShareIcon"
        />
      }
      onPress={onShare}
      testID="WasteGuideShareButton"
    />
  )
}

const buildWasteGuideUrl = (address?: Address) => {
  if (!address) {
    return WASTE_GUIDE_BASE_URL
  }

  const addressString = `${address.addressLine1}, ${address.postcode} ${address.city}`
  const encoded = encodeURIComponent(addressString)

  return `${WASTE_GUIDE_BASE_URL}?adres=${encoded}`
}
