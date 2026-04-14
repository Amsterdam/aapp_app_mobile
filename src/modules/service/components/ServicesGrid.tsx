import {SimpleGrid} from 'react-native-super-grid'
import type {RoutesAcceptingParams} from '@/app/navigation/types'
import type {Service} from '@/modules/service/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ServicesGridItem} from '@/modules/service/components/ServicesGridItem'
import {useServiceOverviewQuery} from '@/modules/service/service'

const MIN_WIDTH = 150

type Props = {
  detailsRouteName: RoutesAcceptingParams<Pick<Service, 'id' | 'title'>>
}

export const ServicesGrid = ({detailsRouteName}: Props) => {
  const {data: serviceMaps, isLoading, isError} = useServiceOverviewQuery()

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
          detailsRouteName={detailsRouteName}
        />
      )}
    />
  )
}
