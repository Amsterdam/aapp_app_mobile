import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const mamsIncomeModule = createClientModule({
  name: 'MamsIncomeModule',
  // linking: {
  // [ModuleSlug['mams-income']]: ModuleSlug['mams-income'],
  // },
  slug: ModuleSlug['mams-income'],
})
