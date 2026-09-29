import {AuthenticationType} from 'expo-local-authentication'
import {ReactNode, useCallback} from 'react'
import {Platform} from 'react-native'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useAccessCodeBiometrics} from '@/modules/access-code/exports/useAccessCodeBiometrics'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {Permissions} from '@/types/permissions'

const TEST_ID = 'UserBiometricsScreen'

type Props = {
  children: ReactNode
}

const SwitchWrapper = ({children}: Props) => (
  <Box variant="distinct">{children}</Box>
)

export const UserBiometricsScreen = () => {
  const {
    biometricsLabel,
    biometricsAuthenticationType,
    requestPermission,
    setUseBiometrics,
    useBiometrics,
  } = useAccessCodeBiometrics()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.biometrics,
  )

  const onChange = useCallback(() => {
    setUseBiometrics(!useBiometrics)

    if (
      Platform.OS === 'ios' &&
      biometricsAuthenticationType?.includes(
        AuthenticationType.FACIAL_RECOGNITION,
      ) &&
      !useBiometrics
    ) {
      void requestPermission().then(granted => {
        if (!granted) {
          navigateToInstructionsScreen()
        }
      })
    }
  }, [
    biometricsAuthenticationType,
    navigateToInstructionsScreen,
    requestPermission,
    setUseBiometrics,
    useBiometrics,
  ])

  return (
    <Screen testID={TEST_ID}>
      <Box>
        <Column gutter="md">
          {!!biometricsLabel && (
            <Switch
              accessibilityLabel={`Toegang met ${biometricsLabel} staat ${useBiometrics ? 'aan' : 'uit'}`}
              label={
                <Phrase testID={`${TEST_ID}SwitchPhrase`}>
                  {`Toegang met ${biometricsLabel}`}
                </Phrase>
              }
              onChange={onChange}
              testID={`${TEST_ID}Switch`}
              value={useBiometrics}
              wrapper={SwitchWrapper}
            />
          )}
          <Paragraph testID={`${TEST_ID}InfoParagraph`}>
            Als u dit inschakelt, dan heeft iedereen die deze telefoon kan
            ontgrendelen ook toegang tot uw gegevens in deze app.
          </Paragraph>
        </Column>
      </Box>
    </Screen>
  )
}
