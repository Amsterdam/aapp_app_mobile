import {useLayoutEffect} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import type {NewsRouteName} from '@/modules/news/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Liveblog} from '@/modules/news/components/liveblog/Liveblog'
import {LiveblogActiveHeaderTitle} from '@/modules/news/components/liveblog/LiveblogActiveHeaderTitle'

type Props = NavigationProps<NewsRouteName.liveblog>

export const NewsLiveblogScreen = ({navigation, route}: Props) => {
  useLayoutEffect(() => {
    if (!route.params.isActive) {
      return
    }

    navigation.setOptions({
      headerTitle: LiveblogActiveHeaderTitle,
    })
  }, [navigation, route.params])

  return (
    <Screen
      scroll={false}
      testID="NewsLiveblogScreen"
      withBottomInset={false}>
      <Box>
        <Liveblog
          id={
            2 //TODO: change
          }
        />
      </Box>
    </Screen>
  )
}
