import {useState} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAddSurveyParams} from '@/modules/survey/hooks/useAddSurveyParams'
import {useDecreaseActionCount} from '@/modules/survey/hooks/useDecreaseActionCount'
import {useDeleteSurveyParams} from '@/modules/survey/hooks/useDeleteSurveyParams'
import {useOpenSurveyBottomsheet} from '@/modules/survey/hooks/useOpenSurveyBottomsheet'
import {useSurveyConfigByLocationQuery} from '@/modules/survey/service'
import {selectSurveyParams} from '@/modules/survey/slice'

export const useOpenBottomsheetIfSurveyShouldShow = (entryPoint: string) => {
  const [hasShownSurvey, setHasShownSurvey] = useState(false)

  const {data} = useSurveyConfigByLocationQuery(entryPoint)
  const {id, cooldown, minimum_actions, fraction} = data ?? {}

  const surveyParams = useSelector(selectSurveyParams(id))
  const paramSettingsAlwaysShow =
    cooldown === 0 && minimum_actions === 0 && fraction === 1

  useAddSurveyParams(
    paramSettingsAlwaysShow,
    !!surveyParams,
    id,
    minimum_actions,
    hasShownSurvey,
  )
  useDecreaseActionCount(surveyParams?.surveyId)
  useDeleteSurveyParams(hasShownSurvey, surveyParams?.surveyId)

  const openSurveyBottomsheet = useOpenSurveyBottomsheet(
    paramSettingsAlwaysShow,
    entryPoint,
    () => setHasShownSurvey(true),
  )

  return openSurveyBottomsheet
}
