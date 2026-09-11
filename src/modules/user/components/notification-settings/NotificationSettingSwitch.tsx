import {useCallback, useState, type ReactNode} from 'react'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import type {NotificationType} from '@/modules/user/types'
import {Box} from '@/components/ui/containers/Box'
import {Notice} from '@/components/ui/feedback/Notice'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {
  NOTIFICATION_ON_ERROR_MESSAGE,
  NOTIFICATION_OFF_ERROR_MESSAGE,
} from '@/constants/notifications'
import {
  useDeleteDisabledPushModuleMutation,
  useAddDisabledPushTypeMutation,
  useDeleteDisabledPushTypeMutation,
} from '@/modules/user/service'

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

  const [error, setError] = useState<string | undefined>(undefined)

  const onChangeType = useCallback(
    (newValue: boolean) => {
      setError(undefined)

      if (isLoading) {
        return
      }

      if (newValue) {
        void addDisabledPushType(type)
          .unwrap()
          .catch(() => {
            setError(NOTIFICATION_OFF_ERROR_MESSAGE)
          })
      } else {
        void deleteDisabledPushType(type)
          .unwrap()
          .catch(() => {
            setError(NOTIFICATION_ON_ERROR_MESSAGE)
          })
        void deleteDisabledPushModule(module)
          .unwrap()
          .catch(() => {
            setError(NOTIFICATION_ON_ERROR_MESSAGE)
          })
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
    <Column gutter="smd">
      <Switch
        accessibilityLabel={`Meldingen voor onderwerp ${title} ${description} staan ${isDisabled ? 'uit' : 'aan'}`}
        disabled={isLoading}
        hasLoadingPlaceholder
        key={type}
        label={<Phrase>{description}</Phrase>}
        loading={isLoading}
        onChange={() => onChangeType(!!value)}
        testID={`NotificationSetting${module}Switch`}
        value={value}
        wrapper={SwitchWrapper}
      />
      {!!error && (
        <Notice
          text={error}
          variant="negative"
        />
      )}
    </Column>
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
