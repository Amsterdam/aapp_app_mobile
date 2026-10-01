import {useCallback, useEffect} from 'react'
import {View} from 'react-native'
import type {NavigationProps} from '@/app/navigation/types'
import type {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useGetSecureAccessCode} from '@/modules/access-code/exports/useGetSecureAccessCode'
import {useLoginSteps} from '@/modules/access-code/hooks/useLoginSteps'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {LoginItem} from '@/modules/city-pass/components/LoginItem'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type Props = NavigationProps<BoatChargingRouteName.loginSteps>

export const LoginStepsScreen = ({navigation}: Props) => {
  const {navigate} = navigation
  const {isLoggedIn} = useIsLoggedIn()
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const isStepsComplete = isLoggedIn && accessCode
  const {setIsLoginStepsActive} = useLoginSteps(ModuleSlug['boat-charging'])

  useEffect(() => {
    setIsLoginStepsActive(true)
  }, [setIsLoginStepsActive])

  const onPress = useCallback(() => {
    if (!accessCode) {
      navigate(AccessCodeRouteName.setAccessCode)

      return
    }

    if (isStepsComplete) {
      setIsLoginStepsActive(false)
    }
  }, [accessCode, isStepsComplete, navigate, setIsLoginStepsActive])

  if (isLoading) {
    return (
      <PleaseWait
        showFeedback
        testID="BoatChargingLoginStepsScreenPleaseWait"
      />
    )
  }

  return (
    <Screen
      hasStickyAlert
      stickyFooter={
        <Box>
          <Button
            accessibilityLabel={
              isStepsComplete
                ? 'Gereed'
                : isLoggedIn
                  ? 'Volgende. Ga naar toegangscode instellen.'
                  : 'Volgende. Ga naar inloggen boot laden.'
            }
            label={isStepsComplete ? 'Gereed' : 'Volgende'}
            onPress={onPress}
            testID="BoatChargingLoginStepsScreenNextButton"
          />
        </Box>
      }
      testID="BoatChargingLoginStepsScreenButton">
      <Box>
        <Column gutter="lg">
          <Column gutter="sm">
            <Title
              testID="BoatChargingLoginStepsScreenTitle"
              text="Inloggen & beveiligen"
            />
            <Paragraph testID="LoginStepsScreenParagraph">
              Stel na het inloggen een toegangscode in.
            </Paragraph>
          </Column>
          <View>
            <LoginItem
              isCurrent
              isDone={!!isLoggedIn}
              isNextDone={!!accessCode}
              numberIndicator={1}
              text="Met uw gebruikersnaam en wachtwoord."
              title="Inloggen"
            />
            <LoginItem
              isCurrent={!!isLoggedIn}
              isDone={!!accessCode}
              isLast
              numberIndicator={2}
              text="Om uw persoonlijke gegevens te beschermen."
              title="Toegangscode instellen"
            />
          </View>
        </Column>
      </Box>
    </Screen>
  )
}
