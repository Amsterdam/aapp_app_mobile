import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useDynamicForm} from '@/modules/survey/hooks/useDynamicForm'
import {
  addActionCount,
  addSurveyParams,
  resetActionCount,
  selectSurveyParams,
  updateLastSeenAt,
} from '@/modules/survey/slice'
import {dayjs} from '@/utils/datetime/dayjs'

export const useConfigConditionsPassed = (entryPoint: string) => {
  const dispatch = useDispatch()
  const {data} = useDynamicForm(entryPoint)
  const {id, cooldown, minimum_actions, fraction, survey} = data || {}
  const surveyParams = useSelector(selectSurveyParams(id))

  const isCooldownOver =
    cooldown &&
    surveyParams &&
    dayjs().diff(surveyParams.lastSeenAt, 'days') >= cooldown

  const isMinimumActionsMet =
    surveyParams &&
    minimum_actions &&
    surveyParams.actionCount >= minimum_actions
  // eslint-disable-next-line sonarjs/pseudo-random
  const isRandomlySelected = fraction && Math.random() <= fraction
  const isConditionsPassed =
    isCooldownOver || isMinimumActionsMet || isRandomlySelected

  useEffect(() => {
    if (!surveyParams) {
      dispatch(addSurveyParams(id))
    }
  }, [dispatch, id, surveyParams])

  useEffect(
    () => () => {
      if (isCooldownOver) {
        dispatch(updateLastSeenAt(id))
      }

      if (isMinimumActionsMet) {
        dispatch(resetActionCount(id))
      }

      if (
        surveyParams?.actionCount !== undefined &&
        surveyParams?.actionCount < minimum_actions!
      ) {
        dispatch(addActionCount(id))
      }
    },
    [
      dispatch,
      id,
      isCooldownOver,
      isMinimumActionsMet,
      isRandomlySelected,
      minimum_actions,
      surveyParams?.actionCount,
    ],
  )

  return {isConditionsPassed, survey, surveyId: id}
}
