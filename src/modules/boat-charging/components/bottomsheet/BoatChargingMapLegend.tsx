import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {BoatChargingPointState} from '@/modules/boat-charging/types'

export const BoatChargingMapLegend = () => {
  const {close: closeBottomSheet} = useBottomSheet()

  const autoFocus = useAccessibilityFocus()

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            ref={autoFocus}
            text="Legenda"
          />
          <IconButton
            accessibilityLabel="Sluit legenda venster"
            icon={
              <Icon
                name="close"
                size="ml"
              />
            }
            onPress={closeBottomSheet}
            testID="BoatChargingMapLegendCloseButton"
          />
        </Row>
        <Column gutter="sm">
          <Title
            level="h5"
            text="Status"
          />
          {[
            BoatChargingPointState.free,
            BoatChargingPointState.occupied,
            BoatChargingPointState.malfunction,
          ].map(state => (
            <Row
              gutter="sm"
              key={boatChargingPointStateMap[state].label}>
              <Icon
                color={boatChargingPointStateMap[state].color}
                name={boatChargingPointStateMap[state].icon}
                size="lg"
              />
              <Phrase>{boatChargingPointStateMap[state].label}</Phrase>
            </Row>
          ))}
        </Column>
      </Column>
    </Box>
  )
}
