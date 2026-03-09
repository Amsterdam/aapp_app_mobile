import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {usePreviousRoute} from '@/hooks/navigation/usePreviousRoute'
import {ParkingMachineBottomSheetContent} from '@/modules/parking/components/permit-zone/ParkingMachineBottomSheetContent'
import {ParkingPermitZone} from '@/modules/parking/components/permit-zone/ParkingPermitZone'
import {ParkingPermitZoneHeaderButton} from '@/modules/parking/components/permit-zone/ParkingPermitZoneHeaderButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {CurrentPermitProvider} from '@/modules/parking/providers/CurrentPermitProvider'
import {PermitMapProvider} from '@/modules/parking/providers/PermitMapProvider'
import {ParkingRouteName} from '@/modules/parking/routes'

const ParkingPermitZonesScreenInner = () => {
  const {permit_zone} = useCurrentParkingPermit()
  const {name: previousRouteName} = usePreviousRoute() ?? {}

  return (
    <PermitMapProvider
      variant={
        previousRouteName === ParkingRouteName.startSession ? 'search' : 'list'
      }>
      <Screen
        bottomSheet={
          <BottomSheet
            scroll
            testID="ParkingPermitZonesBottomSheet">
            <ParkingMachineBottomSheetContent />
          </BottomSheet>
        }
        headerOptions={{
          headerTitle:
            previousRouteName === ParkingRouteName.startSession
              ? 'Kies parkeerautomaat'
              : permit_zone.name,
          SideComponent: ParkingPermitZoneHeaderButton,
        }}
        scroll={false}
        testID="ParkingPermitZonesScreen"
        withBottomInset={false}>
        <ParkingPermitZone />
      </Screen>
    </PermitMapProvider>
  )
}

export const ParkingPermitZonesScreen = () => (
  <CurrentPermitProvider>
    <ParkingPermitZonesScreenInner />
  </CurrentPermitProvider>
)
