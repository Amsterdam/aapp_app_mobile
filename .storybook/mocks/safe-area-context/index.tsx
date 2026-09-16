import {createContext} from 'react'

const safeAreaFrame = {
  height: 100,
  width: 100,
  x: 0,
  y: 0,
}

const safeAreaInsets = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
}

export const initialWindowMetrics = {
  frame: safeAreaFrame,
  insets: safeAreaInsets,
}

export const SafeAreaFrameContext = createContext(safeAreaFrame)

export const SafeAreaInsetsContext = createContext(safeAreaInsets)

export const useSafeAreaInsets = () => safeAreaInsets

type Props = {children: React.ReactNode}

export const SafeAreaProvider = ({children}: Props) => (
  <SafeAreaFrameContext.Provider value={safeAreaFrame}>
    <SafeAreaInsetsContext.Provider value={safeAreaInsets}>
      {children}
    </SafeAreaInsetsContext.Provider>
  </SafeAreaFrameContext.Provider>
)
