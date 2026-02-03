import {FormProvider, useForm} from 'react-hook-form'
import {useIsInBottomSheet} from '@/components/features/bottom-sheet/BottomSheetPresenceContext'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {AlertInline} from '@/components/ui/feedback/alert/AlertInline'
import {MapSelectorControlled} from '@/components/ui/forms/MapSelectorControlled'
import {Column} from '@/components/ui/layout/Column'
import {useRoute} from '@/hooks/navigation/useRoute'
import {alerts} from '@/modules/survey/alerts'
import {FormFields} from '@/modules/survey/components/FormFields'
import {useConfigConditionsPassed} from '@/modules/survey/hooks/useConfigConditionsPassed'
import {useOnSurveyFormSubmit} from '@/modules/survey/hooks/useOnSurveyFormSubmit'
import {UserRouteName} from '@/modules/user/routes'

type Props = {
  entryPoint: string
}

export const DynamicForm = ({entryPoint}: Props) => {
  const route = useRoute<UserRouteName>()
  const form = useForm()
  const {
    handleSubmit,
    formState: {isDirty},
  } = form
  const isInBottomSheet = useIsInBottomSheet()
  const isFeedbackScreen = route.name === UserRouteName.feedback

  const {
    isConditionsPassed: showSurvey,
    survey,
    surveyId,
  } = useConfigConditionsPassed(entryPoint)
  const {
    onSubmit,
    createSurveyIsLoading,
    createSurveyIsError,
    createSurveyIsSuccess,
  } = useOnSurveyFormSubmit({
    isInBottomSheet,
    isFeedbackScreen,
    survey,
    entryPoint,
    surveyId,
  })

  if (!showSurvey) {
    return null
  }

  if (createSurveyIsError && !isInBottomSheet && !isFeedbackScreen) {
    return <AlertInline {...alerts.feedbackFailed} />
  }

  if (createSurveyIsSuccess && !isInBottomSheet && !isFeedbackScreen) {
    return <AlertInline {...alerts.feedbackSuccess} />
  }

  return (
    <FormProvider {...form}>
      <Box>
        <Column gutter="xl">
          <FormFields questions={survey?.latest_version?.questions} />
          <MapSelectorControlled
            label="Locatie"
            mapHeight={300}
            name="location"
            rules={{required: true}}
            testID="FeedbackMapFormField"
          />
          {(!!isFeedbackScreen || !!isDirty) && (
            <Button
              isLoading={createSurveyIsLoading}
              label="Verstuur"
              onPress={handleSubmit(onSubmit)}
              testID="DynamicFormSubmitButton"
            />
          )}
        </Column>
      </Box>
    </FormProvider>
  )
}
