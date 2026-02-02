import {Column} from '@/components/ui/layout/Column'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {HighAccuracyPurposeKey} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'

export const BurningGuideAddress = () => (
  <Column gutter="lg">
    <AddressSwitch
      highAccuracyPurposeKey={
        HighAccuracyPurposeKey.PreciseLocationAddressBurningGuide
      }
      moduleSlug={ModuleSlug['burning-guide']}
      noAddressText="Kies uw adres om het stookadvies voor vandaag te bekijken."
      noAddressTitle="Stookinformatie"
      testID="BurningGuideAddressSwitch"
    />
  </Column>
)
