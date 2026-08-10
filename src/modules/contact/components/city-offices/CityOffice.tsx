import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSelector} from '@/hooks/redux/useSelector'
import {NameAndAddress} from '@/modules/contact/components/city-offices/NameAndAddress'
import {VisitingHours} from '@/modules/contact/components/city-offices/VisitingHours'
import {VisitingHoursExceptions} from '@/modules/contact/components/city-offices/VisitingHoursExceptions'
import {VisitingHoursToday} from '@/modules/contact/components/city-offices/VisitingHoursToday'
import {useGetCityOfficesQuery} from '@/modules/contact/service'
import {selectCityOffice} from '@/modules/contact/slice'

export const CityOffice = () => {
  const selectedCityOfficeId = useSelector(selectCityOffice)
  const {
    data: cityOffices,
    isLoading,
    refetch,
    startedTimeStamp,
  } = useGetCityOfficesQuery()

  if (isLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="ContactCityOfficesLoadingSpinner"
      />
    )
  }

  const cityOfficeId = selectedCityOfficeId ?? cityOffices?.[0]?.identifier
  const cityOffice = cityOffices?.find(c => c.identifier === cityOfficeId)

  if (!cityOffice) {
    return (
      <SomethingWentWrong
        inset="md"
        retryFn={refetch}
        testID="ContactCityOfficeSomethingWentWrong"
        text="Door een technische storing is het Stadsloket niet te zien. Probeer het later nog eens."
        title=""
      />
    )
  }

  const {
    title,
    address,
    appointment,
    addressContent,
    directionsUrl,
    visitingHours,
    visitingHoursContent,
  } = cityOffice

  return (
    <Box>
      <Column gutter="xl">
        <Column gutter="md">
          <Title
            level="h2"
            testID="ContactVisitUsTitle"
            text="Bezoek ons"
          />
          <NameAndAddress
            address={address}
            addressContent={addressContent}
            title={title}
          />
          <VisitingHoursToday
            visitingHours={visitingHours.regular}
            visitingHoursExceptions={visitingHours.exceptions}
          />
        </Column>
        <VisitingHoursExceptions
          visitingHoursExceptions={visitingHours.exceptions}
        />
        <VisitingHours
          visitingHours={visitingHours.regular}
          visitingHoursContent={visitingHoursContent}
        />
        {!!appointment && (
          <Column gutter="md">
            <Paragraph testID="ContactMakeAppointmentParagraph">
              {appointment.text}
            </Paragraph>
            <ExternalLinkButton
              accessibilityHint="Opent een link naar een formulier."
              label="Maak een afspraak"
              testID="ContactMakeAppointmentExternalLinkButton"
              url={appointment.url}
            />
          </Column>
        )}
        {!!directionsUrl && (
          <ExternalLinkButton
            accessibilityHint="Opent een link naar Google Maps."
            label="Route bekijken"
            testID="ContactSeeRouteExternalLinkButton"
            url={directionsUrl}
            variant="secondary"
          />
        )}
      </Column>
    </Box>
  )
}
