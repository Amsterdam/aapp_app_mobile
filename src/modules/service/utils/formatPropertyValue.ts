import {ServiceDetailPropertyType} from '@/modules/service/types'

export const formatPropertyValue = (
  type: ServiceDetailPropertyType,
  content: string | number | null,
) => {
  if (
    type === ServiceDetailPropertyType.price &&
    content !== null &&
    !Number.isNaN(Number(content))
  ) {
    return `€ ${Number(content).toFixed(2)}`
  }

  return content
}
