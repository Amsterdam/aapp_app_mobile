import {NewsletterSignup} from '@/components/features/NewsletterSignup'
import {Screen} from '@/components/features/screen/Screen'
import {ContactOptions} from '@/modules/contact/components/contact-options/ContactOptions'
import {Survey} from '@/modules/survey/exports/Survey'

export const ContactScreen = () => (
  <Screen
    keyboardAware
    testID="ContactScreen">
    <ContactOptions />
    <NewsletterSignup />
    <Survey entryPoint="contact-info" />
  </Screen>
)
