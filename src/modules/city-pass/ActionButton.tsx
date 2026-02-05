import {useCallback} from 'react'
import {ActionButton as ActionButtonBase} from '@/components/ui/buttons/ActionButton'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {cityPassModule} from '@/modules/city-pass'
import {useGetSecureCityPasses} from '@/modules/city-pass/hooks/useGetSecureCityPasses'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {ModuleSlug} from '@/modules/slugs'
import {useGetCachedServerModule} from '@/store/slices/modules'

export const ActionButton = () => {
  const {navigate} = useNavigation()
  const {isInactive: isModuleInactive} = useGetCachedServerModule(
    cityPassModule.slug,
  )
  const secureCityPasses = useGetSecureCityPasses()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)

  const onPress = useCallback(() => {
    navigate(ModuleSlug['city-pass'], {
      screen: CityPassRouteName.cityPasses,
    })
  }, [navigate])

  if (!secureCityPasses?.length || !isCityPassOwnerRegistered) {
    return null
  }

  return (
    <Column>
      <ActionButtonBase
        icon={{isFilled: true, name: 'city-pass'}}
        isModuleInactive={isModuleInactive}
        label="Stadspas tonen"
        onPress={onPress}
        testID="CityPassActionButton"
      />
      <Gutter height="lg" />
    </Column>
  )
}
