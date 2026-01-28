import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useFocusAndForegroundEffect} from '@/hooks/useFocusAndForegroundEffect'
import {Permissions} from '@/types/permissions'

export const NotificationPermissionSettings = () => {
  const {requestPermission} = usePermission(Permissions.notifications)

  useFocusAndForegroundEffect(() => {
    void requestPermission()
  }, [requestPermission])

  return (
    <Column gutter="lg">
      <Row align="center">
        <Icon
          name="bell-off"
          size="xxl"
          testID="NotificationPermissionSettingsIcon"
        />
      </Row>
      <Column gutter="md">
        <Title
          text="U ontvangt geen pushmeldingen"
          textAlign="center"
        />
        <Paragraph
          textAlign="center"
          variant="intro">
          Ga naar Instellingen en zet de meldingen aan.
        </Paragraph>
      </Column>
    </Column>
  )
}
