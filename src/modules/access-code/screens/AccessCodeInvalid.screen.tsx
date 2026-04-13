import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useRestartLogin} from '@/modules/access-code/hooks/useRestartLogin'

export const AccessCodeInvalidScreen = () => {
  const {isError, onRestartLogin} = useRestartLogin()

  return (
    <Screen
      stickyFooter={
        <Box>
          {!!isError && (
            <>
              <SomethingWentWrong
                testID="AccessCodeInvalidScreenSomethingWentWrong"
                text="Er ging iets mis tijdens het uitloggen. Neem contact op als u niet meer kunt inloggen."
              />
              <Gutter height="md" />
            </>
          )}
          <Button
            label="Toegangscode opnieuw instellen"
            onPress={onRestartLogin}
            testID="AccessCodeInvalidScreenButton"
          />
        </Box>
      }
      testID="AccessCodeInvalidScreen">
      <Box
        insetHorizontal="md"
        insetTop="xxl">
        <Column
          align="center"
          grow={1}
          gutter="lg">
          <Row align="center">
            <Icon
              color="warning"
              name="failed"
              size="xxl"
            />
          </Row>
          <Title
            level="h2"
            testID="AccessCodeInvalidScreenTitle"
            text="U heeft te vaak een onjuiste toegangscode ingevoerd."
            textAlign="center"
          />
          <Paragraph textAlign="center">
            U moet opnieuw inloggen om een nieuwe toegangscode te kiezen.
          </Paragraph>
        </Column>
      </Box>
    </Screen>
  )
}
