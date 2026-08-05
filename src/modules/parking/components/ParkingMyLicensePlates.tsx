import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo} from 'react'
import {Alert} from 'react-native'
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
import {
  useLicensePlatesQuery,
  useRemoveLicensePlateMutation,
} from '@/modules/parking/service'
import {PermitType, type ParkingLicensePlate} from '@/modules/parking/types'
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

  const [removeLicensePlate, {isLoading: isLoadingRemoveLicensePlate}] =
    useRemoveLicensePlateMutation()

  const onPressDelete = useCallback(
    (licensePlate: ParkingLicensePlate) => {
      const {id, vehicle_id, visitor_name} = licensePlate

      Alert.alert(
        'Weet u zeker dat u het kenteken wilt verwijderen?',
        `Kenteken: ${vehicle_id}${visitor_name ? '\nNaam: ' + visitor_name : ''}`,
        [
          {
            text: 'Annuleren',
            style: 'cancel',
            onPress: () => null,
          },
          {
            text: 'Verwijderen',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              void removeLicensePlate({
                report_code: currentPermit.report_code.toString(),
                vehicle_id,
                id,
              })
            },
          },
        ],
        {cancelable: true},
      )
    },
    [currentPermit.report_code, removeLicensePlate],
  )

  if (isFetching || isLoadingRemoveLicensePlate) {
    return <PleaseWait testID="ParkingSelectLicensePlatePleaseWait" />
  }

  if (!licensePlates) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="ParkingSelectLicensePlateSomethingWentWrong"
      />
    )
  }

  const {forced_license_plate_list} = currentPermit

  return licensePlates.length ? (
    <Box>
      <Column gutter="xl">
        {licensePlates.map((licensePlate, index) => (
          <LicensePlateListItem
            isRemovable={!forced_license_plate_list}
            key={licensePlate.vehicle_id}
            licensePlate={licensePlate}
            number={String(index + 1)}
            onPressDelete={onPressDelete}
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
