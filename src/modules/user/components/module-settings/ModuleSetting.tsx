import {useCallback} from 'react'
import {Switch} from '@/components/ui/forms/Switch'
import {type TestProps} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {moduleIcons} from '@/modules/generated/moduleIcons.generated'
import {Module, ModuleStatus} from '@/modules/types'
import {
  ModuleSettingBox,
  type ModuleSettingBoxProps,
} from '@/modules/user/components/module-settings/ModuleSettingBox'
import {
  ModuleSettingInfo,
  type ModuleSettingInfoProps,
} from '@/modules/user/components/module-settings/ModuleSettingInfo'
import {useLogoutWithAlert} from '@/modules/user/hooks/module-settings/useLogoutWithAlert'
import {
  useAddDisabledPushModuleMutation,
  useDeleteDisabledPushModuleMutation,
} from '@/modules/user/service'
import {
  selectDisabledModules,
  toggleModuleDisabled,
} from '@/store/slices/modules'

type Props = {
  module: Module
} & TestProps

export const ModuleSetting = ({
  module: {description, iconPath, slug, status, title, moduleTitleColor},
  testID,
}: Props) => {
  const dispatch = useDispatch()
  const disabledModules = useSelector(selectDisabledModules)
  const logoutWithAlert = useLogoutWithAlert(slug, title)

  const isModuleActive = status === ModuleStatus.active
  const CustomIcon = moduleIcons[slug as keyof typeof moduleIcons]

  const iconProps = CustomIcon
    ? {Icon: <CustomIcon />}
    : ({iconPath} satisfies Partial<ModuleSettingInfoProps>)

  const isDisabled = disabledModules?.includes(slug)

  const [addDisabledPushModule] = useAddDisabledPushModuleMutation()
  const [deleteDisabledPushModule] = useDeleteDisabledPushModuleMutation()

  const onChange = () => {
    void logoutWithAlert().then(() => {
      dispatch(toggleModuleDisabled(slug))

      if (isDisabled) {
        // isDisabled here is the opposite of the new value, because the state is updated after this function runs.
        void deleteDisabledPushModule(slug)
      } else {
        void addDisabledPushModule(slug)
      }
    })
  }

  const EnhancedModuleSettingBox = useCallback(
    (props: ModuleSettingBoxProps) => (
      <ModuleSettingBox
        {...props}
        slug={slug}
      />
    ),
    [slug],
  )

  if (!isModuleActive) {
    return (
      <ModuleSettingBox slug={slug}>
        <ModuleSettingInfo
          description={description}
          isInactive
          testID={`${testID}Content`}
          title={title}
          {...iconProps}
        />
      </ModuleSettingBox>
    )
  }

  return (
    <Switch
      accessibilityLabel={`Onderwerp ${title} ${description} staat ${isDisabled ? 'uit' : 'aan'}`}
      label={
        <ModuleSettingInfo
          description={description}
          testID={`${testID}Content`}
          title={title}
          titleColor={moduleTitleColor}
          {...iconProps}
        />
      }
      onChange={onChange}
      testID={`${testID}Switch`}
      value={!isDisabled}
      wrapper={EnhancedModuleSettingBox}
    />
  )
}
