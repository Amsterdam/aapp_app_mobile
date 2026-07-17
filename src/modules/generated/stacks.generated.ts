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
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ModuleStack as stacks10} from '@/modules/home/Stack.tsx'
import {ModuleStack as stacks11} from '@/modules/kingsday/Stack.tsx'
import {ModuleStack as stacks12} from '@/modules/mijn-amsterdam/Stack.tsx'
import {ModuleStack as stacks13} from '@/modules/news/Stack.tsx'
import {ModuleStack as stacks14} from '@/modules/notification-history/Stack.tsx'
import {ModuleStack as stacks15} from '@/modules/onboarding/Stack.tsx'
import {ModuleStack as stacks16} from '@/modules/parking/Stack.tsx'
import {ModuleStack as stacks17} from '@/modules/pride/Stack.tsx'
import {ModuleStack as stacks18} from '@/modules/redirects/Stack.tsx'
import {ModuleStack as stacks19} from '@/modules/report-problem/Stack.tsx'
import {ModuleStack as stacks20} from '@/modules/service/Stack.tsx'
import {ModuleStack as stacks21} from '@/modules/survey/Stack.tsx'
import {ModuleStack as stacks22} from '@/modules/user/Stack.tsx'
import {ModuleStack as stacks23} from '@/modules/waste-container/Stack.tsx'
import {ModuleStack as stacks24} from '@/modules/waste-guide/Stack.tsx'

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
  [ModuleSlug['mijn-amsterdam']]: stacks12,
  [ModuleSlug.news]: stacks13,
  [ModuleSlug['notification-history']]: stacks14,
  [ModuleSlug.onboarding]: stacks15,
  [ModuleSlug.parking]: stacks16,
  [ModuleSlug.pride]: stacks17,
  [ModuleSlug.redirects]: stacks18,
  [ModuleSlug['report-problem']]: stacks19,
  [ModuleSlug.service]: stacks20,
  [ModuleSlug.survey]: stacks21,
  [ModuleSlug.user]: stacks22,
  [ModuleSlug['waste-container']]: stacks23,
  [ModuleSlug['waste-guide']]: stacks24,
} satisfies Record<ModuleSlug, React.ComponentType>
