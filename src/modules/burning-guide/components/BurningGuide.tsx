import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useSelectedPostalArea} from '@/modules/address/hooks/useSelectedPostalArea'
import {BurningGuideForecastList} from '@/modules/burning-guide/components/BurningGuideForecastList'
import {BurningGuideRecommendation} from '@/modules/burning-guide/components/BurningGuideRecommendation'
import {useGetForecast} from '@/modules/burning-guide/hooks/useGetForecast'
import {ModuleSlug} from '@/modules/slugs'

export const BurningGuide = () => {
  const {
    postalArea,
    isFetching,
    isError: isErrorPostalArea,
  } = useSelectedPostalArea(ModuleSlug['burning-guide'])
  const {error, forecast, isError, isLoading} = useGetForecast(postalArea)

  if (!postalArea) {
    return null
  }

  if (isLoading || isFetching) {
    return <PleaseWait testID="BurningGuideForecastListPleaseWait" />
  }

  if (
    error &&
    typeof error === 'object' &&
    'data' in error &&
    error.data &&
    typeof error.data === 'object' &&
    'postal_code' in error.data &&
    Array.isArray(error.data.postal_code) &&
    error.data.postal_code.every(item => typeof item === 'string')
  ) {
    return (
      <Column gutter="sm">
        <Title
          level="h2"
          testID="BurningGuideAddressOutsideAmsterdamTitle"
          text="Stookinformatie"
        />
        <Phrase>We hebben geen informatie gevonden bij dit adres.</Phrase>
      </Column>
    )
  }

  if (!forecast?.length || isError || isErrorPostalArea) {
    return (
      <SomethingWentWrong testID="BurningGuideForecastListSomethingWentWrong" />
    )
  }

  const recommendation = forecast[0]
  const forecastList = forecast.slice(1)

  return (
    <>
      <BurningGuideRecommendation recommendation={recommendation} />
      <BurningGuideForecastList list={forecastList} />
    </>
  )
}
