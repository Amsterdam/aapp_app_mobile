import type {ReactNode} from 'react'
import {MapMarkerDistinctPin} from '@/components/features/map/marker/DistinctPin'
import {MapMarkerElectionsCrowdBusyPin} from '@/components/features/map/marker/ElectionsCrowdBusyPin'
import {MapMarkerElectionsCrowdCalmPin} from '@/components/features/map/marker/ElectionsCrowdCalmPin'
import {MapMarkerElectionsCrowdMediumPin} from '@/components/features/map/marker/ElectionsCrowdMediumPin'
import {MapMarkerElectionsCrowdUnknownPin} from '@/components/features/map/marker/ElectionsCrowdUnknownPin'
import {MapMarkerPin} from '@/components/features/map/marker/Pin'
import {MapMarkerSelectedPin} from '@/components/features/map/marker/SelectedPin'

export enum MapMarkerVariant {
  distinctPin = 'distinctPin',
  electionsCrowdBusyPin = 'electionsCrowdBusyPin',
  electionsCrowdCalmPin = 'electionsCrowdCalmPin',
  electionsCrowdMediumPin = 'electionsCrowdMediumPin',
  electionsCrowdUnknownPin = 'electionsCrowdUnknownPin',
  pin = 'pin',
  selectedPin = 'selectedPin',
}

export const MapMarkerVariants: Record<MapMarkerVariant, ReactNode> = {
  [MapMarkerVariant.distinctPin]: <MapMarkerDistinctPin />,
  [MapMarkerVariant.electionsCrowdBusyPin]: <MapMarkerElectionsCrowdBusyPin />,
  [MapMarkerVariant.electionsCrowdCalmPin]: <MapMarkerElectionsCrowdCalmPin />,
  [MapMarkerVariant.electionsCrowdMediumPin]: (
    <MapMarkerElectionsCrowdMediumPin />
  ),
  [MapMarkerVariant.electionsCrowdUnknownPin]: (
    <MapMarkerElectionsCrowdUnknownPin />
  ),
  [MapMarkerVariant.pin]: <MapMarkerPin />,
  [MapMarkerVariant.selectedPin]: <MapMarkerSelectedPin />,
}
