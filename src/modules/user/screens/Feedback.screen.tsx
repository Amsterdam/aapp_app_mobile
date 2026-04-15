import {Screen} from '@/components/features/screen/Screen'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {RedirectKey} from '@/modules/redirects/types'
import {Survey} from '@/modules/survey/exports/Survey'

export const FeedbackScreen = () => (
  <Screen
    keyboardAware
    testID="AboutFeedbackScreen">
    <Survey
      entryPoint="profile"
      FallbackComponent={<FallbackComponent />}
      showError
    />
  </Screen>
)
const FallbackComponent = () => (
  <Box>
    <Column gutter="lg">
      <SomethingWentWrong
        testID="UserFeedbackSurveySomethingWentWrong"
        text="Dit onderdeel werkt nu niet. Gebruik het contactformulier als tijdelijke oplossing."
      />
      <ExternalLinkButton
        label="Contactformulier"
        redirectKey={RedirectKey.contactForm}
        testID="UserFeedbackSurveyFallbackContactFormExternalLinkButton"
      />
    </Column>
  </Box>
)
