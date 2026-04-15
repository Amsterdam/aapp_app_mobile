import type {Address} from '@/modules/address/types'
import {
  getAddressLine1,
  getAddressLine2,
} from '@/modules/address/utils/addDerivedAddressFields'
import {ServiceDetailPropertyType} from '@/modules/service/types'
import {formatNumber} from '@/utils/formatNumber'

export const formatPropertyValue = (
  type: ServiceDetailPropertyType,
  content: string | number | Address | null | undefined | boolean,
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

  if (
    type === ServiceDetailPropertyType.address &&
    content !== null &&
    typeof content === 'object'
  ) {
    return `${getAddressLine1(content)}\n${getAddressLine2(content)}`
  }

  return content as string | number
}
