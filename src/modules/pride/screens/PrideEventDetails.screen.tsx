import type {NavigationProps} from '@/app/navigation/types'
import type {PrideRouteName} from '@/modules/pride/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

type Props = NavigationProps<PrideRouteName.eventDetails>

export const PrideEventDetailsScreen = ({route}: Props) => (
  <Screen testID="PrideEventDetailsScreen">
    <Box>
      <Title text={route.params.id} />
    </Box>
  </Screen>
)
