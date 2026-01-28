import {Linking} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {usePermission} from '@/hooks/permissions/usePermission'
import {NotificationPermissionSettings} from '@/modules/user/components/NotificationPermissionSettings'
import {NotificationSettings} from '@/modules/user/components/NotificationSettings'
import {Permissions} from '@/types/permissions'

export const NotificationSettingsScreen = () => {
  const {hasPermission} = usePermission(Permissions.notifications)

  return (
    <Screen
      stickyFooter={
        !hasPermission ? (
          <Box>
            <Button
              iconName="link-external"
              iconSize="md"
              label="Ga naar Instellingen"
              onPress={() => Linking.openSettings()}
              testID="NotificationSettingsCloseButton"
            />
          </Box>
        ) : undefined
      }
      testID="NotificationSettingsScreen">
      <Box>
        {hasPermission ? (
          <NotificationSettings />
        ) : (
          <NotificationPermissionSettings />
        )}
      </Box>
    </Screen>
  )
}
