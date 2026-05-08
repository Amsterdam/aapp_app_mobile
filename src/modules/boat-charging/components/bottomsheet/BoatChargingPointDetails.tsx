import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import {Platform} from 'react-native'
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
import {useBoatChargingLocationDetailsQuery} from '@/modules/boat-charging/service'
import {
  resetSelectedBoatChargingPointId,
  useSelectedBoatChargingPointId,
} from '@/modules/boat-charging/slice'
import {useTheme} from '@/themes/useTheme'
import {formatNumber} from '@/utils/formatNumber'

export const BoatChargingPointDetails = () => {
  const dispatch = useDispatch()
  const id = useSelectedBoatChargingPointId()
  const {data, isLoading, isError} = useBoatChargingLocationDetailsQuery(
    id ?? skipToken,
  )
  const autoFocus = useAccessibilityFocus()
  const {size} = useTheme()

  useEffect(
    () => () => {
      dispatch(resetSelectedBoatChargingPointId())
    },
    [dispatch],
  )

  if (isLoading) {
    return <PleaseWait testID="BoatChargingPointDetailsPleaseWait" />
  }

  if (isError || !data) {
    return (
      <SomethingWentWrong testID="BoatChargingPointDetailsSomethingWentWrong" />
    )
  }

  const {name, tariff} = data

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
              icon={boatChargingPointStateMap.free.icon}
              size={size.spacing.md}
              testID="BoatChargingListItemCustomIcon"
            />
            <Phrase>2 van 4 stopcontacten vrij</Phrase>
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
