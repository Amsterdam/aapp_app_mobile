import {ComponentType} from 'react'
import type {KingsdayModalParams} from '@/modules/kingsday/routes'
import type {NewsModalParams} from '@/modules/news/routes'
import type {ServiceModalParams} from '@/modules/service/routes'
import {RootStackParams, StackNavigationRoutes} from '@/app/navigation/types'
import {AddressModalParams} from '@/modules/address/routes'
import {CityPassModalParams} from '@/modules/city-pass/routes'
import {ConstructionWorkEditorModalParams} from '@/modules/construction-work-editor/routes'
import {ContactModalParams} from '@/modules/contact/routes'
import {modals as modalsGenerated} from '@/modules/generated/modals.generated'
import {stacks as stacksGenerated} from '@/modules/generated/stacks.generated'
import {HomeModalParams} from '@/modules/home/routes'
import {ReportProblemModalParams} from '@/modules/report-problem/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserModalParams} from '@/modules/user/routes'
import {WasteContainerModalParams} from '@/modules/waste-container/routes'
import {WasteGuideModalParams} from '@/modules/waste-guide/routes'
import {devError} from '@/processes/development'

export type {ModuleStackParams} from '@/modules/generated/moduleStackParams.generated'

export type ModalParams = AddressModalParams &
  CityPassModalParams &
  ConstructionWorkEditorModalParams &
  ContactModalParams &
  HomeModalParams &
  KingsdayModalParams &
  WasteContainerModalParams &
  NewsModalParams &
  ReportProblemModalParams &
  UserModalParams &
  ServiceModalParams &
  WasteGuideModalParams

const stacks: Record<ModuleSlug, ComponentType<unknown>> = stacksGenerated

export const modals: StackNavigationRoutes<RootStackParams> = modalsGenerated

export const getModuleStack = (
  slug: ModuleSlug,
): ComponentType<unknown> | null => {
  const stack = stacks[slug]

  if (stack) {
    return stack
  }

  devError(
    `Stack not found for module with slug ${slug}. Add it to @/modules/stacks.ts.`,
  )

  return null
}
