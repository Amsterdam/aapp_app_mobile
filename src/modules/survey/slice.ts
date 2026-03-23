import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {type SurveyConfigParam} from '@/modules/survey/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'
import {dayjs} from '@/utils/datetime/dayjs'

export type SurveyState = Record<number, SurveyConfigParam> & {
  bottomSheetSurveyEntryPoint?: string
}

const initialState: SurveyState = {}

export const surveySlice = createSlice({
  name: ReduxKey.survey,
  initialState,
  reducers: {
    addBottomSheetSurveyEntryPoint: (
      state,
      {payload: entryPoint}: PayloadAction<string>,
    ) => {
      state.bottomSheetSurveyEntryPoint = entryPoint
    },
    deleteBottomSheetSurveyEntryPoint: state => {
      delete state.bottomSheetSurveyEntryPoint
    },
    addSurveyParams: (
      state,
      {payload}: PayloadAction<{actionCount?: number; id?: number} | undefined>,
    ) => {
      const {id, actionCount} = payload ?? {}

      if (id === undefined) {
        return
      }

      state[id] = {
        surveyId: id,
        actionCount: actionCount ?? 0,
        lastSeenAt: dayjs().toISOString(),
      }
    },
    deleteSurveyParams: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      if (surveyId === undefined) {
        return
      }

      delete state[surveyId]
    },
    decreaseActionCount: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      if (
        surveyId === undefined ||
        !state[surveyId] ||
        state[surveyId].actionCount === 0
      ) {
        return
      }

      const survey = state[surveyId]

      survey.actionCount -= 1
    },
    resetActionCount: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      if (surveyId === undefined || !state[surveyId]) {
        return
      }

      const survey = state[surveyId]

      survey.actionCount = 0
    },
    updateLastSeenAt: (
      state,
      {payload: surveyId}: PayloadAction<number | undefined>,
    ) => {
      if (surveyId === undefined || !state[surveyId]) {
        return
      }

      const survey = state[surveyId]

      survey.lastSeenAt = dayjs().toISOString()
    },
  },
})

export const {
  addSurveyParams,
  decreaseActionCount,
  resetActionCount,
  updateLastSeenAt,
  deleteSurveyParams,
} = surveySlice.actions

export const useBottomSheetSurveyEntryPoint = () => {
  const dispatch = useDispatch()
  const selectSurveyEntryPoint = useSelector(
    (state: RootState) => state[ReduxKey.survey].bottomSheetSurveyEntryPoint,
  )
  const addEntryPoint = useCallback(
    (entryPoint: string) =>
      dispatch(surveySlice.actions.addBottomSheetSurveyEntryPoint(entryPoint)),
    [dispatch],
  )
  const deleteEntryPoint = useCallback(
    () => dispatch(surveySlice.actions.deleteBottomSheetSurveyEntryPoint()),
    [dispatch],
  )

  return {addEntryPoint, deleteEntryPoint, entryPoint: selectSurveyEntryPoint}
}

export const selectSurveysParams = (state: RootState) => state[ReduxKey.survey]
export const selectSurveyParams = (surveyId?: number) => (state: RootState) =>
  surveyId ? state[ReduxKey.survey][surveyId] : undefined
