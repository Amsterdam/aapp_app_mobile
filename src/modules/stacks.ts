import {ComponentType} from 'react'
import type {BoatChargingStackParams} from '@/modules/boat-charging/routes'
import type {BurningGuideStackParams} from '@/modules/burning-guide/routes'
import type {
  KingsdayModalParams,
  KingsdayStackParams,
} from '@/modules/kingsday/routes'
import type {NewsModalParams, NewsStackParams} from '@/modules/news/routes'
import type {NotificationHistoryStackParams} from '@/modules/notification-history/routes'
import type {
  ServiceModalParams,
  ServiceStackParams,
} from '@/modules/service/routes'
import type {SurveyStackParams} from '@/modules/survey/routes'
import {RootStackParams, StackNavigationRoutes} from '@/app/navigation/types'
import {AccessCodeStackParams} from '@/modules/access-code/routes'
import {AddressModalParams, AddressStackParams} from '@/modules/address/routes'
import {
  CityPassModalParams,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {ConstructionWorkStackParams} from '@/modules/construction-work/routes'
import {
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {ContactModalParams, ContactStackParams} from '@/modules/contact/routes'
import {ElectionsStackParams} from '@/modules/elections/routes'
import {modals as modalsGenerated} from '@/modules/generated/modals.generated'
import {stacks as stacksGenerated} from '@/modules/generated/stacks.generated'
import {HomeModalParams, HomeStackParams} from '@/modules/home/routes'
import {OnboardingStackParams} from '@/modules/onboarding/routes'
import {ParkingStackParams} from '@/modules/parking/routes'
import {RedirectsStackParams} from '@/modules/redirects/routes'
import {
  ReportProblemModalParams,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'
import {ModuleSlug} from '@/modules/slugs'
import {UserModalParams, UserStackParams} from '@/modules/user/routes'
import {
  WasteContainerModalParams,
  WasteContainerStackParams,
} from '@/modules/waste-container/routes'
import {
  WasteGuideModalParams,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {devError} from '@/processes/development'

export type ModuleStackParams = AccessCodeStackParams &
  AddressStackParams &
  BoatChargingStackParams &
  BurningGuideStackParams &
  CityPassStackParams &
  ConstructionWorkStackParams &
  ConstructionWorkEditorStackParams &
  ContactStackParams &
  ElectionsStackParams &
  HomeStackParams &
  KingsdayStackParams &
  OnboardingStackParams &
  ParkingStackParams &
  RedirectsStackParams &
  ReportProblemStackParams &
  SurveyStackParams &
  UserStackParams &
  ServiceStackParams &
  WasteContainerStackParams &
  WasteGuideStackParams &
  NotificationHistoryStackParams &
  NewsStackParams

const stacks: Record<ModuleSlug, ComponentType<unknown>> = stacksGenerated

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
