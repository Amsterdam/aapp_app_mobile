import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {RemoveAllData} from '@/modules/user/components/remove-all-data/RemoveAllData'

export const RemoveAllDataScreen = () => (
  <Screen testID="RemoveAllDataScreen">
    <Box>
      <RemoveAllData />
    </Box>
  </Screen>
)
