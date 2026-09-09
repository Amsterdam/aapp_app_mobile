import {AccessCode} from '@/modules/access-code/components/AccessCode'
import {useAccessCode} from '@/modules/access-code/hooks/useAccessCode'
import {useAccessCodeError} from '@/modules/access-code/hooks/useAccessCodeError'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'

export const EnterAccessCode = () => {
  const {codeLength} = useAccessCode()
  const {codeEntered, isCodeValid} = useEnterAccessCode()
  const {error} = useAccessCodeError()

  return (
    <AccessCode
      accessCode={codeEntered}
      codeLength={codeLength}
      error={error}
      isCodeEntered={isCodeValid}
    />
  )
}
