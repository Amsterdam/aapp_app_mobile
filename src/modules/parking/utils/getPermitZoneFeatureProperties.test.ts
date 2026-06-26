import {getPermitZoneFeatureProperties} from '@/modules/parking/utils/getPermitZoneFeatureProperties'
import {baseColor} from '@/themes/tokens/base-color'

const BASE = {
  strokeWidth: 2,
  'stroke-width': 2,
  fillOpacity: 0.3,
  'fill-opacity': 0.3,
  strokeDashArray: undefined,
}

describe('getPermitZoneFeatureProperties', () => {
  it("should return the properties associated with blue if fill is 'blue'.", () => {
    const {label, ...properties} = getPermitZoneFeatureProperties('blue')

    expect(label).toBe('Uw vergunningsgebied')
    expect(properties).toEqual({
      ...BASE,
      fill: '#0075FF',
      stroke: baseColor.primary.blue,
    })
  })

  it("should return the properties associated with red if fill is 'red'.", () => {
    const {label, ...properties} = getPermitZoneFeatureProperties('red')

    expect(label).toBe('Uitzonderingsgebied')
    expect(properties).toEqual({
      ...BASE,
      fill: baseColor.primary.red,
      stroke: baseColor.primary.red,
      strokeDasharray: [0],
    })
  })

  it.each(['#e95625', '#e925b5', '#25e925', undefined])(
    'should return base properties and stroke/fill as %i.',
    fillColor => {
      const {label, ...properties} = getPermitZoneFeatureProperties(
        fillColor as 'blue' | 'red',
      )

      if (fillColor === undefined) {
        expect(properties.fill).toBeUndefined()
        expect(properties.stroke).toBeUndefined()
      }

      expect(label).toBeUndefined()

      expect(properties).toEqual({
        ...BASE,
        fill: fillColor,
        stroke: fillColor,
      })
    },
  )
})
