import {EmailButton} from '@/components/ui/buttons/EmailButton'
import {PhoneButton} from '@/components/ui/buttons/PhoneButton'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ProjectContact} from '@/modules/construction-work/types/api'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  contacts: ProjectContact[]
  emailSubject?: string
}

export const ProjectContacts = ({contacts, emailSubject}: Props) => (
  <Column gutter="xl">
    {contacts.map(({address, email, id, name, phone, position, extra}) => (
      <Column
        gutter="md"
        key={id}>
        {!!name && (
          <Title
            level="h3"
            testID="ConstructionWorkProjectContactTitle"
            text={name}
          />
        )}
        {!!position && (
          <Paragraph testID="ConstructionWorkProjectContactJobTitle">
            {capitalizeString(position)}
          </Paragraph>
        )}
        {!!extra && (
          <Paragraph testID="ConstructionWorkProjectContactExtraText">
            {extra}
          </Paragraph>
        )}
        {!!phone && (
          <Row>
            <PhoneButton
              phoneNumber={phone}
              testID="ConstructionWorkProjectContactPhoneButton"
            />
          </Row>
        )}
        {!!email && (
          <Row>
            <EmailButton
              email={email}
              numberOfLines={1}
              subject={emailSubject}
              testID="ConstructionWorkProjectContactEmailButton"
            />
          </Row>
        )}
        {!!address && (
          <Paragraph testID="ConstructionWorkProjectContactAddressText">
            {address}
          </Paragraph>
        )}
      </Column>
    ))}
  </Column>
)
