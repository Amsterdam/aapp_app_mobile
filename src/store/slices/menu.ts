import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ReduxKey} from '@/store/types/reduxKey'

export type MenuState = {
  isOpen: boolean
}

const initialState: MenuState = {
  isOpen: false,
}

export const menuSlice = createSlice({
  name: ReduxKey.menu,
  initialState,
  reducers: {
    setIsOpen: (state, {payload}: PayloadAction<boolean>) => {
      state.isOpen = payload
    },
    reset: () => initialState,
  },
})

export const useMenu = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state[ReduxKey.menu].isOpen)

  const close = useCallback(
    () => dispatch(menuSlice.actions.setIsOpen(false)),
    [dispatch],
  )

  const open = useCallback(
    () => dispatch(menuSlice.actions.setIsOpen(true)),
    [dispatch],
  )

  const toggle = useCallback(
    () => dispatch(menuSlice.actions.setIsOpen(!isOpen)),
    [dispatch, isOpen],
  )

  return {isOpen, close, open, toggle}
}
