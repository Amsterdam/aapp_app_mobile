import {TurboModuleRegistry, type TurboModule} from 'react-native'

export type LiveUpdateState = {
  message?: string
  progress?: number
  title: string
}

export type LiveUpdateConfig = {
  timeout?: number
}

export interface Spec extends TurboModule {
  startLiveUpdate(
    state: LiveUpdateState,
    config?: LiveUpdateConfig,
  ): number | undefined
}

export default TurboModuleRegistry.getEnforcing<Spec>('LiveUpdates')
