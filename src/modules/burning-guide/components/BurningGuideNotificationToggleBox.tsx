import {NotificationSubscriptionToggleBox} from '@/components/features/NotificationSubscriptionToggleBox'
import {Box} from '@/components/ui/containers/Box'
import {useLocationType} from '@/modules/address/exports/hooks/useLocationType'
import {useMyAddress} from '@/modules/address/exports/hooks/useMyAddress'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {NotificationSubscriptionType} from '@/services/notification.service'

export const BurningGuideNotificationToggleBox = () => {
  const locationType = useLocationType(ModuleSlug['burning-guide'])
  const address = useMyAddress()

  if (!address?.postcode || locationType !== 'address') {
    return null
  }

  return (
    <Box
      insetHorizontal="md"
      insetVertical="no">
      <NotificationSubscriptionToggleBox
        description="U krijgt meldingen bij code rood voor ‘Mijn adres’."
        notificationSubscriptionType={NotificationSubscriptionType.burningGuide}
        postal_code={address.postcode.slice(0, 4)}
        testID="BurningGuideNotificationSwitch"
      />
    </Box>
  )
}
