import {useEffect, useState} from 'react'
import type {NavigationProps} from '@/app/navigation/types'
import type {NotificationHistoryRouteName} from '@/modules/notification-history/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'

type Props = NavigationProps<NotificationHistoryRouteName.NotificationRedirect>

export const NotificationRedirectScreen = ({route}: Props) => {
  const [counter, setCounter] = useState(3)
  const openUrl = useOpenUrl()
  const {navigate} = useNavigation()

  useEffect(() => {
    if (counter <= 0) {
      openUrl(route.params.url)
      navigate(ModuleSlug.home, {screen: HomeRouteName.home})

      return
    }

    const interval = setInterval(() => setCounter(prev => prev - 1), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [counter, route.params.url, openUrl, navigate])

  const strippedUrl = new URL(route.params.url).host

  return (
    <Screen
      scroll={false}
      testID="ExtScreen">
      <Box grow>
        <Column
          align="center"
          flex={1}>
          <Paragraph textAlign="center">
            U wordt doorgestuurd naar{' '}
            <Phrase color="link">{strippedUrl}</Phrase> in{' '}
            <Phrase emphasis="strong">{counter}</Phrase>
            ...
          </Paragraph>
        </Column>
      </Box>
    </Screen>
  )
}
