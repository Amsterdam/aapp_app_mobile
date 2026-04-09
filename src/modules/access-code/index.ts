import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {accessCodeSlice, AccessCodeState} from '@/modules/access-code/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createCoreModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof AccessCodeState)[] = [
  'attemptsLeft',
  'useBiometrics',
]

export const accessCodeModule = createCoreModule({
  name: 'AccessCodeModule',
  linking: {
    [AccessCodeRouteName.accessCode]: {
      path: `/${ModuleSlug['access-code']}`,
    },
  },
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
