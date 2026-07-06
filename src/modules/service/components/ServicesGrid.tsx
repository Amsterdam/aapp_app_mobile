import {useMemo} from 'react'
import {SimpleGrid} from 'react-native-super-grid'
import type {RoutesAcceptingParams} from '@/app/navigation/types'
import type {Service, ServiceModuleSource} from '@/modules/service/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {
  ServicesGridItem,
  type ServicesGridItemColors,
} from '@/modules/service/components/ServicesGridItem'
import {useServiceOverviewQuery} from '@/modules/service/service'

const MIN_WIDTH = 150

type Props = {
  /**
   * Allows for passing colors for the grid items.
   * @example 
  {background: 'kingsday', label: 'default'} // This sets the color of each item to 'kingsday' and icon/text color to 'default'.
   *
   * @example [
  {background: '#E50082', label: 'inverse'},
  {background: '#00ff80', label: 'cityPass'},
  {background: 'primary', label: 'inverse'},
  ] // This sets the color of each grid item separately and iteratively.
   */
  colors?: ServicesGridItemColors | Array<ServicesGridItemColors>
  detailsRouteName: RoutesAcceptingParams<Pick<Service, 'id' | 'title'>>
  source: ServiceModuleSource
}

export const ServicesGrid = ({detailsRouteName, source, colors}: Props) => {
  const {
    data: serviceMaps,
    isLoading,
    isError,
  } = useServiceOverviewQuery(source)

  const coloredServiceMaps = useMemo<
    undefined | Array<Service & {colors?: ServicesGridItemColors}>
  >(() => {
    if (!colors) {
      return serviceMaps
    }

    const colorsArray = Array.isArray(colors) ? colors : [colors]

    return serviceMaps?.map((map, index) => ({
      ...map,
      colors: colorsArray[index % colorsArray.length],
    }))
  }, [colors, serviceMaps])

  if (isLoading) {
    return <PleaseWait testID="ServiceListPleaseWait" />
  }

  if (!coloredServiceMaps || isError) {
    return <SomethingWentWrong testID="ServiceListSomethingWentWrong" />
  }

  return (
    <SimpleGrid
      data={coloredServiceMaps}
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
