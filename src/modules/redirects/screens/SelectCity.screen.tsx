import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {ExternalLinkButton} from '@/components/ui/buttons/ExternalLinkButton'
import {Box} from '@/components/ui/containers/Box'
import {HorizontalSafeArea} from '@/components/ui/containers/HorizontalSafeArea'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {RedirectsRouteName} from '@/modules/redirects/routes'
import {RedirectKey} from '@/modules/redirects/types'

type Props = NavigationProps<RedirectsRouteName.selectCity>

export const SelectCityScreen = ({navigation}: Props) => {
  const {isLandscape} = useDeviceContext()

  return (
    <Screen
      testID="RedirectsSelectCityScreen"
      withLeftInset={!isLandscape}
      withRightInset={!isLandscape}>
      <Column
        align="between"
        grow={1}>
        <HorizontalSafeArea>
          <Box>
            <Column gutter="md">
              <Title text="Waar wilt u een afspraak maken?" />
              <Row gutter="md">
                <Column flex={1}>
                  <Button
                    accessibilityRole="button"
                    label="Amsterdam"
                    onPress={() =>
                      navigation.navigate(RedirectsRouteName.makeAppointment)
                    }
                    testID="RedirectsMakeAppointmentAmsterdamButton"
                  />
                </Column>
                <Column flex={1}>
                  <ExternalLinkButton
                    label="Weesp"
                    redirectKey={RedirectKey.makeAppointMentWeesp}
                    testID="RedirectsMakeAppointmentWeespExternalLinkButton"
                  />
                </Column>
              </Row>
            </Column>
          </Box>
        </HorizontalSafeArea>
      </Column>
    </Screen>
  )
}
