import {ComponentType} from 'react'
import type {BurningGuideStackParams} from '@/modules/burning-guide/routes'
import type {NotificationHistoryStackParams} from '@/modules/notification-history/routes'
import type {OpenCityStackParams} from '@/modules/open-city/routes'
import type {SurveyStackParams} from '@/modules/survey/routes'
import {RootStackParams, StackNavigationRoutes} from '@/app/navigation/types'
import {AccessCodeStack} from '@/modules/access-code/Stack'
import {AccessCodeStackParams} from '@/modules/access-code/routes'
import {AddressStack} from '@/modules/address/Stack'
import {AddressModalParams, AddressStackParams} from '@/modules/address/routes'
import {BurningGuideStack} from '@/modules/burning-guide/Stack'
import {ChatStack} from '@/modules/chat/Stack'
import {CityPassStack} from '@/modules/city-pass/Stack'
import {
  CityPassModalParams,
  CityPassStackParams,
} from '@/modules/city-pass/routes'
import {ConstructionWorkStack} from '@/modules/construction-work/Stack'
import {ConstructionWorkStackParams} from '@/modules/construction-work/routes'
import {ConstructionWorkEditorStack} from '@/modules/construction-work-editor/Stack'
import {
  ConstructionWorkEditorModalParams,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {ContactStack} from '@/modules/contact/Stack'
import {ContactModalParams, ContactStackParams} from '@/modules/contact/routes'
import {ElectionsStack} from '@/modules/elections/Stack'
import {ElectionsStackParams} from '@/modules/elections/routes'
import {modals as modalsGenerated} from '@/modules/generated/modals.generated'
import {HomeStack} from '@/modules/home/Stack'
import {HomeModalParams, HomeStackParams} from '@/modules/home/routes'
import {MijnAmsterdamStack} from '@/modules/mijn-amsterdam/Stack'
import {MijnAmsterdamStackParams} from '@/modules/mijn-amsterdam/routes'
import {NotificationHistoryStack} from '@/modules/notification-history/Stack'
import {OnboardingStack} from '@/modules/onboarding/Stack'
import {OnboardingStackParams} from '@/modules/onboarding/routes'
import {OpenCityStack} from '@/modules/open-city/Stack'
import {ParkingStack} from '@/modules/parking/Stack'
import {ParkingStackParams} from '@/modules/parking/routes'
import {RedirectsStack} from '@/modules/redirects/Stack'
import {RedirectsStackParams} from '@/modules/redirects/routes'
import {ReportProblemStack} from '@/modules/report-problem/Stack'
import {
  ReportProblemModalParams,
  ReportProblemStackParams,
} from '@/modules/report-problem/routes'
import {ModuleSlug} from '@/modules/slugs'
import {SurveyStack} from '@/modules/survey/Stack'
import {UserStack} from '@/modules/user/Stack'
import {UserModalParams, UserStackParams} from '@/modules/user/routes'
import {WasteContainerStack} from '@/modules/waste-container/Stack'
import {
  WasteContainerModalParams,
  WasteContainerStackParams,
} from '@/modules/waste-container/routes'
import {WasteGuideStack} from '@/modules/waste-guide/Stack'
import {
  WasteGuideModalParams,
  WasteGuideStackParams,
} from '@/modules/waste-guide/routes'
import {devError} from '@/processes/development'

export type ModuleStackParams = AccessCodeStackParams &
  AddressStackParams &
  BurningGuideStackParams &
  CityPassStackParams &
  ConstructionWorkStackParams &
  ConstructionWorkEditorStackParams &
  ContactStackParams &
  ElectionsStackParams &
  HomeStackParams &
  MijnAmsterdamStackParams &
  OnboardingStackParams &
  OpenCityStackParams &
  ParkingStackParams &
  RedirectsStackParams &
  ReportProblemStackParams &
  SurveyStackParams &
  UserStackParams &
  WasteContainerStackParams &
  WasteGuideStackParams &
  NotificationHistoryStackParams

const stacks: Record<ModuleSlug, ComponentType<unknown>> = {
  [ModuleSlug['access-code']]: AccessCodeStack,
  [ModuleSlug.address]: AddressStack,
  [ModuleSlug['burning-guide']]: BurningGuideStack,
  [ModuleSlug.chat]: ChatStack,
  [ModuleSlug['city-pass']]: CityPassStack,
  [ModuleSlug['construction-work']]: ConstructionWorkStack,
  [ModuleSlug['construction-work-editor']]: ConstructionWorkEditorStack,
  [ModuleSlug.contact]: ContactStack,
  [ModuleSlug.home]: HomeStack,
  [ModuleSlug['mijn-amsterdam']]: MijnAmsterdamStack,
  [ModuleSlug['notification-history']]: NotificationHistoryStack,
  [ModuleSlug.onboarding]: OnboardingStack,
  [ModuleSlug['open-city']]: OpenCityStack,
  [ModuleSlug.parking]: ParkingStack,
  [ModuleSlug['waste-container']]: WasteContainerStack,
  [ModuleSlug['report-problem']]: ReportProblemStack,
  [ModuleSlug.user]: UserStack,
  [ModuleSlug.redirects]: RedirectsStack,
  [ModuleSlug.survey]: SurveyStack,
  [ModuleSlug.elections]: ElectionsStack,
  [ModuleSlug['waste-guide']]: WasteGuideStack,
}

export type ModalParams = AddressModalParams &
  CityPassModalParams &
  ConstructionWorkEditorModalParams &
  ContactModalParams &
  HomeModalParams &
  WasteContainerModalParams &
  ReportProblemModalParams &
  UserModalParams &
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
