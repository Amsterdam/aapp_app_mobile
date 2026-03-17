import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewVariant} from '@/components/features/map/providers/MapViewSwitchContext'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
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
    <PermitMapProvider>
      <MapViewSwitchProvider
        variant={
          previousRouteName === ParkingRouteName.startSession
            ? MapViewVariant.search
            : MapViewVariant.list
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
      </MapViewSwitchProvider>
    </PermitMapProvider>
  )
}

export const ParkingPermitZonesScreen = () => (
  <CurrentPermitProvider>
    <ParkingPermitZonesScreenInner />
  </CurrentPermitProvider>
)
