import type {NavigationProps} from '@/app/navigation/types'
import type {KingsdayRouteName} from '@/modules/kingsday/routes'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
import {Screen} from '@/components/features/screen/Screen'
import {ServiceHeaderButton} from '@/modules/service/components/ServiceHeaderButton'
import {ServicePointDetails} from '@/modules/service/components/ServicePointDetails'
import {ServicePointView} from '@/modules/service/components/ServicePointView'

type Props = NavigationProps<KingsdayRouteName.details>

export const KingsdayDetailsScreen = ({route}: Props) => (
  <MapViewSwitchProvider>
    <Screen
      bottomSheet={
        <BottomSheet
          scroll
          testID="KingsdayScreenBottomSheet">
          <ServicePointDetails id={route.params.id} />
        </BottomSheet>
      }
      headerOptions={{
        disableHorizontalInsets: true,
        headerTitle: route.params.title,
        SideComponent: ServiceHeaderButton,
      }}
      scroll={false}
      testID="KingsdayDetailsScreen"
      withBottomInset={false}>
      <ServicePointView id={route.params.id} />
    </Screen>
  </MapViewSwitchProvider>
)
