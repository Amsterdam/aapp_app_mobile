import {useCallback} from 'react'
import {Switch} from '@/components/ui/forms/Switch'
import {type TestProps} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {Module, ModuleStatus} from '@/modules/types'
import {
  ModuleSettingBox,
  type ModuleSettingBoxProps,
} from '@/modules/user/components/ModuleSettingBox'
import {ModuleSettingInfo} from '@/modules/user/components/ModuleSettingInfo'
import {useLogoutWithAlert} from '@/modules/user/hooks/useLogoutWithAlert'
import {
  useAddDisabledPushModuleMutation,
  useDeleteDisabledPushModuleMutation,
} from '@/modules/user/service'
import {
  selectDisabledModules,
  toggleModuleDisabled,
} from '@/store/slices/modules'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  module: Module
} & TestProps

export const ModuleSetting = ({
  module: {description, icon: iconName, moduleSlug: slug, status, title},
  testID,
}: Props) => {
  const dispatch = useDispatch()
  const disabledModules = useSelector(selectDisabledModules)
  const logoutWithAlert = useLogoutWithAlert(slug)

  const isModuleActive = status === ModuleStatus.active

  const isDisabled = disabledModules?.includes(slug)

  const [addDisabledPushModule] = useAddDisabledPushModuleMutation()
  const [deleteDisabledPushModule] = useDeleteDisabledPushModuleMutation()

  const onChange = () => {
    void logoutWithAlert().then(() => {
      dispatch(toggleModuleDisabled(slug))
    })

    if (isDisabled) {
      void deleteDisabledPushModule(slug)
    } else {
      void addDisabledPushModule(slug)
    }
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
          iconName={iconName}
          isInactive
          testID={`${testID}Content`}
          title={title}
        />
      </ModuleSettingBox>
    )
  }

  return (
    <Switch
      accessibilityLabel={`Onderwerp "${accessibleText(title, description)}" staat ${isDisabled ? 'uit' : 'aan'}`}
      label={
        <ModuleSettingInfo
          description={description}
          iconName={iconName}
          testID={`${testID}Content`}
          title={title}
        />
      }
      onChange={onChange}
      testID={`${testID}Switch`}
      value={!isDisabled}
      wrapper={EnhancedModuleSettingBox}
    />
  )
}
