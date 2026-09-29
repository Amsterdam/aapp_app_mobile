import {Column} from '@/components/ui/layout/Column'
import {AddressSwitch} from '@/modules/address/exports/AddressSwitch'
import {HighAccuracyPurposeKey} from '@/modules/address/exports/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

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
