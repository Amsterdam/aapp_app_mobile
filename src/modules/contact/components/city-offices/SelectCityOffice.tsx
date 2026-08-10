import {Fragment} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {useSetBottomSheetElementFocus} from '@/hooks/accessibility/useSetBottomSheetElementFocus'
import {CityOfficeButton} from '@/modules/contact/components/city-offices/CityOfficeButton'
import {useGetCityOfficesQuery} from '@/modules/contact/service'

export const SelectCityOffice = () => {
  const focusRef = useSetBottomSheetElementFocus()
  const {
    data: cityOffices,
    isLoading,
    startedTimeStamp,
  } = useGetCityOfficesQuery()

  if (isLoading || !cityOffices) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="ContactSelectCityOfficesLoadingSpinner"
      />
    )
  }

  return (
    <Box grow>
      <Title
        accessibilityHint="selecteer een stadsloket"
        level="h3"
        ref={focusRef}
        text="Stadsloketten"
      />
      <Gutter height="md" />
      {cityOffices.map(cityOffice => (
        <Fragment key={cityOffice.identifier}>
          <CityOfficeButton cityOffice={cityOffice} />
          <Gutter height="sm" />
        </Fragment>
      ))}
      <Gutter height="md" />
    </Box>
  )
}
