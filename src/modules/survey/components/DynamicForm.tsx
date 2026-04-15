import {FormProvider, useForm} from 'react-hook-form'
import {useIsInBottomSheet} from '@/components/features/bottom-sheet/providers/bottomSheetPresence.context'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {AlertInline} from '@/components/ui/feedback/alert/AlertInline'
import {Column} from '@/components/ui/layout/Column'
import {useRoute} from '@/hooks/navigation/useRoute'
import {alerts} from '@/modules/survey/alerts'
import {FormFields} from '@/modules/survey/components/FormFields'
import {useOnSurveyFormSubmit} from '@/modules/survey/hooks/useOnSurveyFormSubmit'
import {useSurveyConfigByLocationQuery} from '@/modules/survey/service'
import {UserRouteName} from '@/modules/user/routes'

type Props = {
  entryPoint: string
  showError?: boolean
}

export const DynamicForm = ({entryPoint, showError = false}: Props) => {
  const route = useRoute<UserRouteName>()
  const form = useForm()
  const {
    handleSubmit,
    formState: {isDirty},
  } = form
  const isInBottomSheet = useIsInBottomSheet()
  const isFeedbackScreen = route.name === UserRouteName.feedback

  const {data, isFetching, isError} = useSurveyConfigByLocationQuery(entryPoint)
  const {survey, id: surveyId} = data ?? {}
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

  if (isFetching) {
    return <PleaseWait testID="DynamicFormPleaseWait" />
  }

  if (isError && (showError || isInBottomSheet)) {
    return <SomethingWentWrong testID="DynamicFormSomethingWentWrong" />
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
