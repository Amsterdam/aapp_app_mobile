import type {GeoJsonProperties} from 'geojson'
import {
  PermitZoneColorValue,
  type PermitZoneFeatureProperties,
} from '@/modules/parking/types'
import {baseColor} from '@/themes/tokens/base-color'

const PERMIT_ZONE_PROPERTIES: Record<
  PermitZoneFeatureProperties['fill'] | 'base',
  Partial<{label: string}> & GeoJsonProperties
> = {
  base: {
    /**
     * Used for the Rect in MapLegend
     */
    fillOpacity: 0.3,
    strokeWidth: 2,
    /**
     * Used for the Polygon on the Map
     */
    'fill-opacity': 0.3,
    'stroke-width': 2,
  },
  [PermitZoneColorValue.blue]: {
    label: 'Uw vergunningsgebied',
    fill: '#0075FF', // Custom blue color
    stroke: baseColor.primary.blue,
  },
  [PermitZoneColorValue.red]: {
    label: 'Uitzonderingsgebied',
    fill: baseColor.primary.red,
    stroke: baseColor.primary.red,
    /**
     * strokeDashArray (or lineDashPattern in MapPolygonProps) does not work in Google provided maps in Polygons or GeoJSON components.
     * @see https://github.com/react-native-maps/react-native-maps/blob/master/docs/polygon.md
     */
    strokeDasharray: [0],
  },
}

/**
 * Determines the style properties and label for the permit zone polygons and corresponding map legend items, based on fill value 'blue' (permit zone) or 'red' (exceptions), or returns the fill as fill and stroke if not 'blue' or 'red'.
 */
export const getPermitZoneFeatureProperties = (
  fill: PermitZoneFeatureProperties['fill'],
) => ({
  ...PERMIT_ZONE_PROPERTIES.base,
  ...(PERMIT_ZONE_PROPERTIES[fill] || {fill, stroke: fill}),
})
