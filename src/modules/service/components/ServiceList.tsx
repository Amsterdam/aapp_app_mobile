import {SimpleGrid} from 'react-native-super-grid'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {ServiceListItem} from '@/modules/service/components/ServiceListItem'
import {useServiceOverviewQuery} from '@/modules/service/service'

export const ServiceList = () => {
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
      keyExtractor={item => item.id}
      listKey="serviceMaps"
      maxItemsPerRow={2}
      renderItem={({item}) => <ServiceListItem {...item} />}
    />
  )
}
