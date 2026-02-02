import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {WasteGuideAddressSwitch} from '@/modules/waste-guide/components/WasteGuideAddressSwitch'
import {WasteGuideContent} from '@/modules/waste-guide/components/WasteGuideContent'
import {WasteGuideNotFound} from '@/modules/waste-guide/components/WasteGuideNotFound'
import {WasteCardButton} from '@/modules/waste-guide/components/waste-card/WasteCardButton'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'

export const WasteGuide = () => {
  const {
    getWasteGuideIsError,
    isFetchingAddress,
    isFetchingWasteGuide,
    wasteGuide,
  } = useGetWasteGuide()

  const loadingError = getWasteGuideIsError || !wasteGuide
  const hasContent = wasteGuide && wasteGuide.waste_types.length > 0

  return (
    <Column grow={1}>
      <HorizontalSafeArea flex={1}>
        <Box grow>
          <Column
            flex={1}
            gutter="xl">
            <WasteGuideAddressSwitch />
            {isFetchingWasteGuide || isFetchingAddress ? (
              <PleaseWait testID="WasteGuideLoadingSpinner" />
            ) : (
              <Column gutter="lg">
                <WasteCardButton />

                {loadingError ? (
                  <SomethingWentWrong
                    testID="WasteGuideSomethingWentWrong"
                    text="Probeer het later nog een keer."
                    title="Helaas is de afvalwijzer nu niet beschikbaar"
                  />
                ) : hasContent ? (
                  <WasteGuideContent />
                ) : (
                  <WasteGuideNotFound />
                )}
              </Column>
            )}
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Column>
  )
}
