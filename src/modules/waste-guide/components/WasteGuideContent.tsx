import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useSelector} from '@/hooks/redux/useSelector'
import {ContactCollector} from '@/modules/waste-guide/components/ContactCollector'
import {Fractions} from '@/modules/waste-guide/components/Fractions'
import {NavigationButtonToWasteCalendar} from '@/modules/waste-guide/components/NavigationButtonToWasteCalendar'
import {ReportWrongBuildingType} from '@/modules/waste-guide/components/ReportWrongBuildingType'
import {SelectContract} from '@/modules/waste-guide/components/SelectContract'
import {WRONG_WASTE_GUIDE_INFO_REACTION_FORM_URL} from '@/modules/waste-guide/external-links'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {selectContract} from '@/modules/waste-guide/slice'
import {WasteGuideResponse} from '@/modules/waste-guide/types'
import {getFractionsForCollectionByAppointment} from '@/modules/waste-guide/utils/getFractionsForCollectionByAppointment'

export const WasteGuideContent = () => {
  const {address, wasteGuide} = useGetWasteGuide()
  const openWebUrl = useOpenWebUrl()
  const contract = useSelector(selectContract(address?.bagId))
  const fractions = wasteGuide?.is_collection_by_appointment
    ? getFractionsForCollectionByAppointment(wasteGuide?.waste_types)
    : wasteGuide?.waste_types

  if (!address || !fractions || !wasteGuide) {
    return (
      <SomethingWentWrong testID="WasteGuideWasteGuideForAmsterdamSomethingWentWrong" />
    )
  }

  if (wasteGuide.is_residential) {
    return (
      <WasteGuideCollectionInformation
        fractions={fractions}
        hasCalendar={!!wasteGuide.calendar.length}
        isCollectionByAppointment={wasteGuide.is_collection_by_appointment}
      />
    )
  }

  return (
    <Column gutter="xl">
      <ReportWrongBuildingType testID="WasteGuideReportWrongBuildingType" />
      <SelectContract bagNummeraanduidingId={address.bagId} />
      {contract?.hasContract === false ? (
        <>
          <WasteGuideCollectionInformation
            fractions={fractions}
            hasCalendar={!!wasteGuide.calendar.length}
            isCollectionByAppointment={wasteGuide.is_collection_by_appointment}
          />

          <ExternalLinkButton
            label="Klopt dit niet? Geef het door."
            onPress={() => openWebUrl(WRONG_WASTE_GUIDE_INFO_REACTION_FORM_URL)}
            testID="WasteGuideWrongCollectionInformationButton"
          />
        </>
      ) : (
        <ContactCollector />
      )}
    </Column>
  )
}

type WasteGuideCollectionInformationProps = {
  fractions: WasteGuideResponse['waste_types']
  hasCalendar: boolean
  isCollectionByAppointment: boolean
}

const WasteGuideCollectionInformation = ({
  fractions,
  hasCalendar,
  isCollectionByAppointment,
}: WasteGuideCollectionInformationProps) => (
  <Column gutter="lg">
    <Column gutter="sm">
      <Title
        testID="WasteGuideTitle"
        text="Afvalinformatie"
      />
      {!isCollectionByAppointment && !!hasCalendar && (
        <NavigationButtonToWasteCalendar />
      )}
    </Column>
    <Fractions
      fractions={fractions}
      isCollectionByAppointment={isCollectionByAppointment}
    />
  </Column>
)
