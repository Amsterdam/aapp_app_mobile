import type {Address} from '@/modules/address/types'
import type {FeatureProperties} from '@/modules/service/types'
import {getLegendEntryTitle} from '@/modules/service/utils/getLegendEntryTitle'

describe('getLegendEntryTitle', () => {
  const baseProps: FeatureProperties = {
    aapp_title: 'Test Title',
    aapp_subtitle: 'Test Subtitle',
    aapp_icon_type: 'test_icon_type',
  }

  it('should return undefined if properties are undefined', () => {
    expect(getLegendEntryTitle()).toBeUndefined()
  })

  it('should return aapp_subtitle or aapp_title if state keys are not present or have no associated value', () => {
    const propertiesWithSubtitle = baseProps
    const propertiesWithOnlyTitle: FeatureProperties = {
      aapp_title: 'Test Title',
      aapp_icon_type: 'test_icon_type',
      aapp_malfunction: null,
    }

    expect(getLegendEntryTitle(propertiesWithSubtitle)).toBe('Test Subtitle')
    expect(getLegendEntryTitle(propertiesWithOnlyTitle)).toBe('Test Title')
  })

  it('should return a string value if an appropriate state key has a value', () => {
    const properties1 = {
      ...baseProps,
      aapp_malfunction: 'Tijdelijk buiten gebruik',
    }

    const properties2 = {
      ...baseProps,
      aapp_malfunction: 'Onbekende storing',
    }

    expect(getLegendEntryTitle(properties1)).toBe('Tijdelijk buiten gebruik')
    expect(getLegendEntryTitle(properties2)).toBe('Onbekende storing')
  })

  it('should not return a state value if an appropriate state key has a value but this value is not a string', () => {
    const properties = {
      ...baseProps,
      aapp_malfunction: {} as Address,
    }

    expect(getLegendEntryTitle(properties)).toBe('Test Subtitle')
  })
})
