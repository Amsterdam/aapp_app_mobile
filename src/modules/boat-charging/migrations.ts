import type {MigrationManifest, PersistedState} from 'redux-persist'
import type {BoatChargingState} from '@/modules/boat-charging/slice'

type BoatChargingState0 = BoatChargingState & {
  lastGuestSessionId?: string
}

export const migrationManifest: MigrationManifest = {
  // Added in 1.30.0.
  1: state => {
    if (!state) {
      return state
    }

    const {lastGuestSessionId, ...remainingState} =
      state as BoatChargingState0 & NonNullable<PersistedState>
    const guestSessionIds = new Set(remainingState.guestSessionIds ?? [])

    if (lastGuestSessionId !== undefined) {
      guestSessionIds.add(lastGuestSessionId)
    }

    return {
      ...remainingState,
      guestSessionIds: guestSessionIds.size
        ? Array.from(guestSessionIds)
        : undefined,
    }
  },
}
