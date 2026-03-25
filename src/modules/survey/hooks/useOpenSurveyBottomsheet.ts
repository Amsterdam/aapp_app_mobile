import {useCallback, useContext} from 'react'
import {BottomSheetContext} from '@/components/features/bottom-sheet/providers/bottomSheet.context'
import {useIsModuleActive} from '@/hooks/useIsModuleActive'
import {ModuleSlug} from '@/modules/slugs'
import {useShouldShowBottomsheetSurvey} from '@/modules/survey/hooks/useShouldShowBottomsheetSurvey'
import {useBottomSheetSurveyEntryPoint} from '@/modules/survey/slice'

export const useOpenSurveyBottomsheet = (
  paramSettingsAlwaysShow: boolean,
  entryPoint: string,
  onHasShownSurvey: () => void,
) => {
  const {open} = useContext(BottomSheetContext)
  const {addEntryPoint} = useBottomSheetSurveyEntryPoint()
  const isSurveyModuleActive = useIsModuleActive(ModuleSlug.survey)
  const shouldShowSurvey = useShouldShowBottomsheetSurvey(entryPoint)

  return useCallback(
    (variant?: string) => {
      if (
        isSurveyModuleActive &&
        (paramSettingsAlwaysShow || shouldShowSurvey)
      ) {
        addEntryPoint(entryPoint)
        open(variant)
        onHasShownSurvey()
      }
    },
    [
      isSurveyModuleActive,
      paramSettingsAlwaysShow,
      shouldShowSurvey,
      addEntryPoint,
      entryPoint,
      open,
      onHasShownSurvey,
    ],
  )
}
