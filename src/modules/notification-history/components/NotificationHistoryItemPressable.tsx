import {useLinkTo} from '@react-navigation/native'
import type {ReactNode} from 'react'
import {createPathFromNotification} from '@/app/navigation/createPathFromNotification'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {type Notification} from '@/modules/notification-history/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  children: ReactNode
  createdAt: string
  notification: Notification
}

export const NotificationHistoryItemPressable = ({
  children,
  createdAt,
  notification,
}: Props) => {
  const {body, context, id, title, is_read} = notification
  const openUrl = useOpenUrl()

  const linkTo = useLinkTo()

  return (
    <PressableBase
      accessibilityLabel={accessibleText(
        is_read ? '' : 'Ongelezen bericht: ',
        title,
        body,
        `ontvangen: ${createdAt}`,
        context.url ? 'Opent in webbrowser.' : '',
      )}
      onPress={() => {
        if (context.url) {
          return openUrl(context.url)
        }

        const deeplinkUrl = createPathFromNotification(
          {
            id,
            title,
            body,
            data: context as Record<string, string | number | object>,
          },
          false,
        )

        if (!deeplinkUrl) {
          return
        }

        linkTo(deeplinkUrl)
      }}
      testID={`NotificationHistoryItem${id}Button`}>
      {children}
    </PressableBase>
  )
}
