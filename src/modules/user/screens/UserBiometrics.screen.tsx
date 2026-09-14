import {ReactNode, useCallback} from 'react'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
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
  const {biometricsLabel, isEnrolled, updateUseBiometrics, useBiometrics} =
    useAccessCodeBiometrics()
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.biometrics,
  )

  const onChange = useCallback(() => {
    if (!useBiometrics && !isEnrolled) {
      if (!isEnrolled) {
        navigateToInstructionsScreen()
      }

      return
    }

    void updateUseBiometrics(!useBiometrics)
  }, [
    isEnrolled,
    navigateToInstructionsScreen,
    updateUseBiometrics,
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
