import {Box} from '@/components/ui/containers/Box'
import {Title} from '@/components/ui/text/Title'

export const ServicePointListEmpty = () => (
  <Box insetVertical="xxl">
    <Title
      level="h5"
      testID="ServicePointEmptyList"
      text="Geen resultaat"
      textAlign="center"
    />
  </Box>
)
