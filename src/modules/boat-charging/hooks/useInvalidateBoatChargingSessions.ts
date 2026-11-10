import {useCallback} from 'react'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {boatChargingApi} from '@/modules/boat-charging/service'

export const useInvalidateBoatChargingSessions = () => {
  const dispatch = useDispatch()

  return useCallback(() => {
    dispatch(boatChargingApi.util.invalidateTags(['BoatChargingSessions']))
  }, [dispatch])
}
