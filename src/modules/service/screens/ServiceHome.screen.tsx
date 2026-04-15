import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {ServicesGrid} from '@/modules/service/components/ServicesGrid'
import {ServiceRouteName} from '@/modules/service/routes'
import {ServiceModuleSource} from '@/modules/service/types'
import {Survey} from '@/modules/survey/exports/Survey'

export const ServiceHomeScreen = () => (
  <Screen
    keyboardAware
    testID="ServiceHomeScreen">
    <Box
      insetHorizontal="sm"
      insetVertical="md">
      <Column gutter="xl">
        <Box insetHorizontal="sm">
          <Paragraph variant="intro">
            Kies een onderwerp en u vindt alle plekken op de kaart.
          </Paragraph>
        </Box>
        <ServicesGrid
          detailsRouteName={ServiceRouteName.map}
          source={ServiceModuleSource.service}
        />
      </Column>
    </Box>
    <Survey entryPoint="service-overview-info" />
  </Screen>
)
