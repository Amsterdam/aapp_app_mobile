import {Column} from '@/components/ui/layout/Column'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'

export const BoatChargingSessionInfoContainerStarting = () => (
  <Column
    gutter="md"
    halign="center">
    <Column
      gutter="smd"
      halign="center">
      <Icon
        name="spinner"
        size="lg"
      />
      <Column gutter="xs">
        <Title
          level="h4"
          text="Bezig met verbinden"
          textAlign="center"
        />
        <Paragraph textAlign="center">
          We controleren of het laden is gestart...
        </Paragraph>
      </Column>
    </Column>
  </Column>
)
