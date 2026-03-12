import type {NavigationProps} from '@/app/navigation/types'
import type {ServiceRouteName} from '@/modules/service/routes'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {ServiceMap} from '@/modules/service/components/ServiceMap'
import {ServicePointDetails} from '@/modules/service/components/ServicePointDetails'

type Props = NavigationProps<ServiceRouteName.map>

export const ServiceScreen = ({route}: Props) => (
  <Screen
    bottomSheet={
      <BottomSheet
        scroll
        testID="ServiceMapBottomSheet">
        <ServicePointDetails id={route.params.id} />
      </BottomSheet>
    }
    headerOptions={{headerTitle: route.params.title}}
    scroll={false}
    testID="ServiceMapScreen"
    withBottomInset={false}>
    <ServiceMap id={route.params.id} />
  </Screen>
)
