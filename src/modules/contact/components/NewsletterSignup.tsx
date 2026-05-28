import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

export const NewsletterSignup = ({
  variant = 'contact',
}: {
  variant?: 'news' | 'contact'
}) => (
  <Box>
    <Box
      inset="lg"
      variant={variant === 'news' ? 'positive' : 'primary'}>
      <Column gutter="md">
        <Title
          color="inverse"
          level="h2"
          text="Blijf op de hoogte!"
        />
        <Paragraph color="inverse">
          Schrijf u nu in voor de Nieuwsbrief Amsterdam en ontvang wekelijks
          nieuws
          {variant === 'contact'
            ? ', tips en mooie verhalen over'
            : ' uit'} de
          stad en uw stadsdeel.
        </Paragraph>
        <ExternalLinkButton
          accessibilityHint="Opent een link naar een aanmeldformulier voor de nieuwsbrief."
          label="Ik wil de nieuwsbrief"
          redirectKey={RedirectKey.contactNewsletterSignup}
          testID="ContactNewsletterSignupExternalLinkButton"
          variant={variant === 'news' ? 'positive' : 'secondary'}
        />
      </Column>
    </Box>
  </Box>
)
