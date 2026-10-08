import {useIsLoggedIn as useIsLoggedIn0} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {useIsLoggedIn as useIsLoggedIn1} from '@/modules/city-pass/hooks/useIsLoggedIn'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useIsLoggedIn as useIsLoggedIn2} from '@/modules/mijn-amsterdam/hooks/useIsLoggedIn'
import {useIsLoggedIn as useIsLoggedIn3} from '@/modules/mijn-amsterdam-new/hooks/useIsLoggedIn'
import {useIsLoggedIn as useIsLoggedIn4} from '@/modules/parking/hooks/useIsLoggedIn'

export const useIsLoggedIn = {
  [ModuleSlug['boat-charging']]: useIsLoggedIn0,
  [ModuleSlug['city-pass']]: useIsLoggedIn1,
  [ModuleSlug['mijn-amsterdam']]: useIsLoggedIn2,
  [ModuleSlug['mijn-amsterdam-new']]: useIsLoggedIn3,
  [ModuleSlug.parking]: useIsLoggedIn4,
} satisfies Partial<
  Record<
    ModuleSlug,
    () => {isLoading?: boolean; isLoggedIn: boolean; refetch?: () => void}
  >
>
