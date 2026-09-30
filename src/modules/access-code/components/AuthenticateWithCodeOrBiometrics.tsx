import {useEffect} from 'react'
import {useBiometrics} from '@/hooks/useBiometrics'
import {AccessCodeKeyBoard} from '@/modules/access-code/components/AccessCodeKeyBoard'
import {useAccessCodeBiometrics} from '@/modules/access-code/exports/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/exports/useEnterAccessCode'
import {AccessCodeType} from '@/modules/access-code/types'

export const AuthenticateWithCodeOrBiometrics = () => {
  const {onAccessCodeEntered} = useEnterAccessCode()
  const {useBiometrics: isUseBiometrics} = useAccessCodeBiometrics()
  const {authenticated, authenticate} = useBiometrics({
    autoTrigger: isUseBiometrics,
    promptMessage: 'Automatisch toegangscode invullen',
    cancelButtonText: 'Terug',
    fallbackPromptMessage: 'Opnieuw',
    disableDeviceFallback: true,
  })

  useEffect(() => {
    if (authenticated) {
      onAccessCodeEntered(true)
    }
  }, [authenticated, onAccessCodeEntered])

  return (
    <AccessCodeKeyBoard
      onPressAuthenticate={authenticate}
      type={AccessCodeType.codeEntered}
    />
  )
}
