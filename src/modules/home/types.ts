import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Permissions} from '@/types/permissions'

export type PermissionInstructionScreenParams = {
  iconName: SvgIconName
  paragraph: string
  permission: Permissions
  requestPermissionOnMount?: boolean
  screenTitle: string
  title: string
}
