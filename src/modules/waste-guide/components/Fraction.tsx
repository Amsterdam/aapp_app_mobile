import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {AlertWarning} from '@/components/ui/feedback/alert/AlertWarning'
import {Column} from '@/components/ui/layout/Column'
import {type TestProps} from '@/components/ui/types'
import {FractionButtonSection} from '@/modules/waste-guide/components/FractionButtonSection'
import {FractionContent} from '@/modules/waste-guide/components/FractionContent'
import {FractionSection} from '@/modules/waste-guide/components/FractionSection'
import {NavigationButtonToWasteCalendar} from '@/modules/waste-guide/components/NavigationButtonToWasteCalendar'
import {WasteFractionIcon} from '@/modules/waste-guide/components/WasteFractionIcon'
import {WasteCardButton} from '@/modules/waste-guide/components/waste-card/WasteCardButton'
import {useGetWasteGuide} from '@/modules/waste-guide/hooks/useGetWasteGuide'
import {useWasteGuideUrls} from '@/modules/waste-guide/hooks/useWasteGuideUrls'
import {FractionCode, WasteType} from '@/modules/waste-guide/types'
import {getNextCollectionDate} from '@/modules/waste-guide/utils/getNextCollectionDate'
import {formatEnumeration} from '@/utils/formatEnumeration'
import {capitalizeString} from '@/utils/transform/capitalizeString'

type Props = {
  fraction: WasteType
} & TestProps

export const Fraction = ({fraction, testID}: Props) => {
  const {wasteGuide} = useGetWasteGuide()
  const {
    bulkyWasteAppointmentUrl,
    collectionPointsMapUrl,
    containerMapUrl,
    seenonsUrl,
  } = useWasteGuideUrls(fraction)

  const buttonUrl = bulkyWasteAppointmentUrl ?? seenonsUrl ?? fraction.url
  const nextCollectionDate = getNextCollectionDate(fraction)

  return (
    <Column gutter="md">
      <Column halign="center">
        <WasteFractionIcon
          fractionCode={fraction.code}
          size="xl"
        />
      </Column>
      {!!fraction.alert && (
        <AlertWarning testID={`${testID}TimeboundNotification`}>
          <FractionContent
            content={fraction.alert}
            testID={`${testID}Content`}
          />
        </AlertWarning>
      )}
      <Column gutter="md">
        <Column
          gutter="sm"
          halign="start">
          {fraction.button_text && buttonUrl ? (
            <FractionButtonSection
              buttonLabel={fraction.button_text}
              buttonUrl={buttonUrl}
              sectionTitle="Hoe"
              testID={`${testID}HowSection`}
              withPhoneButton={!seenonsUrl}
            />
          ) : (
            <>
              <FractionSection
                content={fraction.how}
                sectionTitle="Hoe"
                testID={`${testID}HowSection`}
              />
              {fraction.code === FractionCode.GFT && (
                <WasteCardButton showAddOnly />
              )}
            </>
          )}
          {!!collectionPointsMapUrl && (
            <ExternalLinkButton
              label="Kaart met recyclepunten in de buurt"
              noPaddingHorizontal
              testID={`${testID}CollectionPointsExternalLinkButton`}
              url={collectionPointsMapUrl}
              variant="tertiary"
            />
          )}
        </Column>
        <FractionSection
          content={capitalizeString(
            fraction.frequency
              ? `${
                  formatEnumeration(fraction.days_array) ?? ''
                }, ${fraction.frequency}`
              : (formatEnumeration(fraction.days_array) ?? ''),
          )}
          sectionTitle="Ophaaldag"
          testID={`${testID}DaySection`}
        />
        {!!nextCollectionDate && !wasteGuide?.is_collection_by_appointment && (
          <Column gutter="xs">
            <FractionSection
              content={nextCollectionDate}
              sectionTitle="Volgende ophaaldag"
              testID={`${testID}NextCollectionSection`}
            />
            <NavigationButtonToWasteCalendar />
          </Column>
        )}
        <FractionSection
          content={fraction.curb_rules}
          sectionTitle="Buitenzetten"
          testID={`${testID}OutsideSection`}
        />
        <FractionSection
          content={fraction.where}
          sectionTitle="Waar"
          testID={`${testID}WhereSection`}
          url={containerMapUrl}
        />
        <FractionSection
          content={`Wat mag er bij ${fraction.label.toLowerCase()}`}
          sectionTitle="Wat"
          testID={`${testID}WhatSection`}
          url={fraction.info_link}
        />
      </Column>
      {!!fraction.note && (
        <FractionContent
          content={fraction.note}
          testID={`${testID}RemarksContent`}
        />
      )}
    </Column>
  )
}
