import type {NavigationProps} from '@/app/navigation/types'
import type {NewsRouteName} from '@/modules/news/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Liveblog} from '@/modules/news/components/liveblog/Liveblog'

type Props = NavigationProps<NewsRouteName.liveblog>

export const NewsLiveblogScreen = ({route}: Props) => (
  <Screen
    scroll={false}
    testID="NewsLiveblogScreen"
    withBottomInset={false}>
    <Liveblog id={route.params.id} />
  </Screen>
)
