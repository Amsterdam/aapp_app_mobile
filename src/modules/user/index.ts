import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {UserRouteName} from '@/modules/user/routes'
import {createCoreModule} from '@/modules/utils/createModule'

export const userModule = createCoreModule({
  name: 'UserModule',
  slug: ModuleSlug.user,
  linking: {
    [UserRouteName.accounts]: {
      path: 'mijn-amsterdam/:loginResult',
      alias: ['mijn-amsterdam/logout'],
    },
  },
})
