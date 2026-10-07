import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Liveblog} from '@/modules/news/components/liveblog/Liveblog'
import type {NewsRouteName} from '@/modules/news/routes'

type Props = NavigationProps<NewsRouteName.liveblog>

export const NewsLiveblogScreen = ({route}: Props) => (
  <Screen
    scroll={false}
    testID="NewsLiveblogScreen"
    withBottomInset={false}>
    <Liveblog id={route.params.id} />
  </Screen>
)
