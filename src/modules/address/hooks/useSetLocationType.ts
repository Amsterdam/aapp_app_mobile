import type {LocationType} from '@/modules/address/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {usePiwikTrackLocationType} from '@/modules/address/hooks/usePiwikTrackLocationType'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {addressSlice} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

export const useSetLocationType = (moduleSlug: ModuleSlug) => {
  const dispatch = useDispatch()
  const trackPiwikLocationType = usePiwikTrackLocationType()
  const {locationType} = useSelectedAddress(moduleSlug)

  return (newLocationType: LocationType) => {
    dispatch(
      addressSlice.actions.setLocationType({
        locationType: newLocationType,
        moduleSlug,
      }),
    )
    trackPiwikLocationType(moduleSlug, newLocationType, locationType)
  }
}
