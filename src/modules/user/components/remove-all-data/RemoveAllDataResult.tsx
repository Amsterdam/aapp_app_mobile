import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {useRoute} from '@/hooks/navigation/useRoute'
import {UserRouteName} from '@/modules/user/routes'

export const RemoveAllDataResult = () => {
  const {success, errors} = useRoute<UserRouteName.removeAllDataResult>().params

  const title = success
    ? 'Uw instellingen zijn verwijderd'
    : 'Niet alles is verwijderd'

  const body = success
    ? 'De app is nu leeg. U kunt opnieuw beginnen of de app verwijderen.'
    : 'Sommige onderdelen konden we niet verwijderen.'

  return (
    <Box
      insetHorizontal="md"
      insetVertical="xxl">
      <Column gutter="lg">
        <Row align="center">
          <Icon
            color={success ? 'confirm' : 'warning'}
            isFilled
            name={success ? 'success' : 'warning'}
            size="xxl"
            testID="PermissionInstructionScreenIcon"
          />
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
        </Column>
        {!success && !!errors && errors.length > 0 && (
          <Column gutter="smd">
            <Title
              level="h5"
              text="Wat is niet gelukt?"
            />
            <List
              gutter="no"
              items={errors}
              testID="RemoveAllDataResultScreenErrorsList"
            />
          </Column>
        )}
      </Column>
    </Box>
  )
}
