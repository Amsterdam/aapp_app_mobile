import type {MigrationManifest, PersistedState} from 'redux-persist'
import type {MarkerProperties} from '@/components/features/map/types'

export type ServiceState0 = {
  selectedServicePointId?: MarkerProperties['id']
} & NonNullable<PersistedState>

export const migrationManifest: MigrationManifest = {
  // Added in 1.30.0. The legacy selection has no service ID to associate it with.
  1: state =>
    state ? {...state, selectedServicePointId: undefined} : undefined,
}
