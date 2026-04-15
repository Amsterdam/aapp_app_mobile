import type {ServiceMapResponseIcon} from '@/modules/service/types'
import {MapMarkerBase} from '@/components/features/map/marker/MarkerBase'
import {ServicePointCustomIcon} from '@/modules/service/components/ServicePointCustomIcon'

const ICON_SIZE = 24

/**
 * The MapMarkerBase wrapper has a viewbox of 0 0 40 40, so we need to offset the difference and center the icon inside the base.
 */
const MAP_MARKER_BASE_SIZE = 40

/**
 * The icon needs to sit centrally inside the upper part of the base pin, therefore we slightly offset on the Y axis
 */
const Y_OFFSET = 2

const OFFSET = {
  x: (MAP_MARKER_BASE_SIZE - ICON_SIZE) / 2,
  y: (MAP_MARKER_BASE_SIZE - ICON_SIZE) / 2 - Y_OFFSET,
}

export const ServicePointCustomMarker = ({
  icon,
}: {
  icon: ServiceMapResponseIcon
}) => (
  <ServicePointCustomIcon
    icon={icon}
    offset={OFFSET}
    testID="ServicePointCustomMarker"
    Wrapper={MapMarkerBase}
  />
)
