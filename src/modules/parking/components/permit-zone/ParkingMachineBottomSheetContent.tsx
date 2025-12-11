import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePreviousRoute} from '@/hooks/navigation/usePreviousRoute'
import {useGetGoogleMapsDirectionsUrl} from '@/hooks/useGetGoogleMapsDirectionsUrl'
import {ParkingMachineBottomSheetErrorMessage} from '@/modules/parking/components/permit-zone/ParkingMachineBottomSheetErrorMessage'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  useParkingMachinesQuery,
  useZoneByMachineQuery,
} from '@/modules/parking/service'
import {getParkingMachineDetailsLabel} from '@/modules/parking/utils/paymentZone'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {dayjs} from '@/utils/datetime/dayjs'

export const ParkingMachineBottomSheetContent = () => {
  const {close: closeBottomSheet} = useBottomSheet()
  const autoFocus = useAccessibilityFocus()
  const navigation = useNavigation()

  const {name: previousRouteName} = usePreviousRoute() ?? {}
  const {selectedParkingMachineId, resetSelectedParkingMachineId} =
    usePermitMapContext()

  const currentPermit = useCurrentParkingPermit()

  const {data} = useParkingMachinesQuery()
  const parkingMachine = data?.find(
    machine => machine.id === selectedParkingMachineId,
  )

  const directionsUrl = useGetGoogleMapsDirectionsUrl({
    lat: parkingMachine?.lat,
    lon: parkingMachine?.lon,
  })

  const {
    data: parkingMachineDetails,
    isLoading,
    isError,
    error,
  } = useZoneByMachineQuery(
    selectedParkingMachineId
      ? {
          machineId: selectedParkingMachineId,
          report_code: currentPermit.report_code,
        }
      : skipToken,
  )

  const machineDetailsLabel = useMemo(
    () => getParkingMachineDetailsLabel(parkingMachineDetails, dayjs()),
    [parkingMachineDetails],
  )

  useEffect(
    () => () => resetSelectedParkingMachineId(),
    [resetSelectedParkingMachineId],
  )

  if (!parkingMachine) {
    return null
  }

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            ref={autoFocus}
            text={`Parkeerautomaat ${selectedParkingMachineId}`}
          />
          <IconButton
            accessibilityLabel="Sluit parkeerautomaat details venster"
            icon={
              <Icon
                name="close"
                size="ml"
              />
            }
            onPress={closeBottomSheet}
            testID="ParkingMachineDetailsCloseButton"
          />
        </Row>

        <Row
          gutter="smd"
          valign="start">
          <Icon
            name="location"
            size="lg"
          />
          <Column>
            {!!parkingMachine?.address && (
              <Title
                level="h5"
                text={parkingMachine.address}
              />
            )}
            <ExternalLinkButton
              label="Route openen"
              noPadding
              testID="ParkingMachineDetailsRouteExternalLinkButton"
              url={directionsUrl}
              variant="tertiary"
            />
          </Column>
        </Row>

        {isError ? (
          <ParkingMachineBottomSheetErrorMessage error={error} />
        ) : (
          <Row
            gutter="smd"
            valign="start">
            <Icon
              name="clock"
              size="lg"
            />
            <SingleSelectable
              accessibilityLabel={`Betaald parkeren, van ${machineDetailsLabel}.`}>
              <Column>
                <Title
                  level="h5"
                  text="Betaald parkeren"
                />
                {isLoading ? (
                  <PleaseWait testID="ParkingMachineDetailsPleaseWait" />
                ) : (
                  <Paragraph>{machineDetailsLabel}</Paragraph>
                )}
              </Column>
            </SingleSelectable>
          </Row>
        )}

        {previousRouteName === ParkingRouteName.startSession && !isError && (
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            label="Selecteer deze automaat"
            onPress={() => {
              closeBottomSheet()
              navigation.popTo(ParkingRouteName.startSession, {
                parkingMachineId: selectedParkingMachineId,
              })
            }}
            testID="SelectParkingMachineButton"
          />
        )}
      </Column>
    </Box>
  )
}
