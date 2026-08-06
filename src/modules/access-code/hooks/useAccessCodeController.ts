import {useCallback, useMemo} from 'react'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {
  ACCESS_CODE_CONFIGURED_STATES,
  AccessCodeGateStateName,
  useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

type AccessCodeSteps =
  | AccessCodeRouteName.setAccessCode
  | AccessCodeRouteName.confirmAccessCode
  | AccessCodeRouteName.validAccessCode
  | AccessCodeRouteName.accessCode
  | AccessCodeRouteName.accessCodeInvalid
  | AccessCodeRouteName.biometricsPermission
  | AccessCodeRouteName.forgotAccessCode
  | 'loginSteps'

export const useAccessCodeGateController = (
  currentStep: AccessCodeSteps,
  module: ModuleSlug = ModuleSlug.user,
  isLoggingIn?: boolean,
) => {
  const state = useAccessCodeGateState(isLoggingIn)
  const navigation = useNavigation()

  const destination:
    | {
        route: AccessCodeRouteName | ModuleSlug
        type: 'popTo' | 'replace' | 'navigate'
      }
    // eslint-disable-next-line sonarjs/cognitive-complexity
    | undefined = useMemo(() => {
    if (
      state === AccessCodeGateStateName.loading ||
      state === AccessCodeGateStateName.fallback
    ) {
      // Nothing should happen in this state
      return
    }

    if (ACCESS_CODE_CONFIGURED_STATES.has(state) && isLoggingIn) {
      // When user is logging into a module and has an access code configured, we simply return null and no interception is required.
      return
    }

    if (isLoggingIn || currentStep === 'loginSteps') {
      // When user is logging into a module or wants to continue from step 'loginSteps' we NAVIGATE to initial setup
      return {type: 'navigate', route: AccessCodeRouteName.setAccessCode}
    }

    if (currentStep === AccessCodeRouteName.setAccessCode) {
      // When user wants to continue from step 'setAccessCode' we NAVIGATE to confirmAccessCode naturally
      return {type: 'navigate', route: AccessCodeRouteName.confirmAccessCode}
    }

    if (currentStep === AccessCodeRouteName.confirmAccessCode) {
      if (isLoggingIn) {
        // When user wants to continue from step 'confirmAccessCode' and is logging in we POP TO to the initiating module root
        return {type: 'popTo', route: module}
      } else {
        // When user wants to continue from step 'confirmAccessCode' and is NOT logging in we REPLACE the route to the validAccessCode screen.
        return {type: 'replace', route: AccessCodeRouteName.validAccessCode}
      }
    }

    if (currentStep === AccessCodeRouteName.validAccessCode) {
      // When user wants to continue from step 'validAccessCode' we return to User module
      return {type: 'popTo', route: ModuleSlug.user}
    }

    if (currentStep === AccessCodeRouteName.accessCode) {
      if (state === AccessCodeGateStateName.invalid) {
        // When user fills in wrong access code
        return {type: 'replace', route: AccessCodeRouteName.accessCodeInvalid}
      } else if (state === AccessCodeGateStateName.biometricsPermission) {
        // When user fills in correct access code and needs to set up biometrics
        return {
          type: 'replace',
          route: AccessCodeRouteName.biometricsPermission,
        }
      } else if (module === ModuleSlug.user) {
        return {
          type: 'replace',
          route: AccessCodeRouteName.setAccessCode,
        }
      } else {
        return {type: 'popTo', route: module}
      }
    }

    if (currentStep === AccessCodeRouteName.accessCodeInvalid) {
      // Wherever user comes from, user returns to initiating module from code invalid screen
      return {type: 'popTo', route: module}
    }

    if (currentStep === AccessCodeRouteName.biometricsPermission) {
      if (module === ModuleSlug.user) {
        return {
          type: 'navigate',
          route: AccessCodeRouteName.validAccessCode,
        }
      } else {
        return {type: 'popTo', route: module}
      }
    }

    if (currentStep === AccessCodeRouteName.forgotAccessCode) {
      return {
        type: 'replace',
        route: AccessCodeRouteName.setAccessCode,
      }
    }
  }, [state, currentStep, isLoggingIn, module])

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const next = useCallback(() => {
    if (
      state === AccessCodeGateStateName.loading ||
      state === AccessCodeGateStateName.fallback
    ) {
      // Nothing should happen in this state
      return
    }

    if (ACCESS_CODE_CONFIGURED_STATES.has(state) && isLoggingIn) {
      // When user is logging into a module and has an access code configured, we simply return null and no interception is required.
      return null
    }

    if (isLoggingIn || currentStep === 'loginSteps') {
      // When user is logging into a module or wants to continue from step 'loginSteps' we NAVIGATE to initial setup
      return navigation.navigate(AccessCodeRouteName.setAccessCode)
    }

    if (currentStep === AccessCodeRouteName.setAccessCode) {
      // When user wants to continue from step 'setAccessCode' we NAVIGATE to confirmAccessCode naturally
      return navigation.navigate(AccessCodeRouteName.confirmAccessCode)
    }

    if (currentStep === AccessCodeRouteName.confirmAccessCode) {
      if (isLoggingIn) {
        // When user wants to continue from step 'confirmAccessCode' and is logging in we POP TO to the initiating module root
        return navigation.popTo(module)
      } else {
        // When user wants to continue from step 'confirmAccessCode' and is NOT logging in we REPLACE the route to the validAccessCode screen.
        return navigation.replace(AccessCodeRouteName.validAccessCode)
      }
    }

    if (currentStep === AccessCodeRouteName.validAccessCode) {
      // When user wants to continue from step 'validAccessCode' we return to User module
      return navigation.popTo(ModuleSlug.user)
    }

    if (currentStep === AccessCodeRouteName.accessCode) {
      if (state === AccessCodeGateStateName.invalid) {
        // When user fills in wrong access code
        return navigation.replace(AccessCodeRouteName.accessCodeInvalid)
      } else if (state === AccessCodeGateStateName.allowed) {
        // When user fills in correct access code
        return navigation.popTo(module)
      } else if (state === AccessCodeGateStateName.biometricsPermission) {
        // When user fills in correct access code and needs to set up biometrics
        return navigation.replace(AccessCodeRouteName.biometricsPermission)
      }
    }

    if (currentStep === AccessCodeRouteName.accessCodeInvalid) {
      // Wherever user comes from, user returns to initiating module from code invalid screen
      return navigation.popTo(module)
    }

    if (currentStep === AccessCodeRouteName.biometricsPermission) {
      if (module === ModuleSlug.user) {
        return navigation.navigate(AccessCodeRouteName.validAccessCode)
      } else {
        return navigation.popTo(module)
      }
    }

    if (currentStep === AccessCodeRouteName.forgotAccessCode) {
      return navigation.replace(AccessCodeRouteName.setAccessCode)
    }
  }, [state, currentStep, navigation, isLoggingIn, module])

  return {next, destination}
}
