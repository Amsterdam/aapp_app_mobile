import type {ImageProps} from '@/components/ui/media/Image'
import type {PermissionInstructionScreenParams} from '@/modules/home/types'

export enum HomeRouteName {
  admin = 'Admin',
  home = 'Home',
  imageViewer = 'ImageViewer',
}

export type ModuleStackParams = {
  [HomeRouteName.admin]: undefined
  [HomeRouteName.home]: undefined
  [HomeRouteName.imageViewer]: Pick<
    ImageProps,
    'source' | 'testID' | 'aspectRatio' | 'alt'
  >
}

export enum HomeModalName {
  permissionInstructions = 'PermissionInstructions',
}

export type ModuleModalParams = {
  [HomeModalName.permissionInstructions]: PermissionInstructionScreenParams
}
