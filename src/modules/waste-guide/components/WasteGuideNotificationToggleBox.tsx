import {useCallback} from 'react'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
import {useSelector} from '@/hooks/redux/useSelector'
import {useLocationType} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {
  useDeleteWasteGuideNotificationMutation,
  useGetWasteGuideNotificationQuery,
  usePostWasteGuideNotificationMutation,
} from '@/modules/waste-guide/service'
import {selectContract} from '@/modules/waste-guide/slice'

export const WasteGuideNotificationToggleBox = () => {
  const locationType = useLocationType(ModuleSlug['waste-guide'])
  const {isLoading, isSuccess, data} = useGetWasteGuideNotificationQuery()
  const {address, wasteGuide} = useGetWasteGuide()
  const contract = useSelector(selectContract(address?.bagId))

  const [postWasteGuideNotification] = usePostWasteGuideNotificationMutation()
  const [deleteWasteGuideNotification] =
    useDeleteWasteGuideNotificationMutation()

  const onChange = useCallback(
    (value: boolean) => {
      if (value && address?.bagId) {
        void postWasteGuideNotification(address?.bagId)
      } else {
        void deleteWasteGuideNotification()
      }
    },
    [address?.bagId, deleteWasteGuideNotification, postWasteGuideNotification],
  )

  const isNonResidentialWithContract =
    !wasteGuide?.is_residential && contract?.hasContract

  if (!address || locationType !== 'address' || isNonResidentialWithContract) {
    return null
  }

  return (
    <NotificationToggleBox
      description="U krijgt meldingen over ophaaldagen voor ‘Mijn adres’."
      disabled={isLoading}
      onChange={onChange}
      testID="WasteGuideNotificationSwitch"
      value={!!isSuccess && data.status === 'success'}
    />
  )
}
