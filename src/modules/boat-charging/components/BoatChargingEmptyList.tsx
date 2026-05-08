import {Center} from '@/components/ui/layout/Center'
import {Title} from '@/components/ui/text/Title'

export const BoatChargingEmptyList = () => (
  <Center grow>
    <Title
      level="h5"
      shrink={0}
      testID="BoatChargingEmptyList"
      text="Geen laadpunten"
      textAlign="center"
    />
  </Center>
)
