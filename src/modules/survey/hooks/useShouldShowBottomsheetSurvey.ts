import {useMemo} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useDynamicForm} from '@/modules/survey/hooks/useDynamicForm'
import {selectSurveyParams} from '@/modules/survey/slice'
import {getPassesFraction} from '@/modules/survey/utils/getPassesFraction'
import {dayjs} from '@/utils/datetime/dayjs'

export const useShouldShowBottomsheetSurvey = (entryPoint: string) => {
  const {data} = useDynamicForm(entryPoint)
  const {id, cooldown, fraction} = data || {}
  const surveyParams = useSelector(selectSurveyParams(id))
  const passesFraction = useMemo(() => getPassesFraction(fraction), [fraction])

  const passesCooldown = useMemo(() => {
    if (cooldown === undefined || !surveyParams) {
      return false
    }

    return dayjs().diff(surveyParams.lastSeenAt, 'days') >= cooldown
  }, [cooldown, surveyParams])

  const shouldShowSurvey = useMemo(
    () =>
      typeof surveyParams?.actionCount === 'number' &&
      surveyParams?.actionCount <= 0 &&
      passesCooldown &&
      passesFraction,
    [passesCooldown, passesFraction, surveyParams],
  )

  return shouldShowSurvey
}
