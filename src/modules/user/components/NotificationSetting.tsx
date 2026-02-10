import {type ReactNode, useCallback} from 'react'
import type {Module} from '@/modules/types'
import type {NotificationModule} from '@/modules/user/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {
  useAddDisabledPushTypeMutation,
  useDeleteDisabledPushModuleMutation,
  useDeleteDisabledPushTypeMutation,
  useGetDisabledPushTypesQuery,
} from '@/modules/user/service'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  isDisabled: boolean
  notificationModule: NotificationModule & Module
}

export const NotificationSetting = ({
  isDisabled,
  notificationModule: {
    description,
    module,
    title,
    types,
    useIsLoggedIn = () => true,
    loginRoute,
    slug,
  },
}: Props) => {
  const [deleteDisabledPushModule, {isLoading: isLoadingEnable}] =
    useDeleteDisabledPushModuleMutation()
  const [addDisabledPushType, {isLoading: isLoadingTypeDisable}] =
    useAddDisabledPushTypeMutation()
  const [deleteDisabledPushType, {isLoading: isLoadingTypeEnable}] =
    useDeleteDisabledPushTypeMutation()
  const {data: disabledPushTypes} = useGetDisabledPushTypesQuery()
  const navigation = useNavigation()

  const isLoading =
    isLoadingEnable || isLoadingTypeDisable || isLoadingTypeEnable

  const onChangeType = useCallback(
    (type: string, newValue: boolean) => {
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
      deleteDisabledPushType,
      deleteDisabledPushModule,
      module,
      addDisabledPushType,
    ],
  )

  const isLoggedIn = useIsLoggedIn()

  return (
    <Column gutter="no">
      <Box>
        <Title
          level="h5"
          text={title}
        />
      </Box>

      <Column gutter="xxs">
        {isLoggedIn ? (
          types.map(type => (
            <Switch
              accessibilityLabel={`Onderwerp "${accessibleText(title, description)}" staat ${isDisabled ? 'uit' : 'aan'}`}
              disabled={isLoading}
              key={type.type}
              label={<Phrase>{type.description}</Phrase>}
              onChange={() =>
                onChangeType(
                  type.type,
                  !disabledPushTypes?.includes(type.type) && !isDisabled,
                )
              }
              testID={`NotificationSetting${module}Switch`}
              value={!disabledPushTypes?.includes(type.type) && !isDisabled}
              wrapper={SwitchWrapper}
            />
          ))
        ) : (
          <NavigationButton
            chevronSize="md"
            emphasis="default"
            onPress={() => {
              if (Array.isArray(loginRoute)) {
                // @ts-expect-error - This is a valid navigation route, but somehow it does not understand the params type
                navigation.navigate(...loginRoute)
              } else {
                navigation.navigate(slug, loginRoute)
              }
            }}
            testID={`NotificationSetting${module}LoginNavigationButton`}
            title="Log in om meldingen te ontvangen"
          />
        )}
      </Column>
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
