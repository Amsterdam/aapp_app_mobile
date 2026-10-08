import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelectedAddress} from '@/modules/address/exports/hooks/useSelectedAddress'
import type {LocationType} from '@/modules/address/exports/types'
import {usePiwikTrackLocationType} from '@/modules/address/hooks/usePiwikTrackLocationType'
import {addressSlice} from '@/modules/address/slice'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'

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
