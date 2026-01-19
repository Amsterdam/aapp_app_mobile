import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {TestProps} from '@/components/ui/types'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useRestartLogin} from '@/modules/access-code/hooks/useRestartLogin'

type Props = {
  onAfterRestart?: () => void
} & TestProps

export const ForgotAccessCodeScreen = ({onAfterRestart, testID}: Props) => {
  const {setIsForgotCode} = useEnterAccessCode()
  const {isError, onRestartLogin} = useRestartLogin()

  useBlurEffect(() => {
    setIsForgotCode(false)
  })

  return (
    <Screen testID={testID}>
      <Box>
        <Column gutter="lg">
          <Title
            level="h2"
            testID={`${testID}Title`}
            text="Toegangscode opnieuw instellen"
          />
          <Paragraph testID={`${testID}Paragraph`}>
            U moet opnieuw inloggen om een nieuwe toegangscode te kiezen.
          </Paragraph>
          {!!isError && (
            <SomethingWentWrong
              testID={`${testID}SomethingWentWrong`}
              text="Er ging iets mis tijdens het uitloggen. Neem contact op als u niet meer kunt inloggen."
            />
          )}
          <Button
            label="Opnieuw inloggen"
            onPress={async () => {
              await onRestartLogin()
              onAfterRestart?.()
            }}
            testID={`${testID}Button`}
          />
        </Column>
      </Box>
    </Screen>
  )
}
