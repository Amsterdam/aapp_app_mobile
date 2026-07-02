import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import simplur from 'simplur'
import {CustomMarkerIcon} from '@/components/features/map/marker/CustomMarkerIcon'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {BoatChargingPointDetailsButton} from '@/modules/boat-charging/components/bottomsheet/BoatChargingPointDetailsButton'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {mapStatusToState} from '@/modules/boat-charging/constants/mapStatusToState'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {
  resetSelectedBoatChargingPointId,
  useSelectedBoatChargingPointId,
} from '@/modules/boat-charging/slice'
import {ChargingPointStatus} from '@/modules/boat-charging/types'
import {formatMaxKW} from '@/modules/boat-charging/utils/formatMaxKW'
import {useTheme} from '@/themes/useTheme'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingPointDetails = () => {
  const {navigate} = useNavigation()
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

  const details = useMemo(() => {
    if (!location) {
      return ''
    }

    const maxKw = formatMaxKW(location.max_kw)
    const rate = location.tariff
      ? `${formatNumber(location.tariff.energy_price_per_kwh, 'EUR')} per kWh`
      : ''

    return [maxKw, rate].filter(Boolean).join(' - ')
  }, [location])

  const sockets =
    location?.charging_stations.flatMap(station => station.evses) ?? []
  const freeSockets = sockets.filter(
    s => s.status === ChargingPointStatus.OPERATIVE,
  )

  if (isLoading) {
    return <PleaseWait testID="BoatChargingPointDetailsPleaseWait" />
  }

  if (isError || !location) {
    return (
      <Box>
        <SomethingWentWrong testID="BoatChargingPointDetailsSomethingWentWrong" />
      </Box>
    )
  }

  const {address, status} = location

  const pluralizedSockets = simplur`[stopcontact|stopcontacten]${[sockets.length]}`
  const availableSocketsSentence = `${freeSockets.length} van ${sockets.length} ${pluralizedSockets} vrij`
  const socketsSentenceMalfunction = `${sockets.length} ${pluralizedSockets}`

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="lg">
        <Title
          level="h3"
          ref={autoFocus}
          text={address.street + ' ' + address.number}
        />
        <Column gutter="xs">
          <Row gutter="sm">
            <CustomMarkerIcon
              icon={
                boatChargingPointStateMap[
                  mapStatusToState[status ?? ChargingPointStatus.UNKNOWN]
                ]?.icon
              }
              size={size.spacing.md}
              testID="BoatChargingPointDetailsCustomIcon"
            />
            <Phrase>
              {status === ChargingPointStatus.OPERATIVE
                ? availableSocketsSentence
                : socketsSentenceMalfunction}
            </Phrase>
          </Row>
          {!!details && <Phrase color="secondary">{details}</Phrase>}
        </Column>
        {!!id && (
          <BoatChargingPointDetailsButton
            onPress={() =>
              navigate(BoatChargingRouteName.boatChargingDetails, {id})
            }
            status={status}
          />
        )}
      </Column>
    </Box>
  )
}
