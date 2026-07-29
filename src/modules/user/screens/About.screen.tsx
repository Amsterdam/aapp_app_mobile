import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {List} from '@/components/ui/text/list/List'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {UserRouteName} from '@/modules/user/routes'

export const AboutScreen = () => {
  const navigation = useNavigation()

  return (
    <Screen
      testID="UserAboutScreen"
      withLeftInset={false}
      withRightInset={false}>
      <Column gutter="lg">
        <HorizontalSafeArea>
          <Box>
            <Column gutter="lg">
              <Title
                testID="UserAboutScreenTitle"
                text="Eén app voor alle Amsterdammers"
              />
              <Paragraph
                testID="UserAboutScreenIntroParagraph"
                variant="intro">
                Met de Amsterdam App heeft u handige informatie bij de hand en
                kunt u meteen iets regelen met de gemeente.
              </Paragraph>
              <Paragraph testID="UserAboutScreenSummaryParagraph">
                Dit kunt u zoal doen met de app:
              </Paragraph>
              <List
                items={[
                  'De regels over afval in uw buurt bekijken',
                  'Werkzaamheden in uw buurt volgen en hiervan meldingen ontvangen',
                  'Een melding doen van een volle afvalcontainer, afval op straat of iets dat stuk is',
                  'Uw Stadspas gebruiken en uw saldo bekijken',
                ]}
                testID="UserAboutScreenFeaturesList"
              />
              <Column>
                <Title
                  level="h2"
                  testID="UserAboutScreenLaterMoreTitle"
                  text="Later meer"
                />
                <Paragraph testID="UserAboutScreenFutureFeaturesParagraph">
                  De Amsterdam App is in ontwikkeling. Uw mening is belangrijk
                  om de app te verbeteren. Laat het ons weten.
                </Paragraph>
              </Column>
              <Button
                label="Uw mening"
                onPress={() => navigation.navigate(UserRouteName.feedback)}
                testID="UserAboutScreenFeedbackButton"
                variant="secondary"
              />
            </Column>
          </Box>
        </HorizontalSafeArea>
      </Column>
    </Screen>
  )
}
