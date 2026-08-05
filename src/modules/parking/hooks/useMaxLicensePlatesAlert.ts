import {
  AlertVariant,
  type AlertProps,
} from '@/components/ui/feedback/alert/Alert.types'
import {MAX_LICENSE_PLATES} from '@/modules/parking/constants'

export const useMaxLicensePlatesAlert = (): AlertProps => ({
  variant: AlertVariant.warning,
  text: `Er kunnen niet meer dan ${MAX_LICENSE_PLATES} kentekens worden opgeslagen.`,
  title: 'Maximum aantal kentekens',
  hasIcon: true,
  hasCloseIcon: true,
  testID: 'ParkingMaxLicensePlatesAlert',
})
