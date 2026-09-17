import {ReactNode} from 'react'
import {FormProvider, useForm} from 'react-hook-form'

type Props = {
  children: ReactNode
}

export const ManageVisitorIncreaseTimeBalanceFormProvider = ({
  children,
}: Props) => {
  const form = useForm()

  return <FormProvider {...form}>{children}</FormProvider>
}
