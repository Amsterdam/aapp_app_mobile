import type {ImageProps} from '@/components/ui/media/Image'
import {PermissionInstructionScreenParams} from '@/modules/home/types'

export enum HomeRouteName {
  admin = 'Admin',
  home = 'Home',
}

export type ModuleStackParams = {
  [HomeRouteName.admin]: undefined
  [HomeRouteName.home]: undefined
}

export enum HomeModalName {
  imageViewer = 'ImageViewer',
  permissionInstructions = 'PermissionInstructions',
}

export type HomeModalParams = {
  [HomeModalName.permissionInstructions]: PermissionInstructionScreenParams
  [HomeModalName.imageViewer]: Pick<
    ImageProps,
    'source' | 'testID' | 'aspectRatio' | 'alt'
  >
}
