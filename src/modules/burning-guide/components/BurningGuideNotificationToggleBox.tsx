import {useCallback} from 'react'
import {NotificationToggleBox} from '@/components/features/NotificationToggleBox'
import {Box} from '@/components/ui/containers/Box'
import {useLocationType, useMyAddress} from '@/modules/address/slice'
import {
  useGetBurningGuideNotificationQuery,
  usePostBurningGuideNotificationMutation,
  useDeleteBurningGuideNotificationMutation,
} from '@/modules/burning-guide/service'
import {ModuleSlug} from '@/modules/slugs'

export const BurningGuideNotificationToggleBox = () => {
  const locationType = useLocationType(ModuleSlug['burning-guide'])
  const address = useMyAddress()
  const {isLoading, isSuccess, data} = useGetBurningGuideNotificationQuery()

  const [postBurningGuideNotification] =
    usePostBurningGuideNotificationMutation()
  const [deleteBurningGuideNotification] =
    useDeleteBurningGuideNotificationMutation()
  const onChange = useCallback(
    (value: boolean) => {
      if (value && address?.postcode) {
        void postBurningGuideNotification(address?.postcode.slice(0, 4))
      } else {
        void deleteBurningGuideNotification()
      }
    },
    [
      address?.postcode,
      deleteBurningGuideNotification,
      postBurningGuideNotification,
    ],
  )

  if (!address || locationType !== 'address') {
    return null
  }

  return (
    <Box
      insetHorizontal="md"
      insetVertical="no">
      <NotificationToggleBox
        description="U krijgt meldingen bij code rood voor ‘Mijn adres’."
        disabled={isLoading}
        onChange={onChange}
        testID="BurningGuideNotificationSwitch"
        value={!!isSuccess && data.status === 'success'}
      />
    </Box>
  )
}
