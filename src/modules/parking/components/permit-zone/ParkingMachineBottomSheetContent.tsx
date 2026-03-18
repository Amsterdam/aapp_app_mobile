import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {RouteButton} from '@/components/ui/buttons/RouteButton'
import {Box} from '@/components/ui/containers/Box'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePreviousRoute} from '@/hooks/navigation/usePreviousRoute'
import {ParkingMachineBottomSheetErrorMessage} from '@/modules/parking/components/permit-zone/ParkingMachineBottomSheetErrorMessage'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {usePermitMapContext} from '@/modules/parking/hooks/usePermitMapContext'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  useParkingMachinesQuery,
  useZoneByMachineQuery,
} from '@/modules/parking/service'
import {
  getParkingMachinePaymentTimes,
  sortPaymentTimes,
} from '@/modules/parking/utils/paymentZone'
import {
  useBottomSheet,
  useBottomSheetSelectors,
} from '@/store/slices/bottomSheet'
import {capitalizeString} from '@/utils/transform/capitalizeString'

export const ParkingMachineBottomSheetContent = () => {
  const {close: closeBottomSheet} = useBottomSheet()
  const {isOpen} = useBottomSheetSelectors()
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

  const {
    data: parkingMachineDetails,
    isFetching,
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

  const paymentTimes = useMemo(
    () => getParkingMachinePaymentTimes(parkingMachineDetails),
    [parkingMachineDetails],
  )

  useEffect(() => {
    if (!isOpen) {
      resetSelectedParkingMachineId()
    }
  }, [isOpen, resetSelectedParkingMachineId])

  if (!parkingMachine) {
    return null
  }

  const paymentTimesAccessibilityLabel = isFetching
    ? 'Betaald parkeren, tijden worden geladen.'
    : `Betaald parkeren, ${Object.entries(paymentTimes)
        .sort(sortPaymentTimes)
        .map(
          ([days, timeSpan]) =>
            `${capitalizeString(days)} ${timeSpan ? 'van ' + timeSpan : 'geen betaald parkeren'}`,
        )
        .join(', ')}.`

  return (
    <Box>
      <Column gutter="lg">
        <Column gutter="xs">
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

          {currentPermit?.parking_machine_favorite === parkingMachine.id && (
            <Phrase color="secondary">Ingesteld als favoriet</Phrase>
          )}

          <RouteButton
            accessibilityLabel={`Open de routeplanner op uw telefoon met de route naar parkeerautomaat ${parkingMachine.id}.`}
            coordinates={{
              lat: parkingMachine.lat,
              lon: parkingMachine.lon,
            }}
            testID="ParkingMachineDetailsRouteButton"
          />
        </Column>

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
              accessibilityLabel={paymentTimesAccessibilityLabel}>
              <Column>
                <Title
                  level="h5"
                  text="Betaald parkeren"
                />
                {isFetching ? (
                  <PleaseWait testID="ParkingMachineDetailsPleaseWait" />
                ) : (
                  <Paragraph>
                    {Object.entries(paymentTimes)
                      .sort(sortPaymentTimes)
                      .map(
                        ([days, timeSpan]) =>
                          `${capitalizeString(days)}: ${timeSpan || 'geen betaald parkeren'}`,
                      )
                      .join('\n')}
                  </Paragraph>
                )}
              </Column>
            </SingleSelectable>
          </Row>
        )}

        {previousRouteName === ParkingRouteName.startSession && !isError && (
          <Button
            disabled={isFetching}
            isLoading={isFetching}
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
