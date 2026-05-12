import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import {Platform} from 'react-native'
import simplur from 'simplur'
import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {BoatChargingPointDetailsButton} from '@/modules/boat-charging/components/bottomsheet/BoatChargingPointDetailsButton'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {mapStatusToState} from '@/modules/boat-charging/constants/mapStatusToState'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {
  resetSelectedBoatChargingPointId,
  useSelectedBoatChargingPointId,
} from '@/modules/boat-charging/slice'
import {ChargingPointStatus, type EVSE} from '@/modules/boat-charging/types'
import {useTheme} from '@/themes/useTheme'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingPointDetails = () => {
  const dispatch = useDispatch()
  const id = useSelectedBoatChargingPointId()
  const {
    data: location,
    isLoading,
    isError,
  } = useBoatChargingLocationDetailsQuery(id ?? skipToken)
  const autoFocus = useAccessibilityFocus()
  const {size} = useTheme()

  useEffect(
    () => () => {
      dispatch(resetSelectedBoatChargingPointId())
    },
    [dispatch],
  )

  const sockets = useMemo(() => {
    const evses: EVSE[] = []

    location?.charging_stations.forEach(station =>
      station.evses.forEach(e => evses.push(e)),
    )

    return evses
  }, [location?.charging_stations])
  const freeSockets = sockets.filter(
    s => s.status === ChargingPointStatus.OPERATIVE,
  )

  if (isLoading) {
    return <PleaseWait testID="BoatChargingPointDetailsPleaseWait" />
  }

  if (isError || !location) {
    return (
      <SomethingWentWrong testID="BoatChargingPointDetailsSomethingWentWrong" />
    )
  }

  const {name, status, tariff} = location

  const pluralizedSockets = simplur`[stopcontact|stopcontacten]${[sockets.length]}`
  const availableSocketsSentence = `${freeSockets.length} van ${sockets.length} ${pluralizedSockets} vrij`
  const locationIcon = boatChargingPointStateMap[mapStatusToState[status]]?.icon

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="lg">
        <Column gutter="xs">
          <Title
            level="h3"
            ref={autoFocus}
            text={name}
          />
          <ExternalLinkButton
            alignSelf="flex-start"
            icon={{
              name: Platform.OS === 'android' ? 'share-android' : 'share-ios',
              size: 'ml',
            }}
            label="Delen"
            noPadding
            testID="BoatChargingPointDetailsShareButton"
            variant="tertiary"
          />
        </Column>
        <Column gutter="xs">
          <Row gutter="sm">
            <CustomMarkerIcon
              icon={locationIcon}
              size={size.spacing.md}
              testID="BoatChargingListItemCustomIcon"
            />
            <Phrase>{availableSocketsSentence}</Phrase>
          </Row>
          <Phrase color="secondary">
            3.7 kW – {formatNumber(tariff.energy_price_per_kwh, 'EUR')} per kWh
          </Phrase>
        </Column>
        <BoatChargingPointDetailsButton />
      </Column>
    </Box>
  )
}
