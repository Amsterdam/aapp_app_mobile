import {Key} from 'react'
import type {IconProps} from '@/components/ui/media/Icon'
import {RootStackParams} from '@/app/navigation/types'
import {TopTaskButtonProps} from '@/components/ui/buttons/TopTaskButton'
import {type TestProps} from '@/components/ui/types'
import {ContactRouteName} from '@/modules/contact/routes'
import {RedirectKey} from '@/modules/redirects/types'
import {formatPhoneNumber} from '@/utils/formatPhoneNumber'

export type ContactOption = {
  icon: IconProps
  key: Key
  redirectsKey?: RedirectKey
  routeName?: keyof RootStackParams
  text: string
  title: string
  url?: string
} & Partial<
  Pick<TopTaskButtonProps, 'accessibilityHint' | 'accessibilityLabel'>
> &
  TestProps

export const contactOptions: ContactOption[] = [
  {
    accessibilityHint: 'Opent een link naar een formulier.',
    accessibilityLabel: 'Gebruik ons contactformulier',
    icon: {name: 'mail'},
    key: 'email',
    redirectsKey: RedirectKey.contactForm,
    testID: 'ContactContactFormButton',
    text: 'Reactie binnen 5 werkdagen.',
    title: 'Contactformulier',
  },
  {
    accessibilityLabel: 'Bel veertien nul twintig',
    icon: {isFilled: true, name: 'phone'},
    key: 'phone',
    url: 'tel:14020',
    testID: 'ContactPhoneButton',
    text: 'Gemiddeld 5 minuten wachten.',
    title: 'Bel 14 020',
  },
  {
    accessibilityLabel: 'Chat met een bot of een medewerker.',
    icon: {name: 'speech-balloon-ellipsis'},
    key: 'chat',
    testID: 'ContactChatButton',
    text: 'Direct antwoord van onze digitale assistent of medewerker.',
    title: 'Chat',
  },
  {
    accessibilityLabel:
      'Whatsapp nul zes vierenveertig vierenveertig nul zes vijfenvijftig',
    icon: {name: 'whatsapp'},
    key: 'whatsapp',
    url: 'https://wa.me/31644440655',
    testID: 'ContactWhatsAppButton',
    text: 'Reactie binnen 1 werkdag.',
    title: `WhatsApp ${formatPhoneNumber('0644440655') ?? ''}`,
  },
  {
    icon: {name: 'buildings'},
    key: 'stadsloketten',
    routeName: ContactRouteName.cityOffice,
    testID: 'ContactCityOfficesButton',
    text: 'Kom langs bij 1 van onze Stadsloketten.',
    title: 'Stadsloketten',
  },
  {
    accessibilityHint: 'Opent een link naar een website.',
    accessibilityLabel: 'Ga naar Mijn Amsterdam',
    icon: {isFilled: true, name: 'person-circle'},
    key: 'mijn-amsterdam',
    url: 'https://mijn.amsterdam.nl/',
    testID: 'ContactMijnAmsterdamButton',
    text: 'Uw persoonlijke online pagina bij de gemeente Amsterdam.',
    title: 'Mijn Amsterdam',
  },
]
