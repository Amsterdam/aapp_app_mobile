import type {Address, LocationType} from '@/modules/address/types'
import {
  getAddressSwitchAccessibilityLabel,
  getAddressSwitchIcon,
  getAddressSwitchLabel,
} from '@/modules/address/utils/getAddressSwitchProps'

describe('getAddressSwitchProps', () => {
  test('should return a loading state when location is being fetched.', () => {
    const locationType: LocationType = 'location'
    const address = undefined
    const isFetching = true

    const icon = getAddressSwitchIcon(locationType, address, isFetching)
    const label = getAddressSwitchLabel(locationType, address, isFetching)
    const accessibilityLabel = getAddressSwitchAccessibilityLabel(
      locationType,
      address,
      isFetching,
    )

    expect(icon).toBe('spinner')
    expect(label).toBe('Mijn huidige locatie')
    expect(accessibilityLabel).toBe(
      'Mijn huidige locatie, Druk om adres te wijzigen.',
    )
  })

  test('should return current location and gps-ios icon when locationType is location and location is fetched.', () => {
    const locationType: LocationType = 'location'
    const address: Pick<Address, 'addressLine1'> = {
      addressLine1: 'Cruquiusweg 5',
    }
    const isFetching = false

    const icon = getAddressSwitchIcon(
      locationType,
      address as Address,
      isFetching,
    )
    const label = getAddressSwitchLabel(
      locationType,
      address as Address,
      isFetching,
    )
    const accessibilityLabel = getAddressSwitchAccessibilityLabel(
      locationType,
      address as Address,
      isFetching,
    )

    expect(icon).toBe('gps-ios_filled')
    expect(label).toBe('Cruquiusweg 5')
    expect(accessibilityLabel).toBe(
      'Cruquiusweg 5, Adres bij uw huidige locatie, Druk om adres te wijzigen.',
    )
  })

  test('should return my address and house icon when locationType is address and user has entered an address that is similar to myAddress.', () => {
    const locationType: LocationType = 'address'
    const address: Pick<Address, 'addressLine1'> = {
      addressLine1: 'Cruquiusweg 5',
    }
    const isFetching = false

    const icon = getAddressSwitchIcon(
      locationType,
      address as Address,
      isFetching,
    )
    const label = getAddressSwitchLabel(
      locationType,
      address as Address,
      isFetching,
    )
    const accessibilityLabel = getAddressSwitchAccessibilityLabel(
      locationType,
      address as Address,
      isFetching,
    )

    expect(icon).toBe('house')
    expect(label).toBe('Cruquiusweg 5')
    expect(accessibilityLabel).toBe(
      'Cruquiusweg 5, Mijn adres, Druk om adres te wijzigen.',
    )
  })

  test('should return an address and location icon when locationType is address and user has entered an address that is different from myAddress.', () => {
    const locationType: LocationType = 'address'
    const address: Pick<Address, 'addressLine1'> = {
      addressLine1: 'Cruquiusweg 5',
    }
    const isFetching = false

    const icon = getAddressSwitchIcon(
      locationType,
      address as Address,
      isFetching,
    )
    const label = getAddressSwitchLabel(
      locationType,
      address as Address,
      isFetching,
    )
    const accessibilityLabel = getAddressSwitchAccessibilityLabel(
      locationType,
      address as Address,
      isFetching,
    )

    expect(icon).toBe('house')
    expect(label).toBe('Cruquiusweg 5')
    expect(accessibilityLabel).toBe(
      'Cruquiusweg 5, Mijn adres, Druk om adres te wijzigen.',
    )
  })

  test('should return location icon and placeholder text when locationType is address and user has not entered address nor has myAddress set.', () => {
    const locationType: LocationType = 'address'
    const address = undefined
    const isFetching = false

    const icon = getAddressSwitchIcon(locationType, address, isFetching)
    const label = getAddressSwitchLabel(locationType, address, isFetching)
    const accessibilityLabel = getAddressSwitchAccessibilityLabel(
      locationType,
      address,
      isFetching,
    )

    expect(icon).toBe('map-marker')
    expect(label).toBe('Adres invullen')
    expect(accessibilityLabel).toBe(
      'Adres invullen, Druk om adres te wijzigen.',
    )
  })
})
