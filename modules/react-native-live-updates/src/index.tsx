import LiveUpdates, {
  type LiveUpdateConfig,
  type LiveUpdateState,
} from './NativeLiveUpdates'

export const startLiveUpdate = (
  state: LiveUpdateState,
  config: LiveUpdateConfig,
): number | undefined => LiveUpdates.startLiveUpdate(state, config)
