import {FormProvider} from 'react-hook-form'
import type {PropsWithChildren} from 'react'
import {useNewSessionForm} from '@/modules/boat-charging/hooks/useNewSessionForm'

export const NewSessionFormProvider = ({children}: PropsWithChildren) => {
  const form = useNewSessionForm()

  return <FormProvider {...form}>{children}</FormProvider>
}
