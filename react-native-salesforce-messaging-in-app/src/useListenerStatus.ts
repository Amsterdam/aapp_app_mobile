import {useState, useRef, useEffect} from 'react'
import {type EventSubscription} from 'react-native'
import type {EventEmitter} from 'react-native/Libraries/Types/CodegenTypes'

export const useListenerStatus = <T extends S, S>(
  eventEmitter: EventEmitter<S>,
) => {
  const [listenerStatus, setListenerStatus] = useState<T | null>(null)
  const onListenerStatusChangedSubscription = useRef<EventSubscription | null>(
    null,
  )

  useEffect(() => {
    onListenerStatusChangedSubscription.current?.remove()

    onListenerStatusChangedSubscription.current = eventEmitter((state: S) => {
      if (state == null || (typeof state === 'string' && state.length === 0)) {
        // On iOS the connection state did not reset properly between chats.
        // The fix is to return an empty string from the Native event emitter ([self emitOnConnectionStatusChanged:@""]) to indicate a reset.
        // We catch this scenario here.
        setListenerStatus(null)

        return
      }

      setListenerStatus(state as T)
    })

    return () => {
      onListenerStatusChangedSubscription.current?.remove()
      onListenerStatusChangedSubscription.current = null
    }
  }, [eventEmitter])

  return listenerStatus
}
