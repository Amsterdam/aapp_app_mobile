import type {ProductTourState} from '@/components/features/product-tour/slice'
import type {AccessCodeState} from '@/modules/access-code/slice'
import type {AddressState} from '@/modules/address/types'
import type {ChatState} from '@/modules/chat/slice'
import type {CityPassState} from '@/modules/city-pass/slice'
import type {ConstructionWorkState} from '@/modules/construction-work/slice'
import type {MessageDraftState} from '@/modules/construction-work-editor/messageDraftSlice'
import type {ConstructionWorkEditorState} from '@/modules/construction-work-editor/slice'
import type {ContactState} from '@/modules/contact/slice'
import type {ElectionsState} from '@/modules/elections/slice'
import type {MijnAmsterdamState} from '@/modules/mijn-amsterdam/slice'
import type {OnboardingState} from '@/modules/onboarding/slice'
import type {ParkingState} from '@/modules/parking/slice'
import type {ServiceState} from '@/modules/service/slice'
import type {SportState} from '@/modules/sport/slice'
import type {SurveyState} from '@/modules/survey/slice'
import type {WasteGuideState} from '@/modules/waste-guide/slice'
import type {baseApi} from '@/services/baseApi'
import type {AlertState} from '@/store/slices/alert'
import type {BottomSheetState} from '@/store/slices/bottomSheet'
import type {EnvironmentState} from '@/store/slices/environment'
import type {InternetConnectionState} from '@/store/slices/internetConnection'
import type {MenuState} from '@/store/slices/menu'
import type {ModulesState} from '@/store/slices/modules'
import type {PermissionsState} from '@/store/slices/permissions'
import type {ScreenState} from '@/store/slices/screen'
import type {SecureStorageState} from '@/store/slices/secureStorage'
import type {UpdateState} from '@/store/slices/updateApp'
import type {ReduxKey} from '@/store/types/reduxKey'
import type {ThemeState} from '@/themes/slice'

export type RootState = {
  [baseApi.reducerPath]: typeof baseApi.reducer
  [ReduxKey.accessCode]: AccessCodeState
  [ReduxKey.address]: AddressState
  [ReduxKey.alert]: AlertState
  [ReduxKey.bottomSheet]: BottomSheetState
  [ReduxKey.chat]: ChatState
  [ReduxKey.cityPass]: CityPassState
  [ReduxKey.constructionWork]: ConstructionWorkState
  [ReduxKey.constructionWorkEditor]: ConstructionWorkEditorState
  [ReduxKey.contact]: ContactState
  [ReduxKey.elections]: ElectionsState
  [ReduxKey.environment]: EnvironmentState
  [ReduxKey.internetConnection]: InternetConnectionState
  [ReduxKey.menu]: MenuState
  [ReduxKey.messageDraft]: MessageDraftState
  [ReduxKey.mijnAmsterdam]: MijnAmsterdamState
  [ReduxKey.modules]: ModulesState
  [ReduxKey.onboarding]: OnboardingState
  [ReduxKey.parking]: ParkingState
  [ReduxKey.permissions]: PermissionsState
  [ReduxKey.productTour]: ProductTourState
  [ReduxKey.secureStorage]: SecureStorageState
  [ReduxKey.service]: ServiceState
  [ReduxKey.sport]: SportState
  [ReduxKey.theme]: ThemeState
  [ReduxKey.screen]: ScreenState
  [ReduxKey.survey]: SurveyState
  [ReduxKey.updateApp]: UpdateState
  [ReduxKey.wasteGuide]: WasteGuideState
}
