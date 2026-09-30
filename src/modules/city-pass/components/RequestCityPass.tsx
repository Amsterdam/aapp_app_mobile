import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/exports/RedirectKey'

export const RequestCityPass = () => (
  <>
    <Title text="Stadspas" />
    <Gutter height="sm" />
    <Paragraph>
      De Stadspas is voor Amsterdammers met een laag inkomen en weinig vermogen.
      Met de Stadspas kunt u gratis of met korting leuke activiteiten doen.
    </Paragraph>
    <Gutter height="lg" />
    <ExternalLinkButton
      label="Stadspas aanvragen"
      redirectKey={RedirectKey.cityPassRequest}
      testID="CityPassRequestCityPassExternalLinkButton"
      variant="secondary"
    />
  </>
)
