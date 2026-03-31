import {SimpleGrid} from 'react-native-super-grid'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {SportsCategoriesGridItem} from '@/modules/sport/components/SportsCategoriesGridItem'

const MIN_WIDTH = 150

const mockData = [
  {
    id: '1',
    title: 'Zwemmen',
    icon: 'M15.1221 6.12282L12.5542 2.8565L6.95374 7.46821L7.95463 12.9731L5.90262 14.7146C5.21938 14.733 4.54011 14.9399 3.94632 15.3351L2.44409 16.3351L3.55235 18L5.05458 17C5.62885 16.6177 6.37652 16.6177 6.95079 17C8.19634 17.8291 9.81797 17.8291 11.0635 17C11.6371 16.6182 12.3864 16.6184 12.9614 17.0011C14.2042 17.8284 15.8249 17.8305 17.0691 17.0022C17.6435 16.6199 18.3916 16.6215 18.9644 17.0062L20.4406 17.9977L21.5558 16.3374L20.0796 15.3459C18.8349 14.5099 17.209 14.5065 15.9608 15.3374C15.7799 15.4578 15.5814 15.5401 15.3765 15.5842L12.0633 11.6398L11.5693 9.17835L15.1221 6.12282ZM19.3284 13.4953C18.0196 14.6704 16.006 14.5621 14.8309 13.2533C13.6558 11.9445 13.7642 9.93089 15.073 8.75579C16.3818 7.5807 18.3954 7.68907 19.5705 8.99786C20.7456 10.3067 20.6372 12.3202 19.3284 13.4953ZM6.95079 20.5C6.37652 20.1177 5.62885 20.1177 5.05458 20.5L3.55235 21.5L2.44409 19.8351L3.94632 18.8351C5.19187 18.006 6.81351 18.006 8.05905 18.8351C8.63332 19.2174 9.38099 19.2174 9.95526 18.8351C11.2015 18.0055 12.8248 18.0076 14.0697 18.8363C14.6426 19.2177 15.3893 19.2178 15.9608 18.8374C17.209 18.0065 18.8349 18.0099 20.0796 18.8459L21.5558 19.8374L20.4406 21.4977L18.9644 20.5062C18.3916 20.1215 17.6435 20.1199 17.0691 20.5022C15.8249 21.3305 14.2042 21.3284 12.9614 20.5011C12.3864 20.1184 11.6371 20.1182 11.0635 20.5C9.81797 21.3291 8.19634 21.3291 6.95079 20.5Z',
  },
]

export const SportsCategoriesGrid = () => {
  const {
    data: sports,
    isLoading,
    isError,
  }: {data: typeof mockData; isError: boolean; isLoading: boolean} = {
    data: mockData,
    isLoading: false,
    isError: false,
  }

  if (isLoading) {
    return <PleaseWait testID="SportsCategoriesGridPleaseWait" />
  }

  if (!sports || isError) {
    return (
      <SomethingWentWrong testID="SportsCategoriesGridSomethingWentWrong" />
    )
  }

  return (
    <SimpleGrid
      data={sports}
      itemDimension={MIN_WIDTH}
      keyExtractor={item => item.id}
      listKey="serviceMaps"
      renderItem={({item}) => <SportsCategoriesGridItem {...item} />}
    />
  )
}
