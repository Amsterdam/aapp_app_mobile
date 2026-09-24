import {useCallback} from 'react'
import RNRestart from 'react-native-restart-newarch'
import type {NavigationProps} from '@/app/navigation/types'
import type {UserRouteName} from '@/modules/user/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {RemoveAllDataResult} from '@/modules/user/components/remove-all-data/RemoveAllDataResult'
import {useRemoveAllData} from '@/modules/user/hooks/useRemoveAllData'

type Props = NavigationProps<UserRouteName.removeAllDataResult>

export const RemoveAllDataResultScreen = ({route}: Props) => {
  const {isRemoving, requestRemoveAllData} = useRemoveAllData()
  const {success} = route.params

  const onPressStartApp = useCallback(() => {
    RNRestart.Restart()
  }, [])

  return (
    <Screen
      stickyFooter={
        <Box>
          <Column gutter="md">
            <Button
              label="Start de app"
              onPress={onPressStartApp}
              testID="RemoveAllDataScreenStartAppButton"
              variant="primary"
            />
            {!success && (
              <Button
                disabled={isRemoving}
                isLoading={isRemoving}
                label="Verwijder opnieuw"
                onPress={requestRemoveAllData}
                testID="RemoveAllDataScreenRemoveAllButton"
                variant="secondaryDestructive"
              />
            )}
          </Column>
        </Box>
      }
      testID="RemoveAllDataResultScreen">
      <RemoveAllDataResult />
    </Screen>
  )
}
