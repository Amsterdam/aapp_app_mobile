import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {crowdStateMap} from '@/modules/elections/constants/crowdDetails'
import {ElectionsState} from '@/modules/elections/types'

export const PollingStationsMapLegend = () => {
  const {close: closeBottomSheet} = useBottomSheet()

  const autoFocus = useAccessibilityFocus()

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            ref={autoFocus}
            text="Kaartlagen"
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
            testID="PollingStationsMapLegendCloseButton"
          />
        </Row>
        <Column gutter="sm">
          <Title
            level="h5"
            text="Drukte nu"
          />
          {[
            ElectionsState.calm,
            ElectionsState.medium,
            ElectionsState.busy,
            ElectionsState.unknown,
          ].map(state => (
            <Row
              gutter="sm"
              key={crowdStateMap[state].label}>
              <Icon
                color={crowdStateMap[state].color}
                name={crowdStateMap[state].icon}
                size="lg"
              />
              <Phrase>{crowdStateMap[state].label}</Phrase>
            </Row>
          ))}
        </Column>
      </Column>
    </Box>
  )
}
