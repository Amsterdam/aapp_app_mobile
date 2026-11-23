import type {PropsWithChildren} from 'react'
import {FormProvider} from 'react-hook-form'
import {useNewSessionForm} from '@/modules/boat-charging/hooks/useNewSessionForm'
import {useSessionDraft} from '@/modules/boat-charging/slice'

export const NewSessionFormProvider = ({children}: PropsWithChildren) => {
  const {sessionDraft} = useSessionDraft()
  const form = useNewSessionForm(sessionDraft)

  return <FormProvider {...form}>{children}</FormProvider>
}
