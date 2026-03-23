import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {deleteSurveyParams} from '@/modules/survey/slice'

export const useDeleteSurveyParams = (
  hasShownSurvey: boolean,
  id: number | undefined,
) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!hasShownSurvey) {
      return
    }

    dispatch(deleteSurveyParams(id))
  }, [dispatch, hasShownSurvey, id])
}
