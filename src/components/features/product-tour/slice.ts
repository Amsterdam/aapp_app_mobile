import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Tip} from '@/components/features/product-tour/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ProductTourState = {
  seenTips: Tip[]
}

const initialState: ProductTourState = {seenTips: []}

export const productTourSlice = createSlice({
  name: ReduxKey.productTour,
  initialState,
  reducers: {
    resetSeenTips: () => initialState,
    addSeenTip: (state, {payload}: PayloadAction<Tip>) => {
      const {seenTips} = state

      if (!seenTips.includes(payload)) {
        seenTips.push(payload)
      }
    },
  },
})

export const {addSeenTip, resetSeenTips} = productTourSlice.actions

export const selectSeenTips = (state: RootState) =>
  state[ReduxKey.productTour]?.seenTips
