import {useSelector} from '@/hooks/redux/useSelector'
import {selectLocationType} from '@/modules/address/slice'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'

export const useLocationType = (moduleSlug: ModuleSlug) =>
  useSelector(selectLocationType(moduleSlug))
