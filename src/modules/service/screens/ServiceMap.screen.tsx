import type {NavigationProps} from '@/app/navigation/types'
import type {ServiceRouteName} from '@/modules/service/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'

type Props = NavigationProps<ServiceRouteName.map>

export const ServiceMapScreen = ({route}: Props) => (
  <Screen testID="ServiceMapScreen">
    <Box>
      <Column gutter="xl">
        <Paragraph variant="intro">ID: {route.params.id}</Paragraph>
      </Column>
    </Box>
  </Screen>
)
