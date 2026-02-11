import type {NavigationProps} from '@/app/navigation/types'
import type {NotificationHistoryRouteName} from '@/modules/notification-history/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'

type Props = NavigationProps<NotificationHistoryRouteName.NotificationRedirect>

export const NotificationRedirectScreen = ({route}: Props) => {
  const {title, body, url} = route.params
  const navigation = useNavigation()

  return (
    <Screen
      scroll={false}
      testID="NotificationRedirectScreen">
      <Box
        grow
        insetBottom="md"
        insetHorizontal="md"
        insetTop="xl">
        <Column gutter="xl">
          <Column halign="center">
            <Icon
              name="bell"
              size="xxl"
            />
          </Column>
          <Column
            gutter="md"
            halign="center">
            {!!title && (
              <Title
                level="h2"
                text={title}
              />
            )}
            {!!body && <Paragraph variant="intro">{body}</Paragraph>}
          </Column>
          <Column gutter="md">
            <ExternalLinkButton
              label="Naar website"
              testID="NotificationRedirectScreen.ExternalLinkButton"
              url={url}
            />
            <Button
              label="Annuleer"
              onPress={() => navigation.pop()}
              testID="NotificationRedirectScreenCancelButton"
              variant="secondary"
            />
          </Column>
        </Column>
      </Box>
    </Screen>
  )
}
