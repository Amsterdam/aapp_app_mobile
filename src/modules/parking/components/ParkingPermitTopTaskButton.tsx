import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ParkingDashboardBottomSheetVariant} from '@/modules/parking/components/dashboard/bottomsheet/bottomsheetVariants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {
  useCurrentParkingPermitReportCode,
  useParkingAccount,
} from '@/modules/parking/slice'
import {ParkingPermitScope} from '@/modules/parking/types'
import {useBottomSheet} from '@/store/slices/bottomSheet'

export const ParkingPermitTopTaskButton = () => {
  const {toggle} = useBottomSheet()
  const currentPermitReportCode = useCurrentParkingPermitReportCode()
  const parkingAccount = useParkingAccount()
  const {permit_name, report_code, permit_zone} = useCurrentParkingPermit()

  if (!currentPermitReportCode) {
    return (
      <SomethingWentWrong testID="ParkingPermitTopTaskButtonSomethingWentWrong" />
    )
  }

  const title =
    parkingAccount?.scope === ParkingPermitScope.visitor
      ? `Op bezoek ${permit_zone.name} - ${report_code}`
      : permit_name

  return (
    <TopTaskButton
      accessibilityHint="Tik om een andere vergunning te selecteren."
      accessibilityLabel={`De huidige vergunning is ${title}.`}
      iconName={
        parkingAccount?.scope === ParkingPermitScope.visitor
          ? 'person'
          : 'document-check-mark'
      }
      iconSize="lg"
      insetVertical="sm"
      minHeight={32}
      onPress={() => toggle(ParkingDashboardBottomSheetVariant.selectPermit)}
      testID="ParkingPermitTopTaskButton"
      title={title}
      titleIconName="chevron-down"
    />
  )
}
