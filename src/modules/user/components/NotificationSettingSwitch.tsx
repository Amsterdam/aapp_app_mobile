import {useCallback, type ReactNode} from 'react'
import type {ModuleSlug} from '@/modules/slugs'
import type {NotificationType} from '@/modules/user/types'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Phrase} from '@/components/ui/text/Phrase'
import {
  useDeleteDisabledPushModuleMutation,
  useAddDisabledPushTypeMutation,
  useDeleteDisabledPushTypeMutation,
} from '@/modules/user/service'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  isDisabled: boolean
  module: ModuleSlug
  title: string
  type: NotificationType
  value?: boolean
}

export const NotificationSettingSwitch = ({
  type: {type, description},
  title,
  module,
  isDisabled,
  value,
}: Props) => {
  const [deleteDisabledPushModule, {isLoading: isLoadingEnable}] =
    useDeleteDisabledPushModuleMutation()
  const [addDisabledPushType, {isLoading: isLoadingTypeDisable}] =
    useAddDisabledPushTypeMutation()
  const [deleteDisabledPushType, {isLoading: isLoadingTypeEnable}] =
    useDeleteDisabledPushTypeMutation()

  const isLoading =
    isLoadingEnable || isLoadingTypeDisable || isLoadingTypeEnable

  const onChangeType = useCallback(
    (newValue: boolean) => {
      if (isLoading) {
        return
      }

      if (newValue) {
        void addDisabledPushType(type)
      } else {
        void deleteDisabledPushType(type)
        void deleteDisabledPushModule(module)
      }
    },
    [
      isLoading,
      addDisabledPushType,
      type,
      deleteDisabledPushType,
      deleteDisabledPushModule,
      module,
    ],
  )

  return (
    <Switch
      accessibilityLabel={`Melding "${accessibleText(title, description)}" staat ${isDisabled ? 'uit' : 'aan'}`}
      disabled={isLoading}
      key={type}
      label={<Phrase>{description}</Phrase>}
      onChange={() => onChangeType(!!value)}
      testID={`NotificationSetting${module}Switch`}
      value={value}
      wrapper={SwitchWrapper}
    />
  )
}

type SwitchWrapperProps = {
  children: ReactNode
}

const SwitchWrapper = ({children}: SwitchWrapperProps) => (
  <Box
    insetHorizontal="md"
    insetVertical="sm"
    variant="distinct">
    {children}
  </Box>
)
