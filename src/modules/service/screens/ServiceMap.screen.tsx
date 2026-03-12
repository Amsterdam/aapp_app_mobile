import type {NavigationProps} from '@/app/navigation/types'
import type {ServiceRouteName} from '@/modules/service/routes'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {ServiceDetails} from '@/modules/service/components/ServiceDetails'
import {ServiceMap} from '@/modules/service/components/ServiceMap'

type Props = NavigationProps<ServiceRouteName.map>

export const ServiceMapScreen = ({route}: Props) => (
  <Screen
    bottomSheet={
      <BottomSheet
        scroll
        testID="ServiceMapBottomSheet">
        <ServiceDetails />
      </BottomSheet>
    }
    headerOptions={{headerTitle: route.params.title}}
    testID="ServiceMapScreen"
    withBottomInset={false}>
    <ServiceMap id={route.params.id} />
  </Screen>
)
