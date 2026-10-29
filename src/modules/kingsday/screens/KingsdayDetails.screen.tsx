import type {NavigationProps} from '@/app/navigation/types'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitch.provider'
import {MapFocus} from '@/components/features/map/types'
import {Screen} from '@/components/features/screen/Screen'
import type {KingsdayRouteName} from '@/modules/kingsday/routes'
import {createBottomsheetVariants} from '@/modules/service/exports/bottomsheetVariants'
import {ServiceHeaderButton} from '@/modules/service/exports/ServiceHeaderButton'
import {ServiceMapFiltersProvider} from '@/modules/service/exports/ServiceMapFiltersProvider'
import {ServicePointView} from '@/modules/service/exports/ServicePointView'

type Props = NavigationProps<KingsdayRouteName.details>

export const KingsdayDetailsScreen = ({route}: Props) => (
  <MapViewSwitchProvider>
    <ServiceMapFiltersProvider serviceId={route.params.id}>
      <Screen
        bottomSheet={
          <BottomSheet
            scroll
            testID="KingsdayScreenBottomSheet"
            variants={createBottomsheetVariants(route.params.id)}
            withCloseButton
          />
        }
        headerOptions={{
          disableHorizontalInsets: true,
          headerTitle: route.params.title,
          SideComponent: ServiceHeaderButton,
        }}
        scroll={false}
        testID="KingsdayDetailsScreen"
        withBottomInset={false}>
        <ServicePointView
          focusType={MapFocus.specific}
          id={route.params.id}
        />
      </Screen>
    </ServiceMapFiltersProvider>
  </MapViewSwitchProvider>
)
