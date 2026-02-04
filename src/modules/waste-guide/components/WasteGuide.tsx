import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {WasteGuideContent} from '@/modules/waste-guide/components/WasteGuideContent'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'

export const WasteGuide = () => {
  const {
    getWasteGuideIsError,
    isFetchingAddress,
    isFetchingWasteGuide,
    hasValidAddress,
    wasteGuide,
  } = useGetWasteGuide()

  const loadingError = getWasteGuideIsError || !wasteGuide
  const hasContent = wasteGuide && wasteGuide.waste_types.length > 0

  if (!hasValidAddress) {
    return null
  }

  if (isFetchingAddress || isFetchingWasteGuide) {
    return <PleaseWait testID="WasteGuideLoadingSpinner" />
  }

  if (loadingError) {
    return (
      <SomethingWentWrong
        testID="WasteGuideSomethingWentWrong"
        text="Probeer het later nog een keer."
        title="Helaas is de afvalwijzer nu niet beschikbaar"
      />
    )
  }

  if (hasContent) {
    return <WasteGuideContent />
  }

  return <WasteGuideNotFound />
}
