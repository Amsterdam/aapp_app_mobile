import type {NavigationProps} from '@/app/navigation/types'
import type {NewsRouteName} from '@/modules/news/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = NavigationProps<NewsRouteName.liveblog>

export const NewsLiveblogScreen = ({route}: Props) => (
  <Screen
    scroll
    testID="NewsLiveblogScreen">
    <Box>
      <Phrase>{route.params.id}</Phrase>
    </Box>
  </Screen>
)
