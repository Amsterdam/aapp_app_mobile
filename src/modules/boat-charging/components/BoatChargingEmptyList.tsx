import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

export const BoatChargingEmptyList = () => (
  <Box insetVertical="xxl">
    <Title
      level="h5"
      testID="BoatChargingEmptyList"
      text="Geen laadpunten"
      textAlign="center"
    />
  </Box>
)
