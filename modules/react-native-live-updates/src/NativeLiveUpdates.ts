import {TurboModuleRegistry, type TurboModule} from 'react-native'

export type LiveUpdateImage = {
  isRemote: boolean
  url: string
}

export type LiveUpdateProgressPoint = {
  color?: string
  position: number
}

export type LiveUpdateProgressSegment = {
  color?: string
  length: number
}

export type LiveUpdateProgress = {
  indeterminate?: boolean
  max?: number
  points?: LiveUpdateProgressPoint[]
  progress?: number
  segments?: LiveUpdateProgressSegment[]
}

export type LiveUpdateState = {
  icon?: LiveUpdateImage
  image?: LiveUpdateImage
  progress?: LiveUpdateProgress
  shortCriticalText?: string
  showTime?: boolean
  subText?: string
  text?: string
  time?: number
  title: string
}

export type LiveUpdateConfig = {
  channelId: string
  deepLinkUrl?: string
  iconBackgroundColor?: string
}

export interface Spec extends TurboModule {
  startLiveUpdate(
    state: LiveUpdateState,
    config: LiveUpdateConfig,
  ): number | undefined
}

export default TurboModuleRegistry.getEnforcing<Spec>('LiveUpdates')
