import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
import {createCoreModule} from '@/modules/utils/createModule'

export const coreModule = createCoreModule({
  name: 'UserModule',
  slug: ModuleSlug.user,
  linking: {
    [UserRouteName.accounts]: {
      path: 'mijn-amsterdam/:loginResult',
      alias: ['mijn-amsterdam/logout'],
    },
  },
})
