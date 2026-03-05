import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {ServiceList} from '@/modules/service/components/ServiceList'
import {Survey} from '@/modules/survey/exports/Survey'

export const ServiceHomeScreen = () => (
  <Screen testID="ServiceHomeScreen">
    <Box>
      <Column gutter="xl">
        <Paragraph variant="intro">
          Kies een onderwerp en u vindt alle plekken op de kaart.
        </Paragraph>

        <ServiceList />
      </Column>
    </Box>
    <Survey entryPoint="service-overview-info" />
  </Screen>
)
