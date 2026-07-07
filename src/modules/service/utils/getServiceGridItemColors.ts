import type {ServicesGridItemColorScheme} from '@/modules/service/components/ServicesGridItem'
import type {Service} from '@/modules/service/types'

export const getServiceGridItemColors = (
  serviceMaps: Service[] | undefined,
  colorScheme?:
    | ServicesGridItemColorScheme
    | Array<ServicesGridItemColorScheme>,
): undefined | Array<Service & {colorScheme?: ServicesGridItemColorScheme}> => {
  if (!colorScheme || (Array.isArray(colorScheme) && !colorScheme.length)) {
    return serviceMaps
  }

  const colorsArray = Array.isArray(colorScheme) ? colorScheme : [colorScheme]

  return serviceMaps?.map((map, index) => ({
    ...map,
    colorScheme: colorsArray[index % colorsArray.length],
  }))
}
