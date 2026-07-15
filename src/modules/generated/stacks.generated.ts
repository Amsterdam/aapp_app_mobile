import {ModuleStack as stacks0} from '@/modules/access-code/Stack.tsx'
import {ModuleStack as stacks1} from '@/modules/address/Stack.tsx'
import {ModuleStack as stacks2} from '@/modules/boat-charging/Stack.tsx'
import {ModuleStack as stacks3} from '@/modules/burning-guide/Stack.tsx'
import {ModuleStack as stacks4} from '@/modules/chat/Stack.tsx'
import {ModuleStack as stacks5} from '@/modules/city-pass/Stack.tsx'
import {ModuleStack as stacks6} from '@/modules/construction-work/Stack.tsx'
import {ModuleStack as stacks7} from '@/modules/construction-work-editor/Stack.tsx'
import {ModuleStack as stacks8} from '@/modules/contact/Stack.tsx'
import {ModuleStack as stacks9} from '@/modules/elections/Stack.tsx'
import {ModuleStack as stacks10} from '@/modules/home/Stack.tsx'
import {ModuleStack as stacks11} from '@/modules/kingsday/Stack.tsx'
import {ModuleStack as stacks12} from '@/modules/mams-income/Stack.tsx'
import {ModuleStack as stacks13} from '@/modules/mijn-amsterdam/Stack.tsx'
import {ModuleStack as stacks14} from '@/modules/news/Stack.tsx'
import {ModuleStack as stacks15} from '@/modules/notification-history/Stack.tsx'
import {ModuleStack as stacks16} from '@/modules/onboarding/Stack.tsx'
import {ModuleStack as stacks17} from '@/modules/parking/Stack.tsx'
import {ModuleStack as stacks18} from '@/modules/pride/Stack.tsx'
import {ModuleStack as stacks19} from '@/modules/redirects/Stack.tsx'
import {ModuleStack as stacks20} from '@/modules/report-problem/Stack.tsx'
import {ModuleStack as stacks21} from '@/modules/service/Stack.tsx'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleStack as stacks22} from '@/modules/survey/Stack.tsx'
import {ModuleStack as stacks23} from '@/modules/user/Stack.tsx'
import {ModuleStack as stacks24} from '@/modules/waste-container/Stack.tsx'
import {ModuleStack as stacks25} from '@/modules/waste-guide/Stack.tsx'

export const stacks = {
  [ModuleSlug['access-code']]: stacks0,
  [ModuleSlug.address]: stacks1,
  [ModuleSlug['boat-charging']]: stacks2,
  [ModuleSlug['burning-guide']]: stacks3,
  [ModuleSlug.chat]: stacks4,
  [ModuleSlug['city-pass']]: stacks5,
  [ModuleSlug['construction-work']]: stacks6,
  [ModuleSlug['construction-work-editor']]: stacks7,
  [ModuleSlug.contact]: stacks8,
  [ModuleSlug.elections]: stacks9,
  [ModuleSlug.home]: stacks10,
  [ModuleSlug.kingsday]: stacks11,
  [ModuleSlug['mams-income']]: stacks12,
  [ModuleSlug['mijn-amsterdam']]: stacks13,
  [ModuleSlug.news]: stacks14,
  [ModuleSlug['notification-history']]: stacks15,
  [ModuleSlug.onboarding]: stacks16,
  [ModuleSlug.parking]: stacks17,
  [ModuleSlug.pride]: stacks18,
  [ModuleSlug.redirects]: stacks19,
  [ModuleSlug['report-problem']]: stacks20,
  [ModuleSlug.service]: stacks21,
  [ModuleSlug.survey]: stacks22,
  [ModuleSlug.user]: stacks23,
  [ModuleSlug['waste-container']]: stacks24,
  [ModuleSlug['waste-guide']]: stacks25,
} satisfies Record<ModuleSlug, React.ComponentType>
