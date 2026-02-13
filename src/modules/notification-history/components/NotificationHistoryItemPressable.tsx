import {useLinkTo} from '@react-navigation/native'
import type {Notification} from '@/modules/notification-history/types'
import type {ReactNode} from 'react'
import {createPathFromNotification} from '@/app/navigation/createPathFromNotification'
import {PressableBase} from '@/components/ui/buttons/PressableBase'
import {useOpenUrl} from '@/hooks/linking/useOpenUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type Props = {
  children: ReactNode
  notification: Notification
}

export const NotificationHistoryItemPressable = ({
  children,
  notification,
}: Props) => {
  const {body, context, created_at, id, module_slug, title, is_read} =
    notification
  const {navigate} = useNavigation()
  const openUrl = useOpenUrl()

  const linkTo = useLinkTo()

  return (
    <PressableBase
      accessibilityLabel={accessibleText(
        is_read ? '' : 'Ongelezen bericht: ',
        title,
        body,
        `ontvangen: ${created_at}`,
        context.url ? 'Opent in web brauwser.' : '',
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

        if (deeplinkUrl) {
          linkTo(deeplinkUrl)

          return
        }

        if (module_slug) {
          navigate(module_slug)
        }
      }}
      testID={`NotificationHistoryItem${id}Button`}>
      {children}
    </PressableBase>
  )
}
