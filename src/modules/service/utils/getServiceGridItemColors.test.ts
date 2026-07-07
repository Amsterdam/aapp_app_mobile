import type {Service} from '@/modules/service/types'
import {getServiceGridItemColors} from '@/modules/service/utils/getServiceGridItemColors'

describe('getServiceGridItemColors', () => {
  const serviceGridItems: Service[] = [
    {icon: '', id: '123', title: 'test1'},
    {icon: '', id: '234', title: 'test2'},
  ]

  it('should return undefined if no service grid items are provided', () => {
    expect(getServiceGridItemColors(undefined)).toBeUndefined()
    expect(getServiceGridItemColors(undefined, 'kingsday')).toBeUndefined()
    expect(
      getServiceGridItemColors(undefined, ['kingsday', 'default', 'pride']),
    ).toBeUndefined()
  })

  it('should return undefined colorSchemes if no colorScheme prop is provided', () => {
    expect(getServiceGridItemColors([], undefined)).toEqual([])
    expect(getServiceGridItemColors(serviceGridItems, undefined)).toEqual(
      serviceGridItems,
    )
  })

  it('should return the same colorScheme for all items if a single colorScheme is provided', () => {
    const colors: Parameters<typeof getServiceGridItemColors>['1'] = 'pride'

    getServiceGridItemColors(serviceGridItems, colors)?.forEach(item => {
      expect(item.colorScheme).toBeDefined()
      expect(item.colorScheme).toEqual('pride')
    })
  })

  it('should return a different colorScheme for each item cyclically if an array of colorSchemes is provided.', () => {
    const colors: Parameters<typeof getServiceGridItemColors>['1'] = [
      'pride',
      'kingsday',
      'pride',
    ]

    const coloredServiceGridItems = getServiceGridItemColors(
      [...serviceGridItems, ...serviceGridItems, ...serviceGridItems],
      colors,
    )

    void colors.forEach(scheme => {
      expect(
        coloredServiceGridItems?.some(item => item.colorScheme === scheme),
      ).toBeTruthy()
    })

    coloredServiceGridItems?.forEach((item, index) => {
      expect(item.colorScheme).toBeDefined()

      expect(
        coloredServiceGridItems?.[index].colorScheme ===
          coloredServiceGridItems?.[index % colors.length].colorScheme,
      ).toBeTruthy()
    })
  })
})
