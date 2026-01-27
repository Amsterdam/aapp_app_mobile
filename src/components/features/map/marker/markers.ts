export enum MarkerVariant {
  distinctPin = 'distinctPin',
  electionsCrowdBusyPin = 'electionsCrowdBusyPin',
  electionsCrowdCalmPin = 'electionsCrowdCalmPin',
  electionsCrowdMediumPin = 'electionsCrowdMediumPin',
  electionsCrowdUnknownPin = 'electionsCrowdUnknownPin',
  pin = 'pin',
  selectedPin = 'selectedPin',
}

export const MARKER_IMAGES: Record<MarkerVariant, {uri: string} | undefined> = {
  [MarkerVariant.pin]: {uri: 'pin'},
  [MarkerVariant.selectedPin]: {uri: 'selected_pin'},
  [MarkerVariant.distinctPin]: {uri: 'distinct_pin'},
  [MarkerVariant.electionsCrowdCalmPin]: {uri: 'elections_crowd_calm_pin'},
  [MarkerVariant.electionsCrowdMediumPin]: {uri: 'elections_crowd_medium_pin'},
  [MarkerVariant.electionsCrowdBusyPin]: {uri: 'elections_crowd_busy_pin'},
  [MarkerVariant.electionsCrowdUnknownPin]: {
    uri: 'elections_crowd_unknown_pin',
  },
}
