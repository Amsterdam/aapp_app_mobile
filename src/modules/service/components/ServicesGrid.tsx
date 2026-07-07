import {useMemo} from 'react'
import {SimpleGrid} from 'react-native-super-grid'
import type {RoutesAcceptingParams} from '@/app/navigation/types'
import type {Service, ServiceModuleSource} from '@/modules/service/types'
import type {Theme} from '@/themes/themes'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {
  ServicesGridItem,
  type ServicesGridItemColorScheme,
} from '@/modules/service/components/ServicesGridItem'
import {useServiceOverviewQuery} from '@/modules/service/service'
import {getServiceGridItemColors} from '@/modules/service/utils/getServiceGridItemColors'

const MIN_WIDTH = 150

type Props = {
  /**
   * Optional color scheme for the service tiles.
   *
   * - Pass a single color scheme to apply the same style to every tile.
   * - Pass an array of color schemes to cycle through them for each tile in order.
   * - Omit this prop to use the default styling from the service data.
   *
   * Supported values currently include: 'default', 'kingsday', and 'pride'.
   *
   * @example
   * <ServicesGrid
   *   detailsRouteName="ServiceDetails"
   *   source="home"
   *   colorScheme="pride"
   * />
   *
   * @example
   * <ServicesGrid
   *   detailsRouteName="ServiceDetails"
   *   source="home"
   *   colorScheme={['default', 'kingsday', 'pride']}
   * />
   *
   * @example
   * <ServicesGrid
   *   detailsRouteName="ServiceDetails"
   *   source="home"
   * />
   */
  colorScheme?: ServicesGridItemColorScheme | Array<ServicesGridItemColorScheme>
  detailsRouteName: RoutesAcceptingParams<Pick<Service, 'id' | 'title'>>
  source: ServiceModuleSource
}

export const ServicesGrid = ({
  detailsRouteName,
  source,
  colorScheme,
}: Props) => {
  const {
    data: serviceMaps,
    isLoading,
    isError,
  } = useServiceOverviewQuery(source)

  const coloredServiceMaps = useMemo<
    | undefined
    | Array<Service & {colorScheme?: keyof Theme['color']['serviceGrid']}>
  >(
    () => getServiceGridItemColors(serviceMaps, colorScheme),
    [serviceMaps, colorScheme],
  )

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
