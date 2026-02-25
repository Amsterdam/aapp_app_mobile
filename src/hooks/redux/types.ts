import {AnyAction, Dispatch, ThunkDispatch} from '@reduxjs/toolkit'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReduxDispatch = ThunkDispatch<any, undefined, AnyAction> &
  Dispatch<AnyAction>
