import {createContext, type PropsWithChildren, useContext, useMemo} from 'react'

export type AccessCodeStorybookParameters = {
  addDigit?: () => void
  codeConfirmed?: number[]
  codeEntered?: number[]
  codeLength?: number
  codeSet?: number[]
  error?: null
  iconName?: string
  isEnrolled?: boolean
  onAccessCodeEntered?: () => void
  removeDigit?: () => void
  resetError?: () => void
  useBiometrics?: boolean
}

const AccessCodeStorybookContext = createContext<AccessCodeStorybookParameters>(
  {},
)

export const AccessCodeStorybookProvider = ({
  children,
  parameters,
}: PropsWithChildren<{
  parameters?: AccessCodeStorybookParameters
}>) => {
  const storybookParameters = useMemo(() => parameters ?? {}, [parameters])

  return (
    <AccessCodeStorybookContext.Provider value={storybookParameters}>
      {children}
    </AccessCodeStorybookContext.Provider>
  )
}

const useAccessCodeStorybookParameters = () =>
  useContext(AccessCodeStorybookContext)

export const useAccessCodeError = () => {
  const {error, resetError} = useAccessCodeStorybookParameters()

  return {error, resetError}
}

export const useAccessCode = () => {
  const {removeDigit, addDigit, codeLength} = useAccessCodeStorybookParameters()

  return {removeDigit, addDigit, codeLength}
}

export const useAccessCodeBiometrics = () => {
  const {iconName, isEnrolled, useBiometrics} =
    useAccessCodeStorybookParameters()

  return {iconName, isEnrolled, useBiometrics}
}

export const useEnterAccessCode = () => {
  const {codeEntered, onAccessCodeEntered} = useAccessCodeStorybookParameters()

  return {codeEntered, onAccessCodeEntered}
}

export const useSetAccessCode = () => {
  const {codeSet} = useAccessCodeStorybookParameters()

  return {codeSet}
}

export const useConfirmAccessCode = () => {
  const {codeConfirmed} = useAccessCodeStorybookParameters()

  return {codeConfirmed}
}
