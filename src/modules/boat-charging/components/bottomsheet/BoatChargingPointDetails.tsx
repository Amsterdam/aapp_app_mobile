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
import {getAddressLine1} from '@/modules/address/utils/addDerivedAddressFields'
import {BoatChargingPointDetailsButton} from '@/modules/boat-charging/components/bottomsheet/BoatChargingPointDetailsButton'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {mapStatusToState} from '@/modules/boat-charging/constants/mapStatusToState'
import {useAvailableAndOtherEvses} from '@/modules/boat-charging/hooks/useAvailableAndOtherEvses'
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

  const {availableEvses, evses} = useAvailableAndOtherEvses(
    location?.charging_stations ?? [],
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

  const pluralizedSockets = simplur`[stopcontact|stopcontacten]${[evses.length]}`
  const availableSocketsSentence = `${availableEvses.length} van ${evses.length} ${pluralizedSockets} vrij`
  const socketsSentenceMalfunction = `${evses.length} ${pluralizedSockets}`

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="lg">
        <Title
          level="h3"
          ref={autoFocus}
          text={getAddressLine1(address)}
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
              navigate(BoatChargingRouteName.locationDetails, {id})
            }
            status={status}
          />
        )}
      </Column>
    </Box>
  )
}
