import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {decreaseActionCount} from '@/modules/survey/slice'

export const useDecreaseActionCount = (surveyId: number | undefined) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!surveyId) {
      return
    }

    dispatch(decreaseActionCount(surveyId))
  }, [dispatch, surveyId])
}
