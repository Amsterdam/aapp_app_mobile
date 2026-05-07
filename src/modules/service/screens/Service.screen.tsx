import type {NavigationProps} from '@/app/navigation/types'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
import {Screen} from '@/components/features/screen/Screen'
import {ServiceHeaderButton} from '@/modules/service/components/ServiceHeaderButton'
import {ServicePointView} from '@/modules/service/components/ServicePointView'
import {createBottomsheetVariants} from '@/modules/service/components/bottomsheet/bottomsheetVariants'
import {ServiceMapFiltersProvider} from '@/modules/service/providers/ServiceMapFiltersProvider'
import {ServiceRouteName} from '@/modules/service/routes'

type Props = NavigationProps<ServiceRouteName.map>

export const ServiceScreen = ({route}: Props) => (
  <MapViewSwitchProvider>
    <ServiceMapFiltersProvider serviceId={route.params.id}>
      <Screen
        bottomSheet={
          <BottomSheet
            scroll
            testID="ServiceScreenBottomSheet"
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
        testID="ServiceScreen"
        withBottomInset={false}>
        <ServicePointView id={route.params.id} />
      </Screen>
    </ServiceMapFiltersProvider>
  </MapViewSwitchProvider>
)
