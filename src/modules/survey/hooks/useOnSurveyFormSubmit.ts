import {useCallback} from 'react'
import type {Survey} from '@/modules/survey/types'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/survey/alerts'
import {useBuildSurveyMetaData} from '@/modules/survey/hooks/useBuildSurveyMetaData'
import {useCreateSurveyVersionEntryMutation} from '@/modules/survey/service'
import {getAnswers} from '@/modules/survey/utils/getAnswers'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {useAlert} from '@/store/slices/alert'

type Params = {
  entryPoint: string
  isFeedbackScreen?: boolean
  isInBottomSheet?: boolean
  survey?: Survey
  surveyId?: number
}

export const useOnSurveyFormSubmit = ({
  isFeedbackScreen,
  isInBottomSheet,
  survey,
  entryPoint,
  surveyId,
}: Params) => {
  const navigation = useNavigation()
  const [createSurvey, {isError, isLoading, isSuccess}] =
    useCreateSurveyVersionEntryMutation()
  const {setAlert} = useAlert()
  const trackException = useTrackException()
  const {close} = useBottomSheet()
  const metadata = useBuildSurveyMetaData()

  const onSubmit = useCallback(
    (formData: Record<string, string | string[]>) => {
      if (!survey?.latest_version) {
        return
      }

      const answers = getAnswers(formData)

      void createSurvey({
        answers,
        entry_point: entryPoint,
        metadata,
        unique_code: survey?.unique_code,
        version: survey?.latest_version?.version,
      })
        .unwrap()
        .then(
          () => {
            if (isInBottomSheet) {
              setAlert(alerts.feedbackSuccess)
              close()
            }

            if (isFeedbackScreen) {
              setAlert(alerts.feedbackSuccess)
              navigation.goBack()
            }
          },
          error => {
            trackException(
              ExceptionLogKey.surveySubmissionFailed,
              'useOnSurveyFormSubmit.ts',
              {error, surveyId},
            )

            if (isInBottomSheet) {
              setAlert(alerts.feedbackFailed)
              close()
            }

            if (isFeedbackScreen) {
              setAlert(alerts.feedbackFailed)
              navigation.goBack()
            }
          },
        )
    },
    [
      close,
      createSurvey,
      entryPoint,
      isFeedbackScreen,
      isInBottomSheet,
      metadata,
      navigation,
      setAlert,
      survey?.latest_version,
      survey?.unique_code,
      surveyId,
      trackException,
    ],
  )

  return {
    onSubmit,
    createSurveyIsError: isError,
    createSurveyIsLoading: isLoading,
    createSurveyIsSuccess: isSuccess,
  }
}
