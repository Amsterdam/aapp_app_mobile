import type {TestProps} from '@/components/ui/types'
import type {ComponentProps} from 'react'
import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import {MapMarkerBase} from '@/components/features/map/marker/MarkerBase'

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

export const CustomMarker = ({
  icon,
  testID,
}: {
  icon: ComponentProps<typeof CustomMarkerIcon>['icon']
} & TestProps) => (
  <CustomMarkerIcon
    icon={icon}
    offset={OFFSET}
    size={ICON_SIZE}
    testID={`${testID}CustomMarker`}
    Wrapper={MapMarkerBase}
  />
)
