import type {ModuleClientConfig, CoreModuleConfig} from '@/modules/types'
import {accessCodeModule} from '@/modules/access-code'
import {addressModule} from '@/modules/address'
import {burningGuideModule} from '@/modules/burning-guide'
import {chatModule} from '@/modules/chat'
import {cityPassModule} from '@/modules/city-pass'
import {constructionWorkModule} from '@/modules/construction-work'
import {constructionWorkEditorModule} from '@/modules/construction-work-editor'
import {contactModule} from '@/modules/contact'
import {electionsModule} from '@/modules/elections'
import {homeModule} from '@/modules/home'
import {mijnAmsterdamModule} from '@/modules/mijn-amsterdam'
import {notificationHistoryModule} from '@/modules/notification-history'
import {onboardingModule} from '@/modules/onboarding'
import {openCityModule} from '@/modules/open-city'
import {parkingModule} from '@/modules/parking'
import {redirectsModule} from '@/modules/redirects'
import {reportProblemModule} from '@/modules/report-problem'
import {surveyModule} from '@/modules/survey'
import {userModule} from '@/modules/user'
import {wasteContainerModule} from '@/modules/waste-container'
import {wasteGuideModule} from '@/modules/waste-guide'

/**
 * Core Modules don't have a server part and are always loaded.
 */
export const coreModules = [
  accessCodeModule,
  addressModule,
  homeModule,
  onboardingModule,
  userModule,
]

/**
 * Client Modules have a server part and can be turned on/off per release.
 */
export const clientModules = [
  burningGuideModule,
  chatModule,
  cityPassModule,
  constructionWorkEditorModule,
  constructionWorkModule,
  contactModule,
  electionsModule,
  mijnAmsterdamModule,
  notificationHistoryModule,
  openCityModule,
  parkingModule,
  redirectsModule,
  reportProblemModule,
  surveyModule,
  wasteContainerModule,
  wasteGuideModule,
]

export const allModules: Array<ModuleClientConfig | CoreModuleConfig> = [
  ...coreModules,
  ...clientModules,
]
