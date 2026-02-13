import {useCallback, useEffect} from 'react'
import {View} from 'react-native'
import {NavigationProps} from '@/app/navigation/types'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {LoginItem} from '@/modules/city-pass/components/LoginItem'
import {useLogin} from '@/modules/city-pass/hooks/useLogin'
import {useLoginSteps} from '@/modules/city-pass/hooks/useLoginSteps'
import {useRegisterCityPassOwner} from '@/modules/city-pass/hooks/useRegisterCityPassOwner'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {RedirectErrorCodes} from '@/types/mijnAmsterdam'

type Props = NavigationProps<CityPassRouteName.loginSteps>

export const LoginStepsScreen = ({route}: Props) => {
  const {
    accessToken: deeplinkAccessToken,
    errorCode,
    errorMessage,
    loginResult,
    refreshToken: deeplinkRefreshToken,
  } = route.params || {}

  const {navigate} = useNavigation()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const {accessCode} = useGetSecureAccessCode()
  const isStepsComplete = isCityPassOwnerRegistered && accessCode
  const {setIsLoginStepsActive} = useLoginSteps()
  const login = useLogin()

  useEffect(() => {
    setIsLoginStepsActive(true)
  }, [setIsLoginStepsActive])

  useRegisterCityPassOwner({
    loginResult,
    deeplinkAccessToken,
    deeplinkRefreshToken,
    errorCode:
      errorCode ?? (route.params?.['amp;errorCode'] as RedirectErrorCodes), // TODO: remove this once fixed at Mijn Amsterdam
    errorMessage,
  })

  const onPress = useCallback(() => {
    if (!isCityPassOwnerRegistered) {
      void login()

      return
    }

    if (!accessCode) {
      navigate(AccessCodeRouteName.setAccessCode)

      return
    }

    if (isStepsComplete) {
      setIsLoginStepsActive(false)
    }
  }, [
    accessCode,
    isCityPassOwnerRegistered,
    isStepsComplete,
    login,
    navigate,
    setIsLoginStepsActive,
  ])

  return (
    <Screen
      hasStickyAlert
      stickyFooter={
        <Box>
          <Button
            accessibilityLabel={
              isStepsComplete
                ? 'Gereed'
                : isCityPassOwnerRegistered
                  ? 'Volgende. Ga naar toegangscode instellen.'
                  : 'Volgende. Ga naar inloggen met DigiD.'
            }
            label={isStepsComplete ? 'Gereed' : 'Volgende'}
            onPress={onPress}
            testID="CityPassLoginScreenNextButton"
          />
        </Box>
      }
      testID="LoginStepsScreenButton">
      <Box>
        <Column gutter="lg">
          <Column gutter="sm">
            <Title
              testID="LoginStepsScreenTitle"
              text="Inloggen & beveiligen"
            />
            <Paragraph testID="LoginStepsScreenParagraph">
              Stel na het inloggen een toegangscode in.
            </Paragraph>
          </Column>
          <View>
            <LoginItem
              isCurrent
              isDone={isCityPassOwnerRegistered}
              isNextDone={!!accessCode}
              numberIndicator={1}
              text="Om te laten zien wie u bent."
              title="Inloggen met DigiD"
            />
            <LoginItem
              isCurrent={isCityPassOwnerRegistered}
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
