import {Linking} from 'react-native'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {InlineLink} from '@/components/ui/text/InlineLink'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {usePermission} from '@/hooks/permissions/usePermission'
import {Permissions} from '@/types/permissions'

export const RemoveAllDataPermissions = () => {
  const {hasPermission} = usePermission(Permissions.notifications)

  const iconName: SvgIconName = hasPermission ? 'bell' : 'bell-off'

  const title = hasPermission
    ? 'Toestemming voor meldingen staat aan'
    : 'Toestemming voor meldingen staat uit'

  const body = hasPermission
    ? 'Zet de toestemming voor meldingen eerst uit. Dit doet u zelf in de instellingen van uw apparaat.'
    : 'U kunt de instellingen nu verwijderen.'

  return (
    <Box
      insetHorizontal="md"
      insetVertical="xxl">
      <Column gutter="lg">
        <Row align="center">
          {!!iconName && (
            <Icon
              name={iconName}
              size="xxl"
              testID="PermissionInstructionScreenIcon"
            />
          )}
        </Row>
        <Column gutter="lg">
          <Column gutter="md">
            <Title
              level="h2"
              text={title}
              textAlign="center"
            />
            <Paragraph textAlign="center">{body}</Paragraph>
          </Column>
          {!!hasPermission && (
            <InlineLink
              isExternal
              onPress={() => Linking.openSettings()}
              testID="RemoveAllDataPermissionsInlineLink"
              textAlign="center">
              Ga naar instellingen
            </InlineLink>
          )}
        </Column>
      </Column>
    </Box>
  )
}
