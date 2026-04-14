import {SimpleGrid} from 'react-native-super-grid'
import type {RoutesAcceptingParams} from '@/app/navigation/types'
import type {Service, ServiceModuleSource} from '@/modules/service/types'
import type {Theme} from '@/themes/themes'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ServicesGridItem} from '@/modules/service/components/ServicesGridItem'
import {useServiceOverviewQuery} from '@/modules/service/service'

const MIN_WIDTH = 150

type Props = {
  background?: keyof Theme['color']['backgroundArea']
  detailsRouteName: RoutesAcceptingParams<Pick<Service, 'id' | 'title'>>
  source: ServiceModuleSource
}

export const ServicesGrid = ({detailsRouteName, source, background}: Props) => {
  const {
    data: serviceMaps,
    isLoading,
    isError,
  } = useServiceOverviewQuery(source)

  if (isLoading) {
    return <PleaseWait testID="ServiceListPleaseWait" />
  }

  if (!serviceMaps || isError) {
    return <SomethingWentWrong testID="ServiceListSomethingWentWrong" />
  }

  return (
    <SimpleGrid
      data={serviceMaps}
      itemDimension={MIN_WIDTH}
      keyExtractor={item => item.id}
      listKey="serviceMaps"
      renderItem={({item}) => (
        <ServicesGridItem
          {...item}
          background={background}
          detailsRouteName={detailsRouteName}
        />
      )}
    />
  )
}
