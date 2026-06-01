import {Screen} from '@/components/features/screen/Screen'
import {Phrase} from '@/components/ui/text/Phrase'
import {NewsletterSignup} from '@/modules/contact/components/NewsletterSignup'

export const NewsDashboardScreen = () => (
  <Screen testID="NewsDashboardScreen">
    <Phrase>Nieuws</Phrase>
    <NewsletterSignup variant="news" />
  </Screen>
)
