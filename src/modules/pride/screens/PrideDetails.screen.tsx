import type {NavigationProps} from '@/app/navigation/types'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {MapViewSwitchProvider} from '@/components/features/map/providers/MapViewSwitchProvider'
import {MapFocus} from '@/components/features/map/types'
import {Screen} from '@/components/features/screen/Screen'
import {usePrideEvents} from '@/modules/pride/hooks/usePrideEvents'
import {PrideRouteName} from '@/modules/pride/routes'
import {ServiceHeaderButton} from '@/modules/service/components/ServiceHeaderButton'
import {ServicePointView} from '@/modules/service/components/ServicePointView'
import {createBottomsheetVariants} from '@/modules/service/components/bottomsheet/bottomsheetVariants'
import {ServiceMapFiltersProvider} from '@/modules/service/providers/ServiceMapFiltersProvider'

type Props = NavigationProps<PrideRouteName.details>

export const PrideDetailsScreen = ({route}: Props) => {
  usePrideEvents()

  return (
    <MapViewSwitchProvider>
      <ServiceMapFiltersProvider serviceId={route.params.id}>
        <Screen
          bottomSheet={
            <BottomSheet
              scroll
              testID="PrideDetailsScreenBottomSheet"
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
          testID="PrideDetailsScreen"
          withBottomInset={false}>
          <ServicePointView
            focusType={MapFocus.amsterdam}
            id={route.params.id}
          />
        </Screen>
      </ServiceMapFiltersProvider>
    </MapViewSwitchProvider>
  )
}
