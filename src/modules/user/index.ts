import {ModuleSlug} from '@/modules/slugs'
import {UserRouteName} from '@/modules/user/routes'
import {createCoreModule} from '@/modules/utils/createModule'

export const userModule = createCoreModule({
  name: 'UserModule',
  slug: ModuleSlug.user,
  linking: {
    [UserRouteName.accounts]: 'mijn-amsterdam/:loginResult',
  },
})
