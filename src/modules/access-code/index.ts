import {accessCodeSlice, AccessCodeState} from '@/modules/access-code/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createCoreModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof AccessCodeState)[] = [
  'attemptsLeft',
  'useBiometrics',
]

export const accessCodeModule = createCoreModule({
  name: 'AccessCodeModule',
  reduxConfigs: [
    {
      key: ReduxKey.accessCode,
      persistVersion: 0,
      persistWhitelist,
      slice: accessCodeSlice,
    },
  ],
  slug: ModuleSlug['access-code'],
})
