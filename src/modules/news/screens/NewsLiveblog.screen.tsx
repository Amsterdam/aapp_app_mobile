import {useLayoutEffect} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import type {NewsRouteName} from '@/modules/news/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {ActiveLiveblogHeaderTitle} from '@/modules/news/components/ActiveLiveblogHeaderTitle'
import {Liveblog} from '@/modules/news/components/Liveblog'

type Props = NavigationProps<NewsRouteName.liveblog>

export const NewsLiveblogScreen = ({navigation, route}: Props) => {
  useLayoutEffect(() => {
    if (!route.params.isActive) {
      return
    }

    navigation.setOptions({
      headerTitle: ActiveLiveblogHeaderTitle,
    })
  }, [navigation, route.params])

  return (
    <Screen
      scroll
      testID="NewsLiveblogScreen">
      <Box>
        <Liveblog id={2} />
      </Box>
    </Screen>
  )
}
