import type {ButtonProps} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box, type BoxProps} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {RedirectKey} from '@/modules/redirects/types'

type Variants = 'news' | 'contact'

const variantPropsMap: Record<
  Variants,
  {
    boxVariant: BoxProps['variant']
    buttonVariant: ButtonProps['variant']
    text: string
  }
> = {
  contact: {
    text: 'Schrijf u nu in voor de Nieuwsbrief Amsterdam en ontvang wekelijks nieuws, tips en mooie verhalen over de stad en uw stadsdeel.',
    boxVariant: 'primary',
    buttonVariant: 'secondary',
  },
  news: {
    text: 'Schrijf u nu in voor de Nieuwsbrief Amsterdam en ontvang wekelijks nieuws uit de stad en uw stadsdeel.',
    boxVariant: 'positive',
    buttonVariant: 'positive',
  },
}

export const NewsletterSignup = ({
  variant = 'contact',
}: {
  variant?: 'news' | 'contact'
}) => (
  <Box>
    <Box
      inset="lg"
      variant={variantPropsMap[variant].boxVariant}>
      <Column gutter="md">
        <Title
          color="inverse"
          level="h2"
          text="Blijf op de hoogte!"
        />
        <Paragraph color="inverse">{variantPropsMap[variant].text}</Paragraph>
        <ExternalLinkButton
          accessibilityHint="Opent een link naar een aanmeldformulier voor de nieuwsbrief."
          label="Ik wil de nieuwsbrief"
          redirectKey={RedirectKey.contactNewsletterSignup}
          testID="ContactNewsletterSignupExternalLinkButton"
          variant={variantPropsMap[variant].buttonVariant}
        />
      </Column>
    </Box>
  </Box>
)
