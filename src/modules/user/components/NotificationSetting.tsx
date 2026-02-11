import type {Module} from '@/modules/types'
import type {NotificationModule} from '@/modules/user/types'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {NotificationSettingSwitch} from '@/modules/user/components/NotificationSettingSwitch'
import {useGetDisabledPushTypesQuery} from '@/modules/user/service'

type Props = {
  isDisabled: boolean
  notificationModule: NotificationModule & Module
}

export const NotificationSetting = ({
  isDisabled,
  notificationModule: {
    module,
    title,
    types,
    useIsLoggedIn = () => true,
    loginRoute,
    slug,
  },
}: Props) => {
  const {data: disabledPushTypes} = useGetDisabledPushTypesQuery()
  const navigation = useNavigation()

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
            <NotificationSettingSwitch
              isDisabled={isDisabled}
              key={type.type}
              module={module}
              title={title}
              type={type}
              value={!disabledPushTypes?.includes(type.type) && !isDisabled}
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
