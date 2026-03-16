import {ServiceDetailPropertyType} from '@/modules/service/types'
import {formatNumber} from '@/utils/formatNumber'

export const formatPropertyValue = (
  type: ServiceDetailPropertyType,
  content: string | number | null,
) => {
  if (
    type === ServiceDetailPropertyType.price &&
    content !== null &&
    !Number.isNaN(Number(content))
  ) {
    return formatNumber(Number(content), 'EUR')
  }

  return content
}
