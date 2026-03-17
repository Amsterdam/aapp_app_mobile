import {
  ServiceDetailPropertyType,
  type ServiceFeatureProperty,
} from '@/modules/service/types'
import {formatNumber} from '@/utils/formatNumber'

export const formatPropertyValue = (
  type: ServiceDetailPropertyType,
  content: ServiceFeatureProperty['value'],
) => {
  if (
    type === ServiceDetailPropertyType.price &&
    content !== null &&
    !Number.isNaN(Number(content))
  ) {
    return Number(content) === 0
      ? 'Gratis'
      : formatNumber(Number(content), 'EUR')
  }

  return content
}
