import {useIsLoggedIn as useIsLoggedIn0} from '@/modules/boat-charging/useIsLoggedIn'
import {useIsLoggedIn as useIsLoggedIn1} from '@/modules/city-pass/useIsLoggedIn'
import {useIsLoggedIn as useIsLoggedIn2} from '@/modules/mijn-amsterdam/useIsLoggedIn'
import {useIsLoggedIn as useIsLoggedIn3} from '@/modules/parking/useIsLoggedIn'
import {ModuleSlug} from '@/modules/slugs'

export const useIsLoggedIn = {
  [ModuleSlug['boat-charging']]: useIsLoggedIn0,
  [ModuleSlug['city-pass']]: useIsLoggedIn1,
  [ModuleSlug['mijn-amsterdam']]: useIsLoggedIn2,
  [ModuleSlug.parking]: useIsLoggedIn3,
} satisfies Partial<
  Record<
    ModuleSlug,
    () => {isLoading?: boolean; isLoggedIn: boolean; refetch?: () => void}
  >
>
