import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ChatVisibility} from '@/modules/chat/types'
import {ReduxKey} from '@/store/types/reduxKey'
import {type RootState} from '@/store/types/rootState'

export type ChatState = {
  conversationId: string | undefined
  headerHeight: number
  isOpen: boolean
  minimizedHeight: number
  visibility: ChatVisibility
}

const initialState: ChatState = {
  headerHeight: 0,
  isOpen: false,
  minimizedHeight: 0,
  visibility: ChatVisibility.maximized,
  conversationId: undefined,
}

export const chatSlice = createSlice({
  name: ReduxKey.chat,
  initialState,
  reducers: {
    closeChat: state => ({
      ...state,
      isOpen: false,
    }),
    maximizeChat: state => ({
      ...state,
      visibility: ChatVisibility.maximized,
    }),
    minimizeChat: state => ({
      ...state,
      visibility: ChatVisibility.minimized,
    }),

    setHeightMinimized: (state, {payload: height}: PayloadAction<number>) => ({
      ...state,
      minimizedHeight: height,
    }),
    openChat: state => ({
      ...state,
      isOpen: true,
      visibility: ChatVisibility.maximized,
    }),
    clearChatMessages: state => ({
      ...state,
      messages: [],
    }),
    toggleChatIsOpen: state => ({
      ...state,
      isOpen: !state.isOpen,
    }),
    toggleChatVisibility: state => ({
      ...state,
      visibility:
        state.visibility === ChatVisibility.maximized
          ? ChatVisibility.minimized
          : ChatVisibility.maximized,
    }),
    setChatConversationId: (
      state,
      {payload: conversationId}: PayloadAction<string | undefined>,
    ) => ({
      ...state,
      conversationId,
    }),
    setChatHeaderHeight: (
      state,
      {payload: headerHeight}: PayloadAction<number>,
    ) => ({
      ...state,
      headerHeight,
    }),
    setIsChatMenuOpen: (
      state,
      {payload: isMenuOpen}: PayloadAction<boolean>,
    ) => ({
      ...state,
      isMenuOpen,
    }),
    reset: () => initialState,
  },
})

export const {
  closeChat,
  openChat,
  minimizeChat,
  setHeightMinimized,
  toggleChatIsOpen,
  toggleChatVisibility,
  setChatConversationId,
  setChatHeaderHeight,
} = chatSlice.actions

export const {maximizeChat} = chatSlice.actions

export const selectChatIsOpen = (state: RootState) =>
  state[ReduxKey.chat].isOpen
export const selectChatVisibility = (state: RootState) =>
  state[ReduxKey.chat].visibility

export const selectChatMinimizedHeight = (state: RootState) =>
  state[ReduxKey.chat].minimizedHeight

export const selectChatConversationId = (state: RootState) =>
  state[ReduxKey.chat].conversationId

export const selectChatHeaderHeight = (state: RootState) =>
  state[ReduxKey.chat].headerHeight
