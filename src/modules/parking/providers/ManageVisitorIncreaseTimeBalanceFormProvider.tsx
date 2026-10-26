import {ReactNode} from 'react'
import {FormProvider, useForm} from 'react-hook-form'

type Props = {
  children: ReactNode
}

export type ManageVisitorIncreaseTimeBalanceFormValues = {time?: number}

export const ManageVisitorIncreaseTimeBalanceFormProvider = ({
  children,
}: Props) => {
  const form = useForm<ManageVisitorIncreaseTimeBalanceFormValues>()

  return <FormProvider {...form}>{children}</FormProvider>
}
