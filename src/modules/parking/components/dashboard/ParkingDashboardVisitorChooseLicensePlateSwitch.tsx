import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {ContextSwitchButton} from '@/components/ui/buttons/ContextSwitchButton'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {ParkingDashboardBottomSheetVariant} from '@/modules/parking/components/dashboard/bottomsheet/bottomsheetVariants'
import {useVisitorVehicleId} from '@/modules/parking/slice'

export const ParkingDashboardVisitorChooseLicensePlateSwitch = () => {
  const {visitorVehicleId} = useVisitorVehicleId()
  const {toggle} = useBottomSheet()

  return (
    <Column
      gutter="sm"
      halign="start">
      {!!visitorVehicleId && (
        <Paragraph>U ziet parkeersessies voor {visitorVehicleId}</Paragraph>
      )}
      <ContextSwitchButton
        accessibilityLabel="Tik om een kenteken te kiezen"
        label={
          visitorVehicleId ? 'Kies een ander kenteken' : 'Kies een kenteken'
        }
        noPadding
        onPress={() => toggle(ParkingDashboardBottomSheetVariant.licensePlate)}
        testID="ParkingPermitSessionsVisitorLicensePlateContextSwitchButton"
      />
    </Column>
  )
}
