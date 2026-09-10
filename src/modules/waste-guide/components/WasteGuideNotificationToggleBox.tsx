import {NotificationSubscriptionToggleBox} from '@/components/features/NotificationSubscriptionToggleBox'
import {useSelector} from '@/hooks/redux/useSelector'
import {useLocationType, useMyAddress} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {selectContract} from '@/modules/waste-guide/slice'
import {NotificationSubscriptionType} from '@/services/notification.service'

export const WasteGuideNotificationToggleBox = () => {
  const locationType = useLocationType(ModuleSlug['waste-guide'])
  const address = useMyAddress()
  const {wasteGuide} = useGetWasteGuide()
  const contract = useSelector(selectContract(address?.bagId))

  const isNonResidentialWithContract =
    wasteGuide?.is_residential === false && contract?.hasContract === true

  if (
    !address?.bagId ||
    locationType !== 'address' ||
    isNonResidentialWithContract
  ) {
    return null
  }

  return (
    <NotificationSubscriptionToggleBox
      bag_nummeraanduiding_id={address.bagId}
      description="U krijgt meldingen over ophaaldagen voor ‘Mijn adres’."
      notificationSubscriptionType={NotificationSubscriptionType.wasteGuide}
      testID="WasteGuideNotificationSwitch"
    />
  )
}
