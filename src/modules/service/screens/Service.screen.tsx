import type {NavigationProps} from '@/app/navigation/types'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
import {Screen} from '@/components/features/screen/Screen'
import {ServiceHeaderButton} from '@/modules/service/components/ServiceHeaderButton'
import {ServicePointDetails} from '@/modules/service/components/ServicePointDetails'
import {ServicePointView} from '@/modules/service/components/ServicePointView'
import {ServiceRouteName} from '@/modules/service/routes'

type Props = NavigationProps<ServiceRouteName.map>

export const ServiceScreen = ({route}: Props) => (
  <MapViewSwitchProvider>
    <Screen
      bottomSheet={
        <BottomSheet
          scroll
          testID="ServiceScreenBottomSheet">
          <ServicePointDetails id={route.params.id} />
        </BottomSheet>
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
  </MapViewSwitchProvider>
)
