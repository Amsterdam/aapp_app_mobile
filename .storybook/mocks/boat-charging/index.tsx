import {createContext, type ReactNode, useContext} from 'react'
import {BoatChargingSessionContext} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {
  type BoatChargingSession,
  SessionLengthStatus,
} from '@/modules/boat-charging/types'

type Props = {
  chargingTimeVeryShortString?: string
  children: ReactNode
  sessions: BoatChargingSession[]
}

const BoatChargingStorybookContext = createContext<Omit<Props, 'children'>>({
  sessions: [],
})

export const BoatChargingStorybookProvider = ({children, ...value}: Props) => (
  <BoatChargingStorybookContext value={value}>
    {children}
  </BoatChargingStorybookContext>
)

export const useIsLoggedIn = () => ({
  isLoggedIn: true,
  username: 'storybook',
})

export const useBoatChargingSessions = () => {
  const {sessions} = useContext(BoatChargingStorybookContext)

  return {activeSessions: sessions, isError: false, isLoading: false}
}

type SessionProviderProps = {
  children: ReactNode
  id: BoatChargingSession['id']
}

export const BoatChargingSessionProvider = ({
  children,
  id,
}: SessionProviderProps) => {
  const {sessions, chargingTimeVeryShortString} = useContext(
    BoatChargingStorybookContext,
  )

  return (
    <BoatChargingSessionContext
      value={{
        session: sessions.find(session => session.id === id),
        chargingTimeVeryShortString,
        isPluggedIn: true,
        isError: false,
        isLoading: false,
        isNotPluggedInErrorVisible: false,
        onPressStartButtonNotPluggedIn: () => undefined,
        sessionLengthStatus: SessionLengthStatus.normal,
      }}>
      {children}
    </BoatChargingSessionContext>
  )
}
