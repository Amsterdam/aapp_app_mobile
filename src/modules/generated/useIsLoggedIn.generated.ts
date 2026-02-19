import {useIsLoggedIn as useIsLoggedIn0} from '@/modules/city-pass/useIsLoggedIn'
import {useIsLoggedIn as useIsLoggedIn1} from '@/modules/mijn-amsterdam/useIsLoggedIn'
import {useIsLoggedIn as useIsLoggedIn2} from '@/modules/parking/useIsLoggedIn'
import {ModuleSlug} from '@/modules/slugs'

export const useIsLoggedIn = {
  [ModuleSlug['city-pass']]: useIsLoggedIn0,
  [ModuleSlug['mijn-amsterdam']]: useIsLoggedIn1,
  [ModuleSlug.parking]: useIsLoggedIn2,
} satisfies Partial<
  Record<ModuleSlug, () => {isLoading?: boolean; isLoggedIn: boolean}>
>
