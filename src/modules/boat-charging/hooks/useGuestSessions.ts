import {createSelector} from '@reduxjs/toolkit'
import {useEffect, useMemo} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {boatChargingApi} from '@/modules/boat-charging/service'
import {selectBoatChargingGuestSessionIds} from '@/modules/boat-charging/slice'

const POLLING_INTERVAL = 30000

/**
 * This hooks retrieves all guest sessions based on charging session id's stored on device.
 * Internally, it creates a selector to select cached sessions and their query states. If also registers a subscription to fetch and poll the sessions for up to date data.
 * @param skip If guest sessions do not need to be retrieved (for example, when isLoggedIn === true)
 * @returns
 */
export const useGuestSessions = (skip?: boolean) => {
  const dispatch = useDispatch()
  const guestSessionIds = useSelector(selectBoatChargingGuestSessionIds)

  const selectGuestSessions = useMemo(() => {
    const ids = guestSessionIds ?? []

    return createSelector(
      ids.map(id => boatChargingApi.endpoints.boatChargingSession.select(id)),
      (...sessions) => ({
        sessions: sessions.flatMap(({data}) => (data ? [data] : [])),
        isLoading: sessions.some(
          session =>
            !session.data && (session.isUninitialized || session.isLoading),
        ),
        isError: sessions.some(session => session.isError),
      }),
    )
  }, [guestSessionIds])

  useEffect(() => {
    if (skip) {
      return
    }

    const subscriptions = (guestSessionIds ?? []).map(id =>
      dispatch(
        boatChargingApi.endpoints.boatChargingSession.initiate(id, {
          subscriptionOptions: {pollingInterval: POLLING_INTERVAL},
          forceRefetch: true,
        }),
      ),
    )

    return () =>
      subscriptions.forEach(subscription => subscription.unsubscribe())
  }, [dispatch, guestSessionIds, skip])

  return useSelector(selectGuestSessions)
}
