import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {RemoveAllDataPermissions} from '@/modules/user/components/remove-all-data/RemoveAllDataPermissions'
import {useRemoveAllData} from '@/modules/user/hooks/useRemoveAllData'

export const RemoveAllDataPermissionsScreen = () => {
  const {isRemoving, requestRemoveAllData} = useRemoveAllData()

  return (
    <Screen
      stickyFooter={
        <Box>
          <Button
            disabled={isRemoving}
            isLoading={isRemoving}
            label="Instellingen verwijderen"
            onPress={requestRemoveAllData}
            testID="RemoveAllDataScreenRemoveAllButton"
            variant="secondaryDestructive"
          />
        </Box>
      }
      testID="RemoveAllDataPermissionsScreen">
      <Box>
        <RemoveAllDataPermissions />
      </Box>
    </Screen>
  )
}
