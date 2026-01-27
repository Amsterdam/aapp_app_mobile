import {MarkerVariant} from '@/components/features/map/marker/markers'

export const MARKER_IMAGES = {
  [MarkerVariant.distinctPin]: {uri: 'distinct_pin'},
  [MarkerVariant.electionsCrowdBusyPin]: {uri: 'elections_crowd_busy_pin'},
  [MarkerVariant.electionsCrowdCalmPin]: {uri: 'elections_crowd_calm_pin'},
  [MarkerVariant.electionsCrowdMediumPin]: {uri: 'elections_crowd_medium_pin'},
  [MarkerVariant.electionsCrowdUnknownPin]: {
    uri: 'elections_crowd_unknown_pin',
  },
  [MarkerVariant.pin]: {uri: 'pin'},
  [MarkerVariant.selectedPin]: {uri: 'selected_pin'},
} satisfies Record<MarkerVariant, {uri: string}>
