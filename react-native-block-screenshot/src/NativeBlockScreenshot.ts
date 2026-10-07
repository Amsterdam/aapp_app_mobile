import {TurboModuleRegistry} from 'react-native'
import type {TurboModule} from 'react-native'
import type {EventEmitter} from 'react-native/Libraries/Types/CodegenTypes'

export interface ImageResolvedAssetSource {
  height: number
  scale: number
  uri: string
  width: number
}

export interface Spec extends TurboModule {
  addListener: (eventName: string) => void
  disableBlockScreenshot: () => void
  enableBlockScreenshot: (params: {
    backgroundColor: number
    scale: number
    source?: ImageResolvedAssetSource
  }) => void
  readonly onScreenshot: EventEmitter<void>
  removeListeners: (count: number) => void
}

export default TurboModuleRegistry.getEnforcing<Spec>('BlockScreenshot')
