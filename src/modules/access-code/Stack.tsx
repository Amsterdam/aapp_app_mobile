import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useConfirmAccessCode} from '@/modules/access-code/hooks/useConfirmAccessCode'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useInvalidateAccessCode} from '@/modules/access-code/hooks/useInvalidateAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {AccessCodeValidScreen} from '@/modules/access-code/screens/AccessCodeValid.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'

const Stack = createStackNavigator<RootStackParams>()

export const AccessCodeStack = () => {
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isCodeConfirmed} = useConfirmAccessCode()
  const screenOptions = useScreenOptions()
  const isCodeInvalidated = useInvalidateAccessCode()

  if (!isCodeInvalidated) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Group navigationKey={isForgotCode ? 'forgotten' : 'access-code'}>
        {!isCodeValid ? (
          <>
            {attemptsLeft > 0 ? (
              <Stack.Screen
                component={AccessCodeScreen}
                name={AccessCodeRouteName.accessCode}
                options={{headerTitle: 'Toegangscode invoeren'}}
              />
            ) : (
              <Stack.Screen
                component={AccessCodeInvalidScreen}
                name={AccessCodeRouteName.accessCodeInvalid}
              />
            )}
          </>
        ) : (
          <>
            {isCodeConfirmed ? (
              <Stack.Screen
                component={AccessCodeValidScreen}
                name={AccessCodeRouteName.validAccessCode}
              />
            ) : (
              <>
                <Stack.Screen
                  component={SetAccessCodeScreen}
                  name={AccessCodeRouteName.setAccessCode}
                  options={{headerTitle: 'Toegangscode kiezen'}}
                />
                <Stack.Screen
                  component={ConfirmAccessCodeScreen}
                  initialParams={{showValidation: true}}
                  name={AccessCodeRouteName.confirmAccessCode}
                  options={{headerTitle: 'Toegangscode herhalen'}}
                />
              </>
            )}
          </>
        )}
      </Stack.Group>
    </Stack.Navigator>
  )
}
