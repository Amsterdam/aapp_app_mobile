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
import {devLog} from '@/processes/development'
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
    () => {
      // Every mount of this hook assumes an (inter)action with the feature/module to which the survey belongs.
      if (
        surveyParams?.actionCount !== undefined &&
        minimum_actions &&
        surveyParams.actionCount < minimum_actions
      ) {
        devLog(
          `Adding action count for survey ${entryPoint}(ID: ${id}) from ${surveyParams.actionCount} -> ${surveyParams.actionCount + 1}`,
        )
        dispatch(addActionCount(id))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, id, minimum_actions],
  )

  useEffect(
    () => {
      devLog('isConditionsPassed:', isConditionsPassed)
      //TODO: move reset logic to place where we can be certain that the survey has been shown, in order to prevent false reset.

      return () => {
        // If conditions passed, the survey will show. Regardless of the trigger (fraction, action count, or cooldown) we need to update last seen and reset action count to 0 when this hook unmounts.
        if (isConditionsPassed) {
          devLog(
            `Conditions passed and survey ${entryPoint}(ID: ${id}) has shown (at ${dayjs(surveyParams?.lastSeenAt).format('DD/MM/YYYY - HH:mm:ss')}), we need to reset counters.`,
          )
          dispatch(resetActionCount(id))
          dispatch(updateLastSeenAt(id))
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, id, isConditionsPassed],
  )

  return {isConditionsPassed, survey, surveyId: id}
}
