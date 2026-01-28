import {useCallback, type PropsWithChildren} from 'react'
import {useForm} from 'react-hook-form'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SwitchField} from '@/components/ui/forms/SwitchField'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'

const TEST_ID = 'BiometricsPermissionScreen'

type BiometricsPermissionForm = {
  enableBiometrics: boolean
}
const SwitchWrapper = ({children}: PropsWithChildren) => (
  <Box variant="distinct">{children}</Box>
)

export const BiometricsPermissionScreen = () => {
  const {biometricsLabel, isLoading, setUseBiometrics} =
    useAccessCodeBiometrics()

  const {isLandscape} = useDeviceContext()

  const {handleSubmit, control} = useForm<BiometricsPermissionForm>()

  const onSubmit = useCallback(
    ({enableBiometrics}: BiometricsPermissionForm) => {
      setUseBiometrics(enableBiometrics)
    },
    [setUseBiometrics],
  )

  if (isLoading) {
    return null
  }

  return (
    <Screen
      stickyFooter={
        <Box
          insetBottom="md"
          insetHorizontal="md">
          <SwitchField
            accessibilityLabel={`Toegang met ${biometricsLabel}`}
            control={control}
            defaultValue={false}
            label={
              <Phrase testID={`${TEST_ID}SwitchPhrase`}>
                {`Toegang met ${biometricsLabel}`}
              </Phrase>
            }
            name="enableBiometrics"
            testID={`${TEST_ID}Switch`}
            wrapper={SwitchWrapper}
          />
          <Button
            label="Gereed"
            onPress={handleSubmit(onSubmit)}
            testID="AccessCodeBiometricsPermissionScreenSubmitButton"
          />
        </Box>
      }
      testID="BiometricsPermissionScreen">
      <Box
        insetHorizontal="md"
        insetTop={isLandscape ? 'md' : 'xxl'}>
        <Column gutter="lg">
          <Row align="center">
            <Icon
              name="lock-closed_filled"
              size="xxl"
              testID="BiometricsPermissionScreenIcon"
            />
          </Row>
          <Title
            level="h2"
            testID="BiometricsPermissionScreenTitle"
            text={`De volgende keer sneller toegang met ${biometricsLabel}?`}
            textAlign="center"
          />
        </Column>
      </Box>
    </Screen>
  )
}
