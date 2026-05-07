import type {
  FeatureProperties,
  PropertiesPropertyValue,
} from '@/modules/service/types'

/**
 * This set contains various keys that identify service states that take precedence in the legend entry naming over aapp_title and aapp_subtitle
 */
const SERVICE_STATE_KEYS = new Set(['aapp_malfunction'])

const propIsString = (value: PropertiesPropertyValue): value is string =>
  typeof value === 'string'

/**
 * Returns the label for the legend entry, prioritizing entry state (malfunction, etc.) over category or title
 * @param properties FeatureProperties
 * @returns
 */
export const getLegendEntryLabel = (properties?: FeatureProperties) => {
  if (!properties) return

  const [, serviceStateValue] =
    Object.entries(properties).find(
      ([propKey, propValue]) =>
        SERVICE_STATE_KEYS.has(propKey) && Boolean(propValue),
    ) || []

  return (
    (propIsString(serviceStateValue) && serviceStateValue) ||
    properties?.aapp_subtitle ||
    properties?.aapp_title
  )
}
