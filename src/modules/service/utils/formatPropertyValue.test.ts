import {ServiceDetailPropertyType} from '@/modules/service/types'
import {formatPropertyValue} from '@/modules/service/utils/formatPropertyValue'

describe('formatPropertyValue', () => {
  it('returns the base value unchanged when type is not price.', () => {
    const valueString = formatPropertyValue(
      ServiceDetailPropertyType.string,
      'test',
    )
    const valueImage = formatPropertyValue(
      ServiceDetailPropertyType.image,
      'test',
    )

    expect(valueString).toBe('test')
    expect(valueImage).toBe('test')
  })

  it('returns null is the base value null.', () => {
    const valueString = formatPropertyValue(
      ServiceDetailPropertyType.string,
      null,
    )
    const valuePrice = formatPropertyValue(
      ServiceDetailPropertyType.price,
      null,
    )
    const valueImage = formatPropertyValue(
      ServiceDetailPropertyType.image,
      null,
    )

    expect(valueString).toBe(null)
    expect(valuePrice).toBe(null)
    expect(valueImage).toBe(null)
  })

  it('returns the base value formatted as price when type is price and base value is number.', () => {
    const valueString = formatPropertyValue(
      ServiceDetailPropertyType.price,
      'test',
    )
    const valueNull = formatPropertyValue(ServiceDetailPropertyType.price, null)

    const valueNumber1 = formatPropertyValue(
      ServiceDetailPropertyType.price,
      '0.5',
    )
    const valueNumber2 = formatPropertyValue(ServiceDetailPropertyType.price, 0)
    const valueNumber3 = formatPropertyValue(
      ServiceDetailPropertyType.price,
      99999999,
    )

    expect(valueString).toBe('test')
    expect(valueNull).toBe(null)
    expect(valueNumber1).toBe('€ 0.50')
    expect(valueNumber2).toBe('€ 0.00')
    expect(valueNumber3).toBe('€ 99999999.00')
  })
})
