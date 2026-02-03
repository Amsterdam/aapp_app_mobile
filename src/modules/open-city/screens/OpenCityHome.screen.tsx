import {ImageSourcePropType} from 'react-native'
import type {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Image} from '@/components/ui/media/Image'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {OpenCityRouteName} from '@/modules/open-city/routes'

type Props = NavigationProps<OpenCityRouteName.home>

export const OpenCityHomeScreen = ({navigation: {navigate}}: Props) => (
  <Screen
    testID="OpenCityHomeScreen"
    withLeftInset={false}
    withRightInset={false}>
    <Column gutter="md">
      <Image
        aspectRatio="wide"
        source={
          require('@/modules/open-city/assets/open-city-home.jpg') as ImageSourcePropType
        }
        testID="ConstructionWorkProjectImage"
      />
      <HorizontalSafeArea>
        <Box>
          <Column gutter="lg">
            <Title
              testID="OpenCityHomeScreenTitle"
              text="Denk mee over fiets- en wandelroutes van en naar de Oostbrug"
            />
            <Paragraph>
              De Oostbrug zorgt voor meer fietsers en voetgangers. Help ons de
              routes veilig en prettig te maken: plaats een punt op de kaart en
              geef een korte toelichting over verkeer, groen, leefbaarheid of de
              Oostbrug.
            </Paragraph>
            <Column gutter="md">
              <Button
                label="Bekijk en stem"
                onPress={() => navigate(OpenCityRouteName.list)}
                testID="OpenCityHomeScreenParticipateButton"
              />
              <Button
                label="Stuur uw idee"
                onPress={() => navigate(OpenCityRouteName.form)}
                testID="OpenCityHomeScreenSubmitIdeaButton"
                variant="secondary"
              />
            </Column>
          </Column>
        </Box>
      </HorizontalSafeArea>
    </Column>
  </Screen>
)
