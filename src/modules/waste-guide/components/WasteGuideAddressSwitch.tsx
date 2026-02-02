import type {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {useRoute} from '@/hooks/navigation/useRoute'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'

import {useDeeplinkModuleAddress} from '@/modules/address/hooks/useDeeplinkModuleAddress'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'

export const WasteGuideAddressSwitch = () => {
  const {params} = useRoute<WasteGuideRouteName.wasteGuide>()

  useDeeplinkModuleAddress(params, ModuleSlug['waste-guide'])

  return (
    <AddressSwitch
      highAccuracyPurposeKey={
        HighAccuracyPurposeKey.PreciseLocationAddressWasteGuide
      }
      moduleSlug={ModuleSlug['waste-guide']}
      noAddressText="Vul uw adres in om te zien wat u met uw afval moet doen."
      noAddressTitle="Afvalinformatie"
      testID="WasteGuideNoAddressAddressSwitch"
    />
  )
}
