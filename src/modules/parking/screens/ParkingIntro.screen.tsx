import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {ParkingInfoSection} from '@/modules/parking/components/ParkingInfoSection'
import {ParkingIntroFigure} from '@/modules/parking/components/ParkingIntroFigure'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = NavigationProps<ParkingRouteName.intro>

export const ParkingIntroScreen = ({navigation: {navigate}}: Props) => (
  <Screen testID="ParkingHomeScreen">
    <Row align="center">
      <ParkingIntroFigure />
    </Row>
    <Box>
      <Column gutter="xl">
        <Column gutter="md">
          <Title
            level="h1"
            text="Start parkeersessie"
          />
          <Column gutter="lg">
            <Paragraph variant="intro">
              Log in als vergunninghouder of bezoeker om de parkeersessie te
              starten en te betalen.
            </Paragraph>
            <Button
              label="Start met parkeren"
              onPress={() => navigate(ParkingRouteName.login)}
              testID="ParkingHomeLoginButton"
            />
          </Column>
        </Column>
        <ParkingInfoSection />
      </Column>
    </Box>
  </Screen>
)
