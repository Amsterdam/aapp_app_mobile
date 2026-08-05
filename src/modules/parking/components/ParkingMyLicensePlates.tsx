import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {EmptyList} from '@/components/features/EmptyList'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {LicensePlateListItem} from '@/modules/parking/components/license-plates/LicensePlateListItem'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useLicensePlatesQuery} from '@/modules/parking/service'
import {PermitType} from '@/modules/parking/types'
import {RedirectKey} from '@/modules/redirects/types'

export const ParkingMyLicensePlates = () => {
  const currentPermit = useCurrentParkingPermit()
  const {data: licensePlates, isFetching} = useLicensePlatesQuery(
    currentPermit
      ? {
          reportCode: currentPermit.report_code.toString(),
        }
      : skipToken,
  )

  const redirectKey = useMemo(() => {
    if (currentPermit.permit_type.includes(PermitType.mantelzorgvergunning)) {
      return RedirectKey.parking_request_license_plate_mantelzorgers
    }

    if (
      currentPermit.permit_type.includes(
        PermitType['GA-parkeervergunning voor bewoners (passagiers)'],
      )
    ) {
      return RedirectKey.parking_request_license_plate_ga_bewoners
    }

    if (currentPermit.permit_type.includes(PermitType['GA-bezoekerskaart'])) {
      return RedirectKey.parking_request_license_plate_ga_bezoekers
    }
  }, [currentPermit.permit_type])

  if (isFetching) {
    return <PleaseWait testID="ParkingSelectLicensePlatePleaseWait" />
  }

  if (!licensePlates) {
    return (
      <SomethingWentWrong testID="ParkingSelectLicensePlateSomethingWentWrong" />
    )
  }

  const {forced_license_plate_list} = currentPermit

  return licensePlates.length ? (
    <Box>
      <Column gutter="md">
        {licensePlates.map((licensePlate, index) => (
          <LicensePlateListItem
            key={licensePlate.vehicle_id}
            licensePlate={licensePlate}
            number={String(index + 1)}
          />
        ))}
        {!!forced_license_plate_list && !!redirectKey && (
          <Column gutter="lg">
            <Column gutter="sm">
              <Title
                level="h2"
                testID="ParkingMyLicensePlatesForceLicensePlatesTitle"
                text="Kenteken toevoegen of wijzigen"
              />
              <Paragraph>
                U kunt online een kenteken toevoegen of wijzigen.
              </Paragraph>
            </Column>
            <ExternalLinkButton
              label="Kenteken wijzigen"
              redirectKey={redirectKey}
              testID="ParkingMyLicensePlatesForceLicensePlatesPhoneExternalLinkButton"
              variant="secondary"
            />
          </Column>
        )}
      </Column>
    </Box>
  ) : (
    <EmptyList
      testID="ParkingMyLicensePlatesEmptyList"
      text="U heeft nog geen kentekens opgeslagen."
      title="Geen kentekens"
    />
  )
}
