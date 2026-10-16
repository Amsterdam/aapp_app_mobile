import {useEffect, type PropsWithChildren} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import type {Vignet} from '@/modules/boat-charging/types'
import {useAlert} from '@/store/slices/alert'

export type BoatChargingVignetFormValues = {
  postalCode: Vignet['postal_code']
  saveToMyVignettes?: boolean
  vignetNumber: Vignet['vignette_number']
}

type Props = PropsWithChildren<{
  defaultValues: Partial<BoatChargingVignetFormValues>
}>

export const BoatChargingVignetFormProvider = ({
  defaultValues,
  children,
}: Props) => {
  const {resetAlert} = useAlert()
  const form = useForm<BoatChargingVignetFormValues>({
    defaultValues,
    resetOptions: {
      keepIsSubmitted: false,
    },
  })

  useEffect(() => {
    if (form.formState.isSubmitting) {
      resetAlert()
    }
  }, [form.formState.isSubmitting, resetAlert])

  return <FormProvider {...form}>{children}</FormProvider>
}
