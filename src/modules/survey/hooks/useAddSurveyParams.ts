import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {addSurveyParams} from '@/modules/survey/slice'

export const useAddSurveyParams = (
  paramSettingsAlwaysShow: boolean,
  isSurveyParamsAlreadySet: boolean,
  id: number | undefined,
  minimum_actions: number | undefined,
  hasShownSurvey: boolean,
) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      paramSettingsAlwaysShow ||
      isSurveyParamsAlreadySet ||
      !id ||
      hasShownSurvey
    ) {
      return
    }

    dispatch(addSurveyParams({id, actionCount: minimum_actions}))
  }, [
    dispatch,
    id,
    minimum_actions,
    paramSettingsAlwaysShow,
    isSurveyParamsAlreadySet,
    hasShownSurvey,
  ])
}
