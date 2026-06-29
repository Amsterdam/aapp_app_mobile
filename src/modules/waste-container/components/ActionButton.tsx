import {useCallback} from 'react'
import {ActionButton as ActionButtonBase} from '@/components/ui/buttons/ActionButton'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useGetSecureItem} from '@/hooks/secureStorage/useGetSecureItem'
import {ModuleSlug} from '@/modules/slugs'
import {wasteContainerModule} from '@/modules/waste-container'
import {WasteContainerRouteName} from '@/modules/waste-container/routes'
import {useGetCachedServerModule} from '@/store/slices/modules'
import {SecureItemKey} from '@/utils/secureStorage'

export const ActionButton = () => {
  const {navigate} = useNavigation()
  const {isInactive} = useGetCachedServerModule(wasteContainerModule.slug)
  const {item: secureWasteCardNumber, isLoading} = useGetSecureItem(
    SecureItemKey.wasteCardNumber,
  )

  const onPress = useCallback(() => {
    navigate(ModuleSlug['waste-container'], {
      screen: WasteContainerRouteName.wasteCard,
    })
  }, [navigate])

  if (isLoading || !secureWasteCardNumber) {
    return null
  }

  return (
    <Column>
      <ActionButtonBase
        icon={{name: 'afvalpas'}}
        isModuleInactive={isInactive}
        label="Afvalpas tonen"
        onPress={onPress}
        testID="WasteContainerActionButton"
      />
      <Gutter height="lg" />
    </Column>
  )
}
