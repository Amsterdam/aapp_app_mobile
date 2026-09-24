import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {LayoutAnimation} from 'react-native'
import {AlertProps} from '@/components/ui/feedback/alert/Alert.types'
import {isReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type AlertState = AlertProps

const initialState = {} as AlertState

export const alertSlice = createSlice({
  name: ReduxKey.alert,
  initialState,
  reducers: {
    reset: () => initialState,
    setAlert: (_state, {payload}: PayloadAction<AlertState>) => {
      if (!isReduceMotionEnabled) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      }

      return payload
    },
  },
})

export const {reset: resetAlertAction, setAlert: setAlertAction} =
  alertSlice.actions

export const selectAlert = (state: RootState) => state[ReduxKey.alert]

export const useAlert = () => {
  const dispatch = useDispatch()

  const alert = useSelector(selectAlert)

  const setAlert = useCallback(
    (a: AlertState) => setTimeout(() => dispatch(setAlertAction(a)), 100), // Delay to prevent reset to come after set
    [dispatch],
  )
  const resetAlert = useCallback(() => dispatch(resetAlertAction()), [dispatch])

  return {alert, setAlert, resetAlert}
}
