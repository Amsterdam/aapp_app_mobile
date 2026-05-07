import {useEffect} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {resetSelectedBoatChargingPointId} from '@/modules/boat-charging/slice'

export const BoatChargingPointDetails = () => {
  const dispatch = useDispatch()

  useEffect(
    () => () => {
      dispatch(resetSelectedBoatChargingPointId())
    },
    [dispatch],
  )

  return null
}
